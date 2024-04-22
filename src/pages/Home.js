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

        <svg
        version="1.1"
        id="home-anim"
        x="0px"
        y="0px"
        viewBox="0 0 1820 1080"
        style={{ enableBackground: 'new 0 0 1820 1080' }}
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
	<g id="red">
		<line x1="794.4" y1="883.4" x2="639.8" y2="1037.9"/>
		<line x1="694.6" y1="834.8" x2="849.2" y2="680.3"/>
		<line x1="1230.4" y1="447.3" x2="1075.9" y2="601.8"/>
		<line x1="1130.7" y1="398.7" x2="1285.2" y2="244.2"/>
		<line x1="1666.5" y1="11.2" x2="1512" y2="165.7"/>
		<line x1="732" y1="1177.5" x2="886.6" y2="1023"/>
		<line x1="1267.9" y1="790" x2="1113.3" y2="944.5"/>
		<line x1="1168.1" y1="741.4" x2="1322.7" y2="586.9"/>
		<line x1="1703.9" y1="353.9" x2="1549.4" y2="508.4"/>
		<line x1="1604.2" y1="305.3" x2="1758.7" y2="150.8"/>
		<line x1="1205.5" y1="1084.1" x2="1360.1" y2="929.6"/>
		<line x1="1741.4" y1="696.5" x2="1586.8" y2="851.1"/>
		<line x1="1641.6" y1="648" x2="1796.2" y2="493.5"/>
		<line x1="1787.5" y1="1030.5" x2="1633" y2="1185"/>
		<line x1="1465.6" y1="827.6" x2="1311.1" y2="982.1"/>
		<line x1="1365.9" y1="779" x2="1520.5" y2="624.5"/>
		<line x1="1501.7" y1="55.4" x2="1347.1" y2="209.9"/>
		<line x1="1402" y1="6.8" x2="1556.5" y2="-147.7"/>
		<line x1="1710.8" y1="389.3" x2="1556.3" y2="543.8"/>
		<line x1="1611" y1="340.7" x2="1765.6" y2="186.2"/>
		<line x1="1249.3" y1="899.1" x2="1094.8" y2="1053.6"/>
		<line x1="1192.8" y1="1035.2" x2="1347.3" y2="880.7"/>
		<line x1="1093" y1="986.6" x2="1247.6" y2="832.1"/>
		<line x1="1344.3" y1="608.6" x2="1190.3" y2="763.2"/>
		<line x1="1294.3" y1="643.1" x2="1448.9" y2="488.5"/>
		<line x1="1529.7" y1="265.1" x2="1375.7" y2="419.7"/>
		<line x1="1479.7" y1="299.6" x2="1634.3" y2="145"/>
		<line x1="1971.5" y1="53.6" x2="1817" y2="208.1"/>
		<line x1="1921.5" y1="88.1" x2="2076" y2="-66.5"/>
		<line x1="1780.1" y1="1212.4" x2="1625.5" y2="1366.9"/>
		<line x1="1680.4" y1="1163.8" x2="1835" y2="1009.3"/>
		<line x1="1744.5" y1="-8.3" x2="1590" y2="146.2"/>
		<line x1="1644.8" y1="42.3" x2="1799.3" y2="-112.2"/>
	</g>
	<g id="orange">
		<line x1="700.1" y1="680.6" x2="855.6" y2="526.1"/>
		<line x1="600.3" y1="632" x2="754.8" y2="477.5"/>
		<line x1="1136.1" y1="244.5" x2="981.6" y2="399"/>
		<line x1="1036.4" y1="195.9" x2="1190.9" y2="41.4"/>
		<line x1="1572.2" y1="-191.6" x2="1417.7" y2="-37.1"/>
		<line x1="537.7" y1="974.6" x2="692.3" y2="820.1"/>
		<line x1="1073.6" y1="587.1" x2="919.1" y2="741.6"/>
		<line x1="973.9" y1="538.5" x2="1128.5" y2="384"/>
		<line x1="1509.7" y1="151.1" x2="1355.1" y2="305.7"/>
		<line x1="1410" y1="102.5" x2="1564.6" y2="-52"/>
		<line x1="1011.3" y1="881.3" x2="1165.8" y2="726.8"/>
		<line x1="1447.1" y1="493.8" x2="1292.6" y2="648.4"/>
		<line x1="1347.4" y1="445.2" x2="1502" y2="290.7"/>
		<line x1="1493.3" y1="827.7" x2="1338.7" y2="982.2"/>
		<line x1="1171.4" y1="624.8" x2="1016.9" y2="779.4"/>
		<line x1="1071.7" y1="576.2" x2="1226.2" y2="421.7"/>
		<line x1="1159.9" y1="144.5" x2="1005.3" y2="299"/>
		<line x1="1125.3" y1="185.3" x2="1280.4" y2="31.2"/>
		<line x1="1324.2" y1="496.8" x2="1169.7" y2="651.3"/>
		<line x1="1224.5" y1="448.2" x2="1379" y2="293.7"/>
		<line x1="860.7" y1="1039.5" x2="706.2" y2="1194"/>
		<line x1="1614.7" y1="20.2" x2="1475.7" y2="165"/>
		<line x1="1515" y1="-28.4" x2="1669.5" y2="-182.9"/>
		<line x1="1650.9" y1="354" x2="1496.3" y2="508.6"/>
		<line x1="1551.2" y1="305.4" x2="1705.7" y2="150.9"/>
		<line x1="1930.4" y1="1131.2" x2="1775.9" y2="1285.7"/>
		<line x1="1830.7" y1="1082.6" x2="1985.2" y2="928.1"/>
			<line x1="685.2" y1="1129.8" x2="840.7" y2="975.3"/>
		<line x1="1672.9" y1="745.3" x2="1518.4" y2="899.8"/>
		<line x1="1573.2" y1="696.7" x2="1727.7" y2="542.2"/>
		<line x1="1683.2" y1="62.5" x2="1528.7" y2="217.1"/>
		<line x1="1583.5" y1="13.9" x2="1738" y2="-140.6"/>
	</g>
	<g id="purple">
		<line x1="739.6" y1="927.7" x2="884.2" y2="773.2"/>
		<line x1="1455.3" y1="673.5" x2="1300.8" y2="827.9"/>
		<line x1="1355.5" y1="624.9" x2="1510" y2="470.4"/>
		<line x1="1891.4" y1="237.4" x2="1736.9" y2="391.9"/>
		<line x1="750.6" y1="1053.6" x2="905.2" y2="899.1"/>
		<line x1="1394.4" y1="799.4" x2="1239.9" y2="953.8"/>
		<line x1="1294.6" y1="750.8" x2="1449.1" y2="596.3"/>
		<line x1="1830.4" y1="363.3" x2="1675.9" y2="517.8"/>
		<line x1="1740.6" y1="314.7" x2="1895.1" y2="160.2"/>
		<line x1="1541.8" y1="1037.9" x2="1696.4" y2="883.4"/>
		<line x1="1939.6" y1="500.5" x2="1785.1" y2="655"/>
		<line x1="1849.9" y1="451.9" x2="2004.4" y2="297.4"/>
		<line x1="1696.1" y1="1014.2" x2="1541.6" y2="1168.7"/>
		<line x1="1696.1" y1="1014.2" x2="1541.6" y2="1168.7"/>
		<line x1="1606.3" y1="965.6" x2="1758.7" y2="821"/>
		<line x1="1835.6" y1="588.3" x2="1988" y2="443.7"/>
		<line x1="1745.8" y1="539.7" x2="1898.2" y2="395.1"/>
		<line x1="1518.6" y1="916.2" x2="1364.1" y2="1070.7"/>
		<line x1="1428.9" y1="867.6" x2="1583.4" y2="713.1"/>
		<line x1="1934.6" y1="239.3" x2="1780.1" y2="393.8"/>
		<line x1="1844.8" y1="190.7" x2="1999.3" y2="36.2"/>
		<line x1="1798.4" y1="1146.8" x2="1643.9" y2="1301.4"/>
		<line x1="1798.4" y1="1146.8" x2="1643.9" y2="1301.4"/>
		<line x1="1708.6" y1="1098.2" x2="1861.1" y2="953.7"/>
		<line x1="1945.9" y1="719.8" x2="1791.4" y2="874.3"/>
		<line x1="1856.2" y1="671.2" x2="2010.7" y2="516.7"/>
	</g>
	<g id="yellow">
		<line x1="1370.9" y1="378.4" x2="1515.4" y2="223.9"/>
		<line x1="1042.7" y1="406.8" x2="1187.2" y2="252.3"/>
		<line x1="1816.4" y1="19.4" x2="1661.9" y2="173.9"/>
		<line x1="1070.2" y1="923.6" x2="1214.7" y2="769.1"/>
		<line x1="1643.1" y1="537.7" x2="1488.6" y2="692.2"/>
		<line x1="1314.9" y1="566.1" x2="1459.4" y2="411.6"/>
		<line x1="1922.4" y1="178.8" x2="1767.9" y2="333.3"/>
		<line x1="1180.8" y1="999.9" x2="1325.3" y2="845.4"/>
		<line x1="1769.8" y1="293" x2="1615.3" y2="447.5"/>
		<line x1="1441.6" y1="321.4" x2="1586.1" y2="166.9"/>
		<line x1="1499.3" y1="624.3" x2="1344.8" y2="778.8"/>
		<line x1="1416.5" y1="965.3" x2="1561" y2="810.8"/>
		<line x1="1125.1" y1="1044.8" x2="1269.6" y2="890.3"/>
		<line x1="1182.7" y1="383.7" x2="1028.2" y2="538.2"/>
		<line x1="1562.4" y1="697.8" x2="1407.9" y2="852.3"/>
		<line x1="1570.2" y1="894.5" x2="1415.7" y2="1049"/>
		<line x1="1023.4" y1="809.9" x2="1167.9" y2="655.4"/>
		<line x1="1695.3" y1="919.2" x2="1540.8" y2="1073.7"/>
		<line x1="1102.6" y1="1216.4" x2="1247.1" y2="1061.9"/>
		<line x1="1698.2" y1="438.3" x2="1543.7" y2="592.8"/>
		<line x1="1653.7" y1="1023.3" x2="1798.2" y2="868.8"/>
		<line x1="1257.4" y1="424.3" x2="1401.9" y2="269.8"/>
		<line x1="1704.3" y1="1153.2" x2="1549.8" y2="1307.7"/>
		<line x1="1253.8" y1="769.7" x2="1398.3" y2="615.2"/>
		<line x1="1478.7" y1="765.5" x2="1324.2" y2="920"/>
		<line x1="1369" y1="1206.5" x2="1513.5" y2="1052"/>
		<line x1="1812.7" y1="223.8" x2="1658.2" y2="378.3"/>
		<line x1="1025.5" y1="920.3" x2="1170" y2="765.8"/>
		<line x1="1584.8" y1="533.3" x2="1430.3" y2="687.8"/>
		<line x1="1103.6" y1="1067.6" x2="1248.1" y2="913.1"/>
		<line x1="1651.2" y1="352.7" x2="1496.7" y2="507.2"/>
		<line x1="1237.4" y1="1015.9" x2="1381.9" y2="861.4"/>
		<line x1="1677.2" y1="36.9" x2="1522.7" y2="191.4"/>
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

        {/* Animated arrow */}
        <div className="arrow-container">
          <div className="arrow" onClick={handleNextSetClick}>
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
