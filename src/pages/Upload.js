import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import logo512 from '../img/logo512.png';
import PointingPH from '../img/PointingPH.png'; // Importing PointingPH.png
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const img = new Image();
                img.onload = async () => {
                    // Make a POST request to the Image Background Remover API
                    try {
                        const response = await axios.post('https://image-background-remover-ai-background-removal.p.rapidapi.com/removeBackground', {
                            image_url: event.target.result
                        }, {
                            headers: {
                                'content-type': 'application/json',
                                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
                                'X-RapidAPI-Host': 'image-background-remover-ai-background-removal.p.rapidapi.com',
                            }
                        });
                        const processedImage = response.data; // Assuming the API returns the processed image URL
                        setImage(processedImage);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="upload-container">
            <div className="image-holder">
                <div className="image-display-box">
                    {image && <img src={image} alt="Processed" />}
                    {!image && <img src={logo512} alt="Add Item Logo" />}
                </div>
                <div className="add-item-box">
                    <label htmlFor="input-file">
                        <span>Add Clothing Item Picture</span>
                    </label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, image/heic"
                        id="input-file"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className="begin-making">
                <img src={PointingPH} alt="Pointing" style={{ width: '600px', height: '600px' }} /> {/* Adjusted width and height */}
            </div>
            <div className="description">
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Begin Making Today's Outfit</p>
                <p style={{ fontSize: '18px', fontWeight: 'normal' }}>because everyone deserves to feel good in what they wear</p>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}
