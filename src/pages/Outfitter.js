import React, { useState } from 'react';
import './Outfitter.css';

const Outfitter = () => {
  // State to manage the temperature input
  const [temperature, setTemperature] = useState('');

  // Function to handle temperature change
  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  // Function to update outfits based on temperature (this needs to be implemented)
  const updateOutfits = () => {
    console.log(`Updating outfits for ${temperature}°F`);
    // Implementation needed here to fetch or change outfits based on the temperature
  };

  const showPopup = () => {
    alert("That's a great choice! You're all set to turn heads!");
  };

  return (
    <div className="mainBody">

      <div className="outfit-container">
          <div className="outfit-grid">
              <img src="outfit1_top.jpg" alt="Top Outfit 1" />
              <img src="outfit1_middle.jpg" alt="Middle Outfit 1" />
              <img src="outfit1_bottom.jpg" alt="Bottom Outfit 1" />
              <button className='outfitter-buttons' onClick={showPopup}>Wear This Outfit</button>

          </div>
          <div className="outfit-grid">
              <img src="outfit2_top.jpg" alt="Top Outfit 2" />
              <img src="outfit2_middle.jpg" alt="Middle Outfit 2" />
              <img src="outfit2_bottom.jpg" alt="Bottom Outfit 2" />
              <button className='outfitter-buttons' onClick={showPopup}>Wear This Outfit</button>

          </div>
          <div className="outfit-grid">
              <img src="outfit3_top.jpg" alt="Top Outfit 3" />
              <img src="outfit3_middle.jpg" alt="Middle Outfit 3" />
              <img src="outfit3_bottom.jpg" alt="Bottom Outfit 3" />
              <button className='outfitter-buttons' onClick={showPopup}>Wear This Outfit</button>

          </div>
        </div>
    </div>
  );
};

export default Outfitter;
