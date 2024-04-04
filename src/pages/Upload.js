import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
import OpenAIVisionService from '../Services/OpenAIVisionService';
import { BkgRmvr_API_KEY } from './config.js'; // Import API key from config.js
import './Upload.css'; // Import the CSS file

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';

export default function Upload() {
    const [imageUploads, setImageUploads] = useState([]);
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [developerImage, setDeveloperImage] = useState(null); // State for developer testing image
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { currentUser } = useAuth();
    const firestore = getFirestore(); // Initialize Firestore here

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageUploads(files);
        setImage(files[0]); // Set the image for background removal or developer testing
    };

    const handleRemoveBackground = async () => {
        try {
            const formData = new FormData();
            formData.append('image_file', image);

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-api-key': BkgRmvr_API_KEY,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove background');
            }

            const result = await response.blob();
            setResult(URL.createObjectURL(result));
            setError(null);
            setShowModal(true); // Show modal after processing image
        } catch (error) {
            console.error(error); // Log the actual error
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
                    canvas.height = img.height + 50; // Add 50 pixels for the thicker rainbow row
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    // Draw rainbow pixels at the bottom
                    const rainbowGradient = ctx.createLinearGradient(0, img.height, 0, img.height + 50);
                    rainbowGradient.addColorStop(0, 'red');
                    rainbowGradient.addColorStop(0.17, 'orange');
                    rainbowGradient.addColorStop(0.34, 'yellow');
                    rainbowGradient.addColorStop(0.51, 'green');
                    rainbowGradient.addColorStop(0.68, 'blue');
                    rainbowGradient.addColorStop(0.85, 'indigo');
                    rainbowGradient.addColorStop(1, 'violet');

                    ctx.fillStyle = rainbowGradient;
                    ctx.fillRect(0, img.height, img.width, 50); // Draw thicker rainbow row
                    setDeveloperImage(canvas.toDataURL());
                    setShowModal(true); // Show modal after processing image
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(image);
        }
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

    const uploadFiles = () => {
        if (!currentUser || !result) return; // Only proceed if there's a processed image

        const imageToUpload = result ? result : image; // Use processed image if available, else use uploaded image

        const promises = imageUploads.map((file) => {
            const imageRef = ref(storage, `images/${currentUser.uid}/${file.name + uuidv4()}`);
            return uploadBytes(imageRef, file).then(snapshot => {
                return getDownloadURL(snapshot.ref).then(url => {
                    return fetch(url)
                        .then(res => res.blob())
                        .then(blob => {
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
                                    throw err; // Rethrow to be caught by the outer catch
                                });
                        });
                });
            }).catch(error => {
                console.error('Error during file upload and Firestore operation:', error);
                throw error; // Rethrow to be caught by the outer promise chain
            });
        });

        Promise.all(promises)
            .then(docRefs => {
                console.log('Documents created:', docRefs);
                // Here you could update state to reflect the successful uploads or navigate the user to another page
            })
            .catch(error => {
                console.error('Error uploading files and saving data:', error);
            });
    };

    const handleConfirmUpload = () => {
        // Upload images to Firestore when user confirms
        uploadFiles();
        setShowModal(false);
    };

    const handleRetake = () => {
        // Handle retaking image
        setImage(null);
        setResult(null);
        setDeveloperImage(null);
        setShowModal(false);
    };

    return (
        <div className="upload-container container">
            <h1 className="begin-making">Remove Background API Demo</h1>
            <input
                type="file"
                onChange={handleImageChange}
                multiple // Allow multiple file selection
            />
            <button onClick={handleRemoveBackground}>Remove Background</button>
            <button onClick={handleDeveloperButtonClick}>Display Uploaded Image (for Developer Testing only)</button>
            {error && <div className="error">{error}</div>}

            {/* Modal for Confirm Upload or Retake */}
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

            {/* Display uploaded image or processed images */}
            {image && (
                <div className="image-container">
                    <div className="image-display-box">
                        <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="uploaded-image" />
                    </div>
                    <div className="image-display-box">
                        {result && <img src={result} alt="Processed Image" className="processed-image" />}
                        {developerImage && <img src={developerImage} alt="Developer Test Image" className="processed-image" />} {/* Display the developer testing image within the same box */}
                    </div>
                </div>
            )}
        </div>
    );
}
