// Upload.js

import React, { useState } from 'react';
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:5000/process_image', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error('Failed to process image');
                }
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImage(url);
            } catch (error) {
                console.error('Error:', error);
            }
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
        </div>
    );
}
