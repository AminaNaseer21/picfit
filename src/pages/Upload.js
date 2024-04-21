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
                    3. **Specific Item Type**: Based on the selected category, identify the specific type of the clothing item. Refer to the list below for options:
                        - **Tops**:
                            - T-Shirts: Graphic, Plain, Tank Tops, Polo
                            - Shirts: Shirt Jackets, Short-Sleeve Shirts, Long-Sleeve Shirts, Sweater Polos
                            - Sweatshirts: Crew Neck Sweatshirts, Graphic Sweatshirts
                        - **Bottoms**:
                            - Denim: Straight, Tapered, Boyfriend, Baggy, Slim, Bootcut, Flared, Jeggings, Mom, Wide Leg
                            - Pants: Chinos, Trousers, Joggers, Workwear, Cargo
                            - Sweatpants: Jogger Sweatpants, Classic Sweatpants
                            - Shorts: Classic/Active, Mesh Shorts, Denim Shorts, Cargo
                        - **Outerwear**:
                            - Hoodies: Zip-Up Hoodies, Pullover Hoodies, Graphic Hoodies
                            - Sweaters: Pullover Sweaters, Cardigan Sweaters
                    4. **Color**: Identify the primary color of the clothing item. If there are multiple prominent colors, list up to three.
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
