//Outfitter.js
import React, { useState, useEffect } from 'react';
import { getAllClothingItems, generateOutfits, getUserPreferences } from '../Services/OutfitService';
import { addFavoriteOutfit, getFavoriteOutfits, removeFavoriteOutfit } from '../Services/FavoritesService';
import WeatherApp from './WeatherApp';
import { useNavigate } from 'react-router-dom';
import './Outfitter.css';
import tempPlaceholder from '../img/items/1.png';

const Outfitter = () => {
  const [temperature, setTemperature] = useState('');
  const [outfits, setOutfits] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const fetchedFavorites = await getFavoriteOutfits();
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const handleAddToFavorites = async (outfit) => {
    try {
      await addFavoriteOutfit(outfit);
      const updatedFavorites = await getFavoriteOutfits();
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavoriteOutfit(favoriteId);
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId));
    } catch (error) {
      console.error("Error removing outfit from favorites:", error);
      // Optionally, display a user-friendly error message
    }
  };

  const fetchItemDetails = async (outfitNames) => {
    const allItems = await getAllClothingItems();
    return outfitNames.map(outfit =>
      outfit.map(itemName =>
        allItems.find(item => item.shortName.trim().toLowerCase() === itemName.trim().toLowerCase()) || {
          shortName: itemName,
          imageUrl: tempPlaceholder // Placeholder if not found
        }
      )
    );
  };

  const showPopup = (outfitIndex) => {
    alert(`That's a great choice! Outfit ${outfitIndex + 1} is all set to turn heads!`);
  };

  const updateOutfits = async () => {
    try {
      const clothingItems = await getAllClothingItems(); // Debugging log here could help
      console.log('All clothing items:', clothingItems);

      const userPreferences = await getUserPreferences(); // Retrieve user preferences
    console.log('User preferences:', userPreferences);
  
      const outfitNames = await generateOutfits(clothingItems, temperature, userPreferences);
      console.log('Generated outfit names:', outfitNames);
  
      const detailedOutfits = await fetchItemDetails(outfitNames);
      console.log('Detailed outfits:', detailedOutfits);
  
      setOutfits(detailedOutfits);
    } catch (error) {
      console.error("Error updating outfits:", error);
      alert("Failed to update outfits. Please check the console for more information.");
    }
  };

  let navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile');
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
        </div>
        <button className='outfitter-buttons' onClick={handleProfileClick}>Edit Preferences</button>
        <button className='outfitter-buttons' onClick={updateOutfits}>Generate Outfits</button>
      </aside>

      <section className="content">
        <div className="title">O U T F I T T E R</div>
        <div className="outfit-container">
          {outfits.map((outfit, index) => (
            <div key={index} className="outfit-grid">
              <h3>Outfit {index + 1}</h3>
              {outfit.map((item, itemIndex) => (
                <div key={itemIndex} className="clothing-item">
                  <img src={item.imageUrl} alt={item.shortName} />
                  <p>{item.shortName}</p>
                </div>
              ))}
              <button className='outfitter-buttons' onClick={() => showPopup(index)}>Wear This Outfit</button>
              <button className='outfitter-buttons' onClick={() => handleAddToFavorites(outfit)}>Add to Favorites</button>
            </div>
          ))}
        </div>
        <div className="favorites-section">
            <h3>Your Favorite Outfits</h3>
            {favorites.length > 0 ? (
              <div className="outfit-container">
                {favorites.map((favorite, index) => (
                  <div key={index} className="outfit-grid">
                    {favorite.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="clothing-item">
                        <img src={item.imageUrl} alt={item.shortName} className="clothing-item-image" />
                        <p>{item.shortName}</p>
                      </div>
                    ))}
                    <button className='outfitter-buttons' onClick={() => handleRemoveFavorite(favorite.id)}>
                      Remove From Favorites
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No favorite outfits added yet.</p>
            )}
          </div>
      </section>
    </div>
  );
};

export default Outfitter;