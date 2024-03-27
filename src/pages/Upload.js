import React, { useState } from 'react';
import axios from 'axios';
import logo512 from '../img/logo512.png';
import PointingPH from '../img/PointingPH.png';
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image_file', file);

            const options = {
                method: 'POST',
                url: 'https://image-background-remover-ai-background-removal.p.rapidapi.com/removeBackground',
                headers: {
                    'X-RapidAPI-Key': 'cc1370c0d0msh0b8f903c46cc41cp1bf389jsn12f3e4c2024c',
                    'X-RapidAPI-Host': 'image-background-remover-ai-background-removal.p.rapidapi.com',
                    ...formData.getHeaders(),
                },
                data: formData
            };

            try {
                const response = await axios.request(options);
                setImage(response.data); // Assuming API returns processed image data
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="upload-container">
            <div className="image-holder">
                <div className="image-display-box">
                    {image ? <img src={image} alt="Processed" /> : <img src={logo512} alt="Add Item Logo" />}
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
                <img src={PointingPH} alt="Pointing" style={{ width: '600px', height: '600px' }} />
            </div>
            <div className="description">
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Begin Making Today's Outfit</p>
                <p style={{ fontSize: '18px', fontWeight: 'normal' }}>because everyone deserves to feel good in what they wear</p>
            </div>
        </div>
    );
}

