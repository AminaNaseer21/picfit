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
  const [popupClass, setPopupClass] = useState('');
  const [shirtPosition, setShirtPosition] = useState({ x: 0, y: 0 });
  const [bottomsPosition, setBottomsPosition] = useState({ x: 0, y: 0 });
  const [shoesPosition, setShoesPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const sets = [' a causal day?', ' girls night?', ' game day?', ' date night?', ' Valentines?'];


  useEffect(() => {
    // Typewriter effect
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
    intervalId = setInterval(typeText, 150); // Increase the interval duration to 150 milliseconds
    return () => clearInterval(intervalId);
  }, [currentSet]);

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
        <svg
        version="1.1"
        id="home-anim"
        x="0px"
        y="0px"
        viewBox="0 0 1820 1080"
        style={{ enableBackground: 'new 0 0 1820 1080', top: 'calc(120px)' }}
        xmlSpace="preserve"
      >
     <g id="home">
	<defs>
		<rect id="masque" y="0.4" width="1820" height="1080"/>
	</defs>
	<clipPath id="cache">
  <use href="#masque" style={{ overflow: 'visible' }} />
	</clipPath>
	<g id="light-blue">
		<line x1="630.8" y1="894.3" x2="476.3" y2="1048.8"/>
		<line x1="858.2" y1="823.9" x2="1012.7" y2="669.4"/>
		<line x1="1066.9" y1="458.2" x2="912.4" y2="612.7"/>
		<line x1="1294.3" y1="387.8" x2="1448.8" y2="233.3"/>
		<line x1="1503" y1="22.1" x2="1348.5" y2="176.6"/>
		<line x1="895.6" y1="1166.6" x2="1050.1" y2="1012.1"/>
		<line x1="1104.3" y1="800.9" x2="949.8" y2="955.4"/>
		<line x1="1331.7" y1="730.5" x2="1486.2" y2="576"/>
		<line x1="1540.4" y1="364.8" x2="1385.9" y2="519.3"/>
		<line x1="1767.8" y1="294.4" x2="1922.3" y2="139.9"/>
		<line x1="1976.5" y1="-71.3" x2="1822" y2="83.2"/>
		<line x1="1369.1" y1="1073.2" x2="1523.6" y2="918.7"/>
		<line x1="1577.8" y1="707.5" x2="1423.3" y2="862"/>
		<line x1="1805.2" y1="637.1" x2="1959.7" y2="482.6"/>
		<line x1="1624" y1="1041.4" x2="1469.4" y2="1195.9"/>
		<line x1="-134.7" y1="674.9" x2="19.8" y2="520.4"/>
		<line x1="74" y1="309.2" x2="-80.5" y2="463.7"/>
		<line x1="301.4" y1="238.8" x2="455.9" y2="84.3"/>
		<line x1="510.1" y1="-126.9" x2="355.6" y2="27.6"/>
		<line x1="-88.6" y1="1008.9" x2="65.9" y2="854.4"/>
		<line x1="120.1" y1="643.1" x2="-34.4" y2="797.7"/>
		<line x1="347.5" y1="572.8" x2="502" y2="418.3"/>
		<line x1="556.2" y1="207.1" x2="401.7" y2="361.6"/>
		<line x1="783.6" y1="136.7" x2="938.1" y2="-17.8"/>
		<line x1="157.6" y1="985.8" x2="3" y2="1140.3"/>
		<line x1="384.9" y1="915.5" x2="539.4" y2="760.9"/>
		<line x1="593.6" y1="549.7" x2="439.1" y2="704.3"/>
		<line x1="821" y1="479.4" x2="975.5" y2="324.9"/>
		<line x1="1029.7" y1="113.6" x2="875.2" y2="268.2"/>
		<line x1="1257.1" y1="43.3" x2="1411.6" y2="-111.2"/>
	
	</g>
	
</g>
</svg>

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

<div className="arrow-homepage-container">
  <span className="arrow-homepage">↓</span>
  <div className="arrow-homepage" onClick={handleNextSetClick}>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>


        {/* Rest of your code remains the same... */}
      </div>

      {/* Upload popup */}
      <div className={`upload-popup ${popupClass}`}>
        <button className="close-button" onClick={handleCloseButtonClick}>
          X
        </button>
        <div className="upload-content">
          <h2 onClick={handleUploadClick}>Upload New Clothing Items</h2>
        </div>
      </div>

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
