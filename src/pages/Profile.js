import React, { useState } from 'react';
import './Profile.css';


function ProfilePage() {
    return (
      <div className="profile-container">
        <h1 className="profile-header">Your Profile</h1>
        <div className="profile-picture"></div>
        <form className="profile-form">
          <input type="text" placeholder="Name" className="profile-input" />
          <input type="email" placeholder="youremail@example.com" className="profile-input" />
          <input type="password" placeholder="Password" className="profile-input" />
          <input type="tel" placeholder="(555) 123-4567" className="profile-input" />
        </form>
      </div>
    );
  }
  
  export default ProfilePage;
