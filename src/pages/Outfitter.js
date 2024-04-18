import React, { useState } from 'react';
import getAllClothingItems from '../Services/getAllClothingItems'; // Ensure this is correctly imported
import generateOutfits from '../Services/generateOutfits'; // Ensure this is correctly imported
import WeatherApp from './WeatherApp';
import './Outfitter.css';

const Outfitter = () => {
  const [temperature, setTemperature] = useState('');
  const [outfits, setOutfits] = useState([]);

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const updateOutfits = async () => {
    console.log(`Updating outfits for ${temperature}°F`);
    try {
      const clothingItems = await getAllClothingItems();
      const outfitSuggestions = await generateOutfits(clothingItems);
      setOutfits(outfitSuggestions);
    } catch (error) {
      console.error("Error updating outfits:", error);
      alert("Failed to update outfits. Please check the console for more information.");
    }
  };

  const showPopup = (outfitIndex) => {
    alert(`That's a great choice! Outfit ${outfitIndex + 1} is all set to turn heads!`);
  };

  return (
    <div className="mainBody">
      <aside className="sidebar">
        <div className="info-block">
          <h2>Why This Fit?</h2>
          <p>Learn why these outfits were generated and how they suit your preferences and the current weather.</p>
        </div>
        <div className="weather-widget">
          <h3>Current Weather</h3>
          <WeatherApp externalTemperature={temperature} /> {/* Pass temperature as a prop */}
          <input type="number" className="weather-input" placeholder="Change temperature" value={temperature} onChange={handleTemperatureChange} />
          <button className='outfitter-buttons' onClick={updateOutfits}>Update</button>
        </div>
        <button className='outfitter-buttons' >Edit Preferences</button>
      </aside>

      <section className="content">
        <div className="title">O U T F I T T E R</div>
        <div className="outfit-container">
          {outfits.map((outfit, index) => (
            <div key={index} className="outfit-grid">
              <h3>Outfit {index + 1}</h3>
              {outfit.map((item, itemIndex) => (
                <p key={itemIndex}>{item}</p>
              ))}
              <button className='outfitter-buttons' onClick={() => showPopup(index)}>Wear This Outfit</button>
              <button className='outfitter-buttons'>Add to Favorites</button>
            </div>
          ))}
        </div>
        <div className="favorites-section">
          <h3>Your Favorite Outfits</h3>
          <p>No favorite outfits added yet.</p>
        </div>
      </section>
    </div>
  );
};

export default Outfitter;