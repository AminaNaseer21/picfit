import React, { useState, useEffect } from 'react';
import './home.css'; // Import your existing CSS file
import camera from "../img/camera.png";

const Home = () => {
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const [cameraHovered, setCameraHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUploadPopupVisible(true);
    }, 2000); // 2000 milliseconds = 2 seconds
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const toggleUploadPopup = () => {
    setUploadPopupVisible(!uploadPopupVisible);
  };

  const handleCameraHover = () => {
    setCameraHovered(true);
  };

  const handleCameraLeave = () => {
    setCameraHovered(false);
  };

  const handleUploadClick = () => {
    // Redirect to the upload page
    window.location.href = '/upload';
  };

  return (
    <div className="homeContainer">
      {/* Enlarged rectangle */}
      <div className="enlargedRectangle"></div>

      {/* Upload popup */}
      {uploadPopupVisible && (
        <div className="upload-popup">
          <button className="close-button" onClick={toggleUploadPopup}>X</button>
          <div className="upload-content">
            <h2>Upload New Clothing Items</h2>
            <img
              src={camera}
              alt="Camera Icon"
              className={cameraHovered ? "camera-icon hovered" : "camera-icon"}
              onMouseEnter={handleCameraHover}
              onMouseLeave={handleCameraLeave}
              onClick={handleUploadClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
