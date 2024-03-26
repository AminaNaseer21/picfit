import React from 'react';
import './Profile.css';

function ProfilePage() {
  return (
   
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-picture"></div>
                <h2 className="profile-name">Welcome "Name"</h2>
            </div>
            <div className="profile-main">
                <h1 className="profile-header">Your Profile</h1>
                <div className="profile-info">
                <form className="profile-form">
                    <input type="text" placeholder="Name" className="profile-input" />
                    <input type="email" placeholder="youremail@example.com" className="profile-input" />
                    <input type="password" placeholder="Password" className="profile-input" />
                    <input type="tel" placeholder="(555) 123-4567" className="profile-input" />
                </form>
                {/* Add more sections */}
                </div>
            </div>
            </div>
    
    

  );
}

export default ProfilePage;
