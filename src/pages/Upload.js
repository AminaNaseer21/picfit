import React, { useState } from 'react';
import logo512 from '../img/logo512.png'; // Adjust the path as per your project structure
import '../upload_style.css'; // Adjust the path based on the actual location of the CSS file

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
            <div>
                <h1>Image Input</h1>
                <p>User's Name</p>
                <label htmlFor="input-file">Add Clothing Item Picture</label>
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg, image/heic"
                    id="input-file"
                    onChange={handleImageChange}
                />
                {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
                <img src={logo512} alt="Default Logo" /> {/* Using the imported image */}
            </div>
        </div>
    );
}