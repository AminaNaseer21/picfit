import React, { useState, useEffect } from 'react';
import './home.css'; // Import your existing CSS file
import camera from "../img/camera.png";
import bottoms1 from "../HPimg/1bottoms.png"; // Import the 1 bottoms image
import shirt1 from "../HPimg/1shirt.png"; // Import the 1 shirt image
import shoes1 from "../HPimg/1shoes.png"; // Import the 1 shoes image
import bottoms2 from "../HPimg/2bottoms.png"; // Import the 2 bottoms image
import shirt2 from "../HPimg/2shirt.png"; // Import the 2 shirt image
import shoes2 from "../HPimg/2shoes.png";
import bottoms3 from "../HPimg/3bottoms.png"; // Import the 3 bottoms image
import shirt3 from "../HPimg/3shirt.png"; // Import the 3 shirt image
import shoes3 from "../HPimg/3shoes.png"; // Import the 3 shoes image
import bottoms4 from "../HPimg/4bottoms.png"; // Import the 4 bottoms image
import shirt4 from "../HPimg/4shirt.png"; // Import the 4 shirt image
import shoes4 from "../HPimg/4shoes.png"; // Import the 4 shoes image
import bottoms5 from "../HPimg/5bottoms.png"; // Import the 5 bottoms image
import shirt5 from "../HPimg/5shirt.png"; // Import the 5 shirt image
import shoes5 from "../HPimg/5shoes.png"; // Import the 5 shoes image


const Home = () => {
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const [cameraIconVisible, setCameraIconVisible] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shirtPosition, setShirtPosition] = useState({ x: 0, y: 0 });
  const [bottomsPosition, setBottomsPosition] = useState({ x: 0, y: 0 });
  const [shoesPosition, setShoesPosition] = useState({ x: 0, y: 0 });

  const handleNextSetClick = () => {
    setIsTransitioning(true); // Start transition animation
    setTimeout(() => {
      setCurrentSet(currentSet === 1 ? 2 : currentSet === 2 ? 3 : currentSet === 3 ? 4 : currentSet === 4 ? 5 : 1);
      setIsTransitioning(false); // End transition animation
    }, 2000); // Adjust timing to match CSS transition duration
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUploadPopupVisible(true);
    }, 2000); // Show upload popup after 2 seconds
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  useEffect(() => {
    const moveInterval = setInterval(() => {
      // Define a movement range
      const movementRange = 5; // Adjust this value as needed
  
      // Move shirt
      setShirtPosition((prevState) => ({
        x: prevState.x + (Math.random() - 0) * 0, // Random horizontal movement within the range
        y: prevState.y + (Math.random() - 0) * 0, // Random vertical movement within the range
      }));
  
      // Move bottoms
      setBottomsPosition((prevState) => ({
        x: prevState.x + (Math.random() - 0) * 0, // Random horizontal movement within the range
        y: prevState.y + (Math.random() - 0) * 0, // Random vertical movement within the range
      }));
  
      // Move shoes
      setShoesPosition((prevState) => ({
        x: prevState.x + (Math.random() - 0.5) * 1, // Random horizontal movement within the range
        y: prevState.y + (Math.random() - 0.5) * 1, // Random vertical movement within the range
      }));
    }, 100); // Adjust movement interval as needed
    return () => clearInterval(moveInterval);
  }, []);

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
      <div className="enlargedRectangle">
        <div className={`color-changing-background set${currentSet}`}></div>

        {/* Bottoms */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${
              currentSet === 1
                ? bottoms1
                : currentSet === 2
                ? bottoms2
                : currentSet === 3
                ? bottoms3
                : currentSet === 4
                ? bottoms4
                : bottoms5
            })`,
            opacity: isTransitioning ? 0 : 1, // Fade out or in
            transition: 'opacity 2s ease', // Smooth transition for opacity
            left: `${bottomsPosition.x}px`, // Position bottoms element
            top: `${bottomsPosition.y}px`, // Position bottoms element
          }}
        ></div>

        {/* Shirt */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${
              currentSet === 1
                ? shirt1
                : currentSet === 2
                ? shirt2
                : currentSet === 3
                ? shirt3
                : currentSet === 4
                ? shirt4
                : shirt5
            })`,
            opacity: isTransitioning ? 0 : 1, // Fade out or in
            transition: 'opacity 2s ease', // Smooth transition for opacity
            left: `${shirtPosition.x}px`, // Position shirt element
            top: `${shirtPosition.y}px`, // Position shirt element
          }}
        ></div>

        {/* Shoes */}
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${
              currentSet === 1
                ? shoes1
                : currentSet === 2
                ? shoes2
                : currentSet === 3
                ? shoes3
                : currentSet === 4
                ? shoes4
                : shoes5
            })`,
            opacity: isTransitioning ? 0 : 1, // Fade out or in
            transition: 'opacity 2s ease', // Smooth transition for opacity
            left: `${shoesPosition.x}px`, // Position shoes element
            top: `${shoesPosition.y}px`, // Position shoes element
          }}
        ></div>

        {/* Rest of your code remains the same... */}
      </div>

      {/* Upload popup */}
      {uploadPopupVisible && (
        <div className="upload-popup">
          <button className="close-button" onClick={handleCloseButtonClick}>
            X
          </button>
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

      {/* Next Set button */}
      <div className="next-set-button" onClick={handleNextSetClick}>
        <span>&#10132;</span> {/* Right arrow icon */}
      </div>
    </div>
  );
};

export default Home;
