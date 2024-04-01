import React, { useState, useRef } from 'react';
import logo512 from '../img/logo512.png';
import PointingPH from '../img/PointingPH.png'; // Importing PointingPH.png
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const alpha = data[i + 3];
                        // Check if the pixel is white (you can adjust this condition based on your needs)
                        if (r > 200 && g > 200 && b > 200 && alpha > 0) {
                            data[i + 3] = 0; // Set alpha to 0 to make it transparent
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    const url = canvas.toDataURL();
                    setImage(url);
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
                    {image && <img src={image} alt="Uploaded" />}
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
