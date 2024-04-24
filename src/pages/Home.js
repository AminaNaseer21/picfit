import React, { useState, useEffect, useMemo } from 'react';
import './home.css'; // Import your existing CSS file
import HomeAnimation from '../Services/HomeAnimation';
import camera from "../img/camera.png";
import bottoms1 from "../img/HPimg/1bottoms.png"; // Import the 1 bottoms image
import shirt1 from "../img/HPimg/1shirt.png"; // Import the 1 shirt image
import shoes1 from "../img/../img/HPimg/1shoes.png"; // Import the 1 shoes image
import bottoms2 from "../img/HPimg/2bottoms.png"; // Import the 2 bottoms image
import shirt2 from "../img/HPimg/2shirt.png"; // Import the 2 shirt image
import shoes2 from "../img/HPimg/2shoes.png";
import bottoms3 from "../img/HPimg/3bottoms.png"; // Import the 3 bottoms image
import shirt3 from "../img/HPimg/3shirt.png"; // Import the 3 shirt image
import shoes3 from "../img/HPimg/3shoes.png"; // Import the 3 shoes image
import bottoms4 from "../img/HPimg/4bottoms.png"; // Import the 4 bottoms image
import shirt4 from "../img/HPimg/4shirt.png"; // Import the 4 shirt image
import shoes4 from "../img/HPimg/4shoes.png"; // Import the 4 shoes image
import bottoms5 from "../img/HPimg/5bottoms.png"; // Import the 5 bottoms image
import shirt5 from "../img/HPimg/5shirt.png"; // Import the 5 shirt image
import shoes5 from "../img/HPimg/5shoes.png"; // Import the 5 shoes image

const Home = () => {
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const [cameraIconVisible, setCameraIconVisible] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [popupClass, setPopupClass] = useState('');
  const [shirtPosition, setShirtPosition] = useState({ x: 0, y: 0 });
  const [bottomsPosition, setBottomsPosition] = useState({ x: 0, y: 0 });
  const [shoesPosition, setShoesPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const sets = useMemo(() => [
    ' a casual day?', ' girls night?', ' game day?', ' date night?', ' Valentines?'
  ], []);


  useEffect(() => {
    let currentIndex = 0;
    let intervalId;
    const typeText = () => {
      if (currentIndex < sets[currentSet - 1].length) {
        setText((prevText) => prevText + sets[currentSet - 1].charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    };
    intervalId = setInterval(typeText, 150);
    return () => clearInterval(intervalId);
  }, [currentSet, sets]);

  const handleNextSetClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true); // Start transition animation
      setTimeout(() => {
        setCurrentSet((prevSet) => (prevSet === 5 ? 1 : prevSet + 1));
        setIsTransitioning(false); // End transition animation
        setText('');
      }, 2000); // Adjust timing to match CSS transition duration
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUploadPopupVisible(true);
      setPopupClass('show'); // Add 'show' class to trigger animation
    }, 2000); // Show upload popup after 2 seconds
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  useEffect(() => {
    const moveInterval = setInterval(() => {
      const movementRange = 5; // Define movement range
  
      // Move shirt
      setShirtPosition((prevState) => ({
        x: prevState.x + (Math.random() - 0.5) * movementRange,
        y: prevState.y + (Math.random() - 0.5) * movementRange,
      }));
  
      // Move bottoms
      setBottomsPosition((prevState) => ({
        x: prevState.x + (Math.random() - 0.5) * movementRange,
        y: prevState.y + (Math.random() - 0.5) * movementRange,
      }));
  
      // Move shoes
      setShoesPosition((prevState) => ({
        x: prevState.x + (Math.random() - 0.5) * movementRange,
        y: prevState.y + (Math.random() - 0.5) * movementRange,
      }));
    }, 100);
    return () => clearInterval(moveInterval);
  }, []);

  const handleUploadClick = () => {
    // Redirect to the upload page
    window.location.href = '/upload';
  };

  const handleCloseButtonClick = () => {
    setPopupClass(''); // Remove 'show' class to trigger closing animation
    setTimeout(() => {
      setUploadPopupVisible(false);
      setCameraIconVisible(true);
    }, 500); // Adjust timing to match CSS transition duration
  };

  const handleCameraIconClick = () => {
    // Redirect to the upload page
    window.location.href = '/upload';
  };

 
return (
  <div className="homeContainer">
    <div className="typewriter">
      <h1>Is today's outfit for {text}</h1>
    </div>
    <HomeAnimation />

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

        {/* Animated arrow */}
        <div className="arrow-homecontainer">
          <div className="arrowHome" onClick={handleNextSetClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Rest of your code remains the same... */}
      </div>

      {/* Upload popup */}
      {uploadPopupVisible && (
        <div className={`upload-popup ${popupClass}`}>
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
    </div>
  );
};

export default Home;
