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
      
      <div className="sidebar">
          <div className="info-block">
              <h2>About This Selection</h2>
              <p>Learn why these outfits were generated and how they suit your preferences and the current weather.</p>
          </div>
          <div className="weather-widget">
              <h3>Current Weather</h3>
              <p>{temperature}°F, Sunny</p> {/* Display dynamic temperature */}
              <input type="number" placeholder="Change temperature" value={temperature} onChange={handleTemperatureChange} />
              <button onClick={updateOutfits}>Update</button>
          </div>
          <button className="edit-preferences">Edit Preferences</button>
      </div>


      <div className="outfit-container">
          <div className="outfit-grid">
              <img src="outfit1_top.jpg" alt="Top Outfit 1" />
              <img src="outfit1_middle.jpg" alt="Middle Outfit 1" />
              <img src="outfit1_bottom.jpg" alt="Bottom Outfit 1" />
              <button className='outfitter-buttons' onClick={showPopup}>Wear This Outfit</button>
              <button className='outfitter-buttons'>Add to Favorites</button>

          </div>
          <div className="outfit-grid">
              <img src="outfit2_top.jpg" alt="Top Outfit 2" />
              <img src="outfit2_middle.jpg" alt="Middle Outfit 2" />
              <img src="outfit2_bottom.jpg" alt="Bottom Outfit 2" />
              <button className='outfitter-buttons' onClick={showPopup}>Wear This Outfit</button>
              <button className='outfitter-buttons'>Add to Favorites</button>

          </div>
          <div className="outfit-grid">
              <img src="outfit3_top.jpg" alt="Top Outfit 3" />
              <img src="outfit3_middle.jpg" alt="Middle Outfit 3" />
              <img src="outfit3_bottom.jpg" alt="Bottom Outfit 3" />
              <button className='outfitter-buttons' onClick={showPopup}>Wear This Outfit</button>
              <button className='outfitter-buttons'>Add to Favorites</button>

          </div>
        </div>
    </div>
  );
};

export default Outfitter;
