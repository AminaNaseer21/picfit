import React, { useState } from 'react';
import './itempage.css';
import { useNavigate } from 'react-router-dom';

const ItemPage = () => {
  const [itemName, setItemName] = useState('Item Name');
  const [itemCategory, setItemCategory] = useState('Category');
  const [itemSubcategory, setItemSubcategory] = useState('Subcategory');
  const [itemColor, setItemColor] = useState('Color');
  const [wearCount, setWearCount] = useState(0);
  const [itemNotes, setItemNotes] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (e) => setItemName(e.target.value);
  const handleCategoryChange = (e) => setItemCategory(e.target.value);
  const handleSubcategoryChange = (e) => setItemSubcategory(e.target.value);
  const handleColorChange = (e) => setItemColor(e.target.value);
  const handleNotesChange = (e) => setItemNotes(e.target.value);

  // Functions to increment and decrement wear count
  const incrementWearCount = () => setWearCount(wearCount + 1);
  const decrementWearCount = () => setWearCount(Math.max(0, wearCount - 1));

  return (
    <div className="item-page">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button> {/* Back button */}
        <input
          type="text"
          value={itemName}
          onChange={handleNameChange}
          className="item-name"
        />
        <div className="confirm-icon">✓</div>
      </div>

      <div className="content">
        <div className="photo-section">
          {/* Placeholder for item photo */}
          <div className="item-photo">Item Photo Here</div>
        </div>

        <div className="details-section">
          <select value={itemCategory} onChange={handleCategoryChange} className="item-category">
            {/* Placeholder options */}
            <option value="Category 1">Category 1</option>
            <option value="Category 2">Category 2</option>
          </select>
          <select value={itemSubcategory} onChange={handleSubcategoryChange} className="item-subcategory">
            {/* Placeholder options */}
            <option value="Subcategory 1">Subcategory 1</option>
            <option value="Subcategory 2">Subcategory 2</option>
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
          <div className="weather-range">Min-Max Temperature Labels Here</div>
        </div>
      </div>

      <textarea
        value={itemNotes}
        onChange={handleNotesChange}
        className="item-notes"
        placeholder="Add notes here..."
      ></textarea>
    </div>
  );
};

export default ItemPage;
