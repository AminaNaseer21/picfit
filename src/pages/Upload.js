import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
import OpenAIVisionService from '../Services/OpenAIVisionService';
import removeBackground from '../Services/BackgroundRemovalService';
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
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setImageUploads(Array.from(event.target.files));
    };

    const handleRemoveBackground = async () => {
        try {
            const resultBlob = await removeBackground(image); // Use the background removal service
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
                    canvas.height = img.height + 50;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    // Draw rainbow pixels at the bottom
                    const rainbowGradient = ctx.createLinearGradient(0, img.height, 0, img.height + 50);
                    rainbowGradient.addColorStop(0, 'red');
                    rainbowGradient.addColorStop(1, 'red');
                    ctx.fillStyle = rainbowGradient;
                    ctx.fillRect(0, img.height, img.width, 50);
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
        await uploadFiles();
        navigate('/wardrobe');
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
                    Blue Striped Polo
                    Top
                    Polo
                    Blue
                    40
                    60`;

    const uploadFiles = async () => {
        if (!currentUser || imageUploads.length === 0) return;

        const processedImage = result || developerImage;
        if (!processedImage) return;

        const contentType = 'image/png';

        const promises = imageUploads.map((file) => {
            const imageRef = ref(storage, `images/${currentUser.uid}/${file.name + uuidv4()}`);
            const metadata = {
                contentType: contentType,
            };

            return fetch(processedImage)
                .then(res => res.blob())
                .then(blob => {
                    return uploadBytes(imageRef, blob, metadata).then(snapshot => {
                        return getDownloadURL(snapshot.ref).then(url => {
                            return OpenAIVisionService.analyzeImage(blob, prompt)
                                .then(async response => {
                                    console.log('Vision API response:', response);

                                    const [shortName, category, specificItemType, color, lowTemp, highTemp] = response.data.choices[0].text.trim().split('\n');

                                    const docRef = doc(firestore, `users/${currentUser.uid}/wardrobe/${file.name + uuidv4()}`);
                                    await setDoc(docRef, {
                                        imageUrl: url,
                                        shortName,
                                        category,
                                        specificItemType,
                                        color,
                                        temperatureRange: `${lowTemp} - ${highTemp}`,
                                    });

                                    return docRef;
                                })
                                .catch(err => {
                                    console.error('Vision API error:', err);
                                    throw err;
                                });
                        });
                    });
                }).catch(error => {
                    console.error('Error during file upload and Firestore operation:', error);
                    throw error;
                });
        });

        try {
            const docRefs = await Promise.all(promises);
            console.log('Documents created:', docRefs);
            
        } catch (error) {
            console.error('Error uploading files and saving data:', error);
        }
    };

    return (
        <div className="upload-container container">
            <h1 className="begin-making">Upload Image and Process</h1>
            <div className="image-container">
                <div className="image-display-box">
                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />}
                </div>
                <div className="image-display-box">
                    {result && <img src={result} alt="Processed" className="processed-image" />}
                    {developerImage && <img src={developerImage} alt="Developer Test Image" className="processed-image" />}
                </div>
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleRemoveBackground}>Remove Background</button>
            <button onClick={handleDeveloperButtonClick}>Display Uploaded Image (for Developer Testing only)</button>
            {error && <div className="error">{error}</div>}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Confirm Upload</h2>
                        <p>Would you like to confirm the upload or retake the image?</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirmUpload}>Confirm Upload</button>
                            <button onClick={handleRetake}>Retake</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
