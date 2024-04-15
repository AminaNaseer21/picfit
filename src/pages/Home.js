import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './home.css'; // Import your existing CSS file
import camera from "../img/camera.png";

const Home = () => {
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const [cameraHovered, setCameraHovered] = useState(false);
  const history = useHistory();

  const toggleUploadPopup = () => {
    setUploadPopupVisible(!uploadPopupVisible);
  };

  const handleCameraHover = () => {
    setCameraHovered(true);
  };

  const handleCameraLeave = () => {
    setCameraHovered(false);
  };

  const handleCameraClick = () => {
    // Redirect to the upload page
    history.push('/upload');
  };

  return (
    <div className="outfitterContainer">
      {/* Enlarged rectangle */}
      <div className="enlargedRectangle"></div>

      {/* Upload button */}
      <div className="upload-button">
        <button onClick={toggleUploadPopup}>Upload New Clothing Items</button>

        {/* Upload popup */}
        {uploadPopupVisible && (
          <div className="upload-popup">
            <button onClick={toggleUploadPopup}>Close</button>
            <img
              src={camera}
              alt="Camera Icon"
              className={cameraHovered ? "camera-icon hovered" : "camera-icon"}
              onMouseEnter={handleCameraHover}
              onMouseLeave={handleCameraLeave}
              onClick={handleCameraClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
