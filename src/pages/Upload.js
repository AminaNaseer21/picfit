import React, { useState } from 'react';
import logo512 from '../img/logo512.png';
import PointingPH from '../img/PointingPH.png'; // Importing PointingPH.png
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
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
                <img src={PointingPH} alt="Pointing" /> {/* Placing PointingPH.png above the text block */}
                <p>Begin Making Today's Outfit</p>
                <small>because everyone deserves to feel good in what they wear</small>
            </div>
        </div>
    );
}
