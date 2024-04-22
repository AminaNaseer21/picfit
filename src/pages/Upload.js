import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
import removeBackground from '../Services/BackgroundRemovalService';
import analyzeImage from '../Services/OpenAIVisionService';
import { parseAnalyzedData } from '../Services/parseAnalyzedDataService';
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [developerImage, setDeveloperImage] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [imageUploads, setImageUploads] = useState([]);
    const { currentUser } = useAuth();
    const firestore = getFirestore();
    const navigate = useNavigate(); // Uncomment this if navigation is required after uploading
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setImageUploads(Array.from(event.target.files));
    };

    const handleRemoveBackground = async () => {
        try {
            const resultBlob = await removeBackground(image);
            setResult(URL.createObjectURL(resultBlob));
            setError(null);
            setShowModal(true);
        } catch (error) {
            setResult(null);
            setError('Failed to remove background');
        }
    };

    const handleDeveloperButtonClick = () => {
        if (image) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
    
                    // Add watermark text at the bottom right of the image
                    const text = "DEVTEST"; // Change the text as needed
                    ctx.font = "100px Arial"; // You can change the font size and type
                    ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Semi-transparent white text
                    ctx.textAlign = "right";
                    ctx.fillText(text, img.width - 10, img.height - 10); // Position text from the bottom right corner
    
                    setDeveloperImage(canvas.toDataURL());
                    setShowModal(true);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(image);
        }
    };

    const handleConfirmUpload = async () => {
        setShowModal(false);
    
        // Convert developerImage from data URL to Blob if it's not null
        let imageToUpload = image; // Default to the original image
        if (result) {
            // If background removal was applied, set imageToUpload to the result blob
            imageToUpload = await fetch(result).then(r => r.blob());
        } else if (developerImage) {
            // If developer image is set, convert it to a blob and set it as imageToUpload
            const response = await fetch(developerImage);
            const blob = await response.blob();
            imageToUpload = new File([blob], `${image.name}-developer`, { type: 'image/png' });
        }
    
        await uploadFiles(imageToUpload); // Pass the selected image to uploadFiles
    };

    const handleRetake = () => {
        setImage(null);
        setResult(null);
        setDeveloperImage(null);
        setShowModal(false);
    };
 
    const prompt = `Please analyze the uploaded image of a clothing item and provide the following information in the specified format:
                    1. **Short Name**: Provide a concise name for the clothing item based on its most distinguishing features (e.g., "Blue Striped Polo").
                    2. **Category**: Determine the main category of the clothing item. Choose from:
                        - Tops
                        - Bottoms
                        - Outerwear
                    3. **Specific Item Type**: Based on the selected category, identify the specific type of the clothing item. Pick only from to the list below of options (Example: "Graphic" or "Short-Sleeve Shirts" etc.):
                        - Tops:
                            - T-Shirts: Graphic, Plain, Tank Tops, Polo
                            - Shirts: Shirt Jackets, Short-Sleeve Shirts, Long-Sleeve Shirts, Sweater Polos
                            - Sweatshirts: Crew Neck Sweatshirts, Graphic Sweatshirts
                        - Bottoms:
                            - Denim: Straight, Tapered, Boyfriend, Baggy, Slim, Bootcut, Flared, Jeggings, Mom, Wide Leg
                            - Pants: Chinos, Trousers, Joggers, Workwear, Cargo
                            - Sweatpants: Jogger Sweatpants, Classic Sweatpants
                            - Shorts: Classic/Active, Mesh Shorts, Denim Shorts, Cargo
                        - Outerwear:
                            - Hoodies: Zip-Up Hoodies, Pullover Hoodies, Graphic Hoodies
                            - Sweaters: Pullover Sweaters, Cardigan Sweaters
                    4. **Color**: Identify the primary color of the clothing item. If multipule colors, pick the one color that will represent the clothing the best. Only choose from one of the following:
                        - Red
                        - Lime
                        - Blue
                        - Yellow
                        - Cyan
                        - Magenta
                        - White
                        - Black
                        - Maroon
                        - Olive
                        - Green
                        - Purple
                        - Teal
                        - Navy
                        - Gray
                        - Silver
                    5. **Weather Range**: Suggest a temperature range with two numbers (in degrees Celsius or Fahrenheit, based on your preference) that the item is most suitable for. Consider factors like material thickness, coverage, and intended use (e.g., "40°F - 68°F").
                    Ensure that the analysis is concise and directly relevant to the visible features of the clothing item in the uploaded image. Avoid speculation or assumptions not supported by visible evidence. The output should be printing with one answer in each line with only the answer like the example below that has the name in the first line, category in second, subcategory in third, the color in forth, the low end temp in fifth, and the high end temp in sixth. Ensure that the output contains no other words or information other than the exact output:
                    OUTPUT:
                    Blue Striped Polo,
                    Top,
                    Polo,
                    Blue,
                    40,
                    60`;

                  
                    const uploadFiles = async (fileToUpload) => {
                        if (!currentUser || !fileToUpload) return;
                    
                        try {
                            const fileRef = ref(storage, `images/${currentUser.uid}/${fileToUpload.name}-${uuidv4()}`);
                            await uploadBytes(fileRef, fileToUpload);
                            const url = await getDownloadURL(fileRef);
                    
                            const analyzedData = await analyzeImage(url, prompt);
                    
                            try {
                                const { shortName, category, subCategory, color, tempRangeLow, tempRangeHigh } = parseAnalyzedData(analyzedData);
                    
                                setAnalysisResult(analyzedData);
                    
                                const docRef = doc(firestore, `users/${currentUser.uid}/wardrobe/${fileToUpload.name}-${uuidv4()}`);
                                await setDoc(docRef, {
                                    imageUrl: url,
                                    shortName,
                                    category,
                                    subCategory,
                                    color,
                                    tempRangeLow,
                                    tempRangeHigh,
                                    wearCount: 0,
                                    ItemNotes: "",
                                    favorite: 0,
                                });
                    
                            } catch (error) {
                                console.error('Error parsing analyzed data:', error);
                            }
                        } catch (error) {
                            console.error('Error uploading or analyzing file:', error);
                        }
                    };

    return (
        <div className="upload-container">
            <svg
        version="1.1"
        id="home-anim"
        x="0px"
        y="0px"
        viewBox="0 0 1820 1080"
        style={{ enableBackground: 'new 0 0 1820 1080', top: 'calc(120px)' }}
        xmlSpace="preserve"
      >
     <g id="home">
	<defs>
		<rect id="masque" y="0.4" width="1820" height="1080"/>
	</defs>
	<clipPath id="cache">
  <use href="#masque" style={{ overflow: 'visible' }} />
	</clipPath>
	<g id="light-blue">
		<line x1="630.8" y1="894.3" x2="476.3" y2="1048.8"/>
		<line x1="858.2" y1="823.9" x2="1012.7" y2="669.4"/>
		<line x1="1066.9" y1="458.2" x2="912.4" y2="612.7"/>
		<line x1="1294.3" y1="387.8" x2="1448.8" y2="233.3"/>
		<line x1="1503" y1="22.1" x2="1348.5" y2="176.6"/>
		<line x1="895.6" y1="1166.6" x2="1050.1" y2="1012.1"/>
		<line x1="1104.3" y1="800.9" x2="949.8" y2="955.4"/>
		<line x1="1331.7" y1="730.5" x2="1486.2" y2="576"/>
		<line x1="1540.4" y1="364.8" x2="1385.9" y2="519.3"/>
		<line x1="1767.8" y1="294.4" x2="1922.3" y2="139.9"/>
		<line x1="1976.5" y1="-71.3" x2="1822" y2="83.2"/>
		<line x1="1369.1" y1="1073.2" x2="1523.6" y2="918.7"/>
		<line x1="1577.8" y1="707.5" x2="1423.3" y2="862"/>
		<line x1="1805.2" y1="637.1" x2="1959.7" y2="482.6"/>
		<line x1="1624" y1="1041.4" x2="1469.4" y2="1195.9"/>
		<line x1="-134.7" y1="674.9" x2="19.8" y2="520.4"/>
		<line x1="74" y1="309.2" x2="-80.5" y2="463.7"/>
		<line x1="301.4" y1="238.8" x2="455.9" y2="84.3"/>
		<line x1="510.1" y1="-126.9" x2="355.6" y2="27.6"/>
		<line x1="-88.6" y1="1008.9" x2="65.9" y2="854.4"/>
		<line x1="120.1" y1="643.1" x2="-34.4" y2="797.7"/>
		<line x1="347.5" y1="572.8" x2="502" y2="418.3"/>
		<line x1="556.2" y1="207.1" x2="401.7" y2="361.6"/>
		<line x1="783.6" y1="136.7" x2="938.1" y2="-17.8"/>
		<line x1="157.6" y1="985.8" x2="3" y2="1140.3"/>
		<line x1="384.9" y1="915.5" x2="539.4" y2="760.9"/>
		<line x1="593.6" y1="549.7" x2="439.1" y2="704.3"/>
		<line x1="821" y1="479.4" x2="975.5" y2="324.9"/>
		<line x1="1029.7" y1="113.6" x2="875.2" y2="268.2"/>
		<line x1="1257.1" y1="43.3" x2="1411.6" y2="-111.2"/>
	
	</g>
	
</g>
</svg>
            <h1 className="page-title">Upload and Process Image</h1>
            <div className="content">
                <div className="image-upload-section">
                    <div className="image-preview">
                        {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="preview-image" />}
                        {(result || developerImage) && (
                            <img src={result || developerImage} alt="Processed" className="preview-image" />
                        )}
                    </div>
                    <input type="file" accept="image/*" className="file-input" onChange={handleImageChange} />
                </div>
                <div className="action-buttons">
                    <button className="action-button" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="action-button" onClick={handleDeveloperButtonClick}>Developer Testing</button>
                </div>
                {error && <div className="error-message">{error}</div>}
                {analysisResult && (
                    <div className="analysis-results">
                        <h2>Analysis Results</h2>
                        <p>{analysisResult}</p>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Upload</h2>
                        <p>Would you like to confirm the upload or retake the image?</p>
                        <div className="modal-actions">
                            <button className="modal-action-button" onClick={handleConfirmUpload}>Confirm Upload</button>
                            <button className="modal-action-button" onClick={handleRetake}>Retake</button>
                        </div>
                    </div>
                </div>
    )}
</div>
    );
}
