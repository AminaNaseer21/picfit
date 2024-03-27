import React, { useState, useRef } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
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
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    // Make a POST request to the Image Background Remover API
                    try {
                        const response = await axios.post('https://image-background-remover-ai-background-removal.p.rapidapi.com/removeBackground', {
                            image_url: event.target.result
                        }, {
                            headers: {
                                'content-type': 'application/json',
                                'X-RapidAPI-Key': 'cc1370c0d0msh0b8f903c46cc41cp1bf389jsn12f3e4c2024c', // Replace with your RapidAPI key
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
                </div>
                <div className="add-item-box">
                    <label htmlFor="input-file">
                        <span>Add Image</span>
                    </label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, image/heic"
                        id="input-file"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}
