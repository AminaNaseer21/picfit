import React, { useState } from 'react';
import './itempage.css';

const ItemPage = () => {
  const [itemName, setItemName] = useState('Item Name');
  const [itemCategory, setItemCategory] = useState('Category');
  const [itemColor, setItemColor] = useState('Color');
  const [wearCount, setWearCount] = useState(0);
  const [itemNotes, setItemNotes] = useState('');

  const handleNameChange = (e) => setItemName(e.target.value);
  const handleCategoryChange = (e) => setItemCategory(e.target.value);
  const handleColorChange = (e) => setItemColor(e.target.value);
  const handleNotesChange = (e) => setItemNotes(e.target.value);

  // Functions to increment and decrement wear count
  const incrementWearCount = () => setWearCount(wearCount + 1);
  const decrementWearCount = () => setWearCount(Math.max(0, wearCount - 1));

  // Placeholder function for outfit builder
  const buildOutfit = () => {
    console.log('Building outfit with current item...');
  };

  return (
    <div className="item-page">
      <div className="photo-section">
        {/* Placeholder for item photo */}
        <div className="item-photo">Item Photo Here</div>
      </div>

      <div className="details-section">
        <input
          type="text"
          value={itemName}
          onChange={handleNameChange}
          className="item-name"
        />
        <select value={itemCategory} onChange={handleCategoryChange} className="item-category">
          {/* Placeholder options */}
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </select>
        <select value={itemColor} onChange={handleColorChange} className="item-color">
          {/* Placeholder options */}
          <option value="Color 1">Color 1</option>
          <option value="Color 2">Color 2</option>
        </select>
        <div className="wear-counter">
          <button onClick={decrementWearCount}>-</button>
          <span>{wearCount}</span>
          <button onClick={incrementWearCount}>+</button>
        </div>
        <button onClick={buildOutfit} className="build-outfit-btn">
          Use this piece in an outfit
        </button>
        {/* Placeholder for weather slider */}
        <div className="weather-range">Weather Range Slider Here</div>
        {/* Placeholder for similar items carousel */}
        <div className="similar-items">Similar Items Carousel Here</div>
        <textarea
          value={itemNotes}
          onChange={handleNotesChange}
          className="item-notes"
          placeholder="Add notes here..."
        ></textarea>
      </div>
    </div>
  );
};

export default ItemPage;
