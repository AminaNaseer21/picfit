import React, { useState, useEffect } from 'react';
import './home.css'; // Import your existing CSS file
import camera from "../img/camera.png";
import bottoms from "../HPimg/1bottoms.png"; // Import the bottoms image
import shirt from "../HPimg/1shirt.png"; // Import the shirt image
import shoes from "../HPimg/1shoes.png"; // Import the shoes image

const Home = () => {
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const [cameraIconVisible, setCameraIconVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUploadPopupVisible(true);
    }, 2000); // Show upload popup after 2 seconds
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const handleUploadClick = () => {
    // Redirect to the upload page
    window.location.href = '/upload';
  };

  const handleCloseButtonClick = () => {
    setUploadPopupVisible(false);
    setCameraIconVisible(true);
  };

  const handleCameraIconClick = () => {
    // Redirect to the upload page
    window.location.href = '/upload';
  };

  return (
    <div className="homeContainer">
      {/* Enlarged rectangle */}
      <div
        className="enlargedRectangle"
      >
        {/* Color-changing background */}
        <div className="color-changing-background"></div>

        {/* Bottoms */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${bottoms})`, // Set image as background
          }}
        ></div>

        {/* Shirt */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${shirt})`, // Set image as background
          }}
        ></div>

        {/* Shoes */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${shoes})`, // Set image as background
          }}
        ></div>

        {/* Upload popup */}
        {uploadPopupVisible && (
          <div className="upload-popup">
            <button className="close-button" onClick={handleCloseButtonClick}>X</button>
            <div className="upload-content">
              <h2 onClick={handleUploadClick}>Upload New Clothing Items</h2>
            </div>
          </div>
        )}

        {/* Camera icon */}
        {cameraIconVisible && (
          <div className="camera-icon-container">
            <img
              src={camera}
              alt="Camera Icon"
              className="camera-icon"
              onClick={handleCameraIconClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
