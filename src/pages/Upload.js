import React, { useState } from 'react';

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
        <div>
            <div className="hero"></div>
            <div className="card">
                <h1>Image Input</h1>
                <p>User's Name</p>
                {image && <img src={image} alt="Uploaded" />}
                <label htmlFor="input-file">Add Clothing Item Picture</label>
                <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg, image/heic"
                    id="input-file"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
}
