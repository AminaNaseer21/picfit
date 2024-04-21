import React from 'react';
import './Aboutus.css';
import UmerPhoto from "../img/TeamHeadshots/UmerPhoto.jpg";
import RogelioHeadPic from "../img/TeamHeadshots/RogelioHeadPic.png";
import RamiroPic from  "../img/TeamHeadshots/RamiroPic.jpg";
import MatthewPic from "../img/TeamHeadshots/MatthewPic.jpg";

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

      <div className = "umer-container">
      <div className="umer-photo">
      <img src={UmerPhoto} alt="umer" className="umer-photo" />
      <h1>Umer Seliya</h1>
      
      </div>
   </div>

    <div className = "Rogelio-container">
      <div className = "Rogelio-photo">
    <img src={RogelioHeadPic} alt="Rogelio" className="Rogelio-photo" />
    <h1>Rogelio Hernandez</h1>
    </div>
    </div>

    <div className = "Ramiro-container">
      <div className = "Ramiro-photo">
    <img src={RamiroPic} alt="Ramiro" className="Ramiro-photo" />
    <h1>Ramiro Ramirez</h1>
    </div>
    </div>

    <div className = "Matthew-container">
      <div className = "Matthew-photo">
    <img src={MatthewPic} alt="Matthew" className="Matthew-photo" />
    <h1>Matthew Lee</h1>
    </div>
    </div>
   
    </>
  );
};

export default AboutUs;
