import React from 'react';
import './Aboutus.css';
import UmerPhoto from "../img/TeamHeadshots/UmerPhoto.jpg";



const AboutUs = () => {
  return (
    <>
    <div className="about-us-container">
      <h1>About Us</h1>
      <h2>Welcome to PicMyFit!</h2>
      <p>Established in 2024, PicMyFit is an innovative wardrobe generator platform that enables users to upload their personal clothing items and effortlessly create stylish outfits from their uploaded wardrobe. This intuitive service streamlines the process of outfit selection, providing tailored fashion solutions with just a few clicks</p>
      <p> </p>
      <h2>Mission: </h2>
      <p>At PicMyFit, our mission is to simplify your daily wardrobe decisions. Whether it's a chilly, rainy day or a warm, sunny one, you can count on us to take the guesswork out of what to wear. No more wardrobe worries—just stylish solutions tailored to any weather.</p>
    </div>
    <div className = "TeamMembers">
      <h1>Meet the team!</h1>
   </div>
   <div className="team-member-photo">
      <img src={UmerPhoto} alt="Umer" className="team-member-photo" />
      </div>
    </>
  );
};

export default AboutUs;
