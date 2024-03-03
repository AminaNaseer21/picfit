import React, { useState } from 'react';
import './Profile.css';

function ProfilePage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleProfilePicChange = (event) => {
        const file = event.target.files[0];
        setProfilePic(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can perform actions with the data (name, email, phone, profilePic)
    };

    return (
        <div className="container profile-container">
            <h1>User Profile</h1>
            <div className="profile-picture-container">
                <div className="profile-picture">
                    {profilePic ? (
                        <img src={URL.createObjectURL(profilePic)} alt="Profile Preview" />
                    ) : (
                        <span>Upload Picture</span>
                    )}
                </div>
            </div>
            <label htmlFor="profilePic" className="upload-button"> + </label>
            <input
                type="file"
                id="profilePic"
                onChange={handleProfilePicChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <form onSubmit={handleSubmit} className="profile-info">
                <input type="text" value={name} onChange={handleNameChange} placeholder="Name" required />
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" required />
                <input type="tel" value={phone} onChange={handlePhoneChange} placeholder="Phone Number" required />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default ProfilePage;
