import React, { useState } from 'react';
import './itempage.css';
import { useNavigate } from 'react-router-dom';
import item1 from '../img/items/1.png';

const ItemPage = () => {
  const [itemName, setItemName] = useState('Blue Button Up');
  const [itemCategory, setItemCategory] = useState('Category');
  const [itemSubcategory, setItemSubcategory] = useState('Subcategory');
  const [itemColor, setItemColor] = useState('Color');
  const [wearCount, setWearCount] = useState(3);
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
          <img src={item1} alt="Item 1" className="item-photo"/>
        </div>

        <div className="details-section">
          <select value={itemCategory} onChange={handleCategoryChange} className="item-category">
            {/* Placeholder options */}
            <option value="Category 1">Tops</option>
            <option value="Category 2">Shirt</option>
            <option value="Category 3">Layering</option>
          </select>
          <select value={itemSubcategory} onChange={handleSubcategoryChange} className="item-subcategory">
            {/* Placeholder options */}
            <option value="Subcategory 1">Long-Sleeve Shirts</option>
            <option value="Subcategory 2">Shirt Jackets</option>
            <option value="Subcategory 2">Short-Sleeve Shirts</option>
            <option value="Subcategory 2">Sweater Polos</option>
          </select>
      
          <select value={itemColor} onChange={handleColorChange} className="item-color">
            {/* Placeholder options */}
            <option value="Blue">Blue</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Red">Red</option>
            <option value="Indigo">Indigo</option>
            <option value="Violet">Violet</option>
            <option value="Purple">Purple</option>
            <option value="Magenta">Magenta</option>
            <option value="Pink">Pink</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
            <option value="Gray">Gray</option>
            <option value="Silver">Silver</option>
            <option value="White">White</option>
            <option value="Cyan">Cyan</option>
            <option value="Teal">Teal</option>
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
