import React, { useState, useEffect } from 'react';
import './itempage.css';
import { useNavigate } from 'react-router-dom';
import item1 from '../img/items/1.png';

const categoriesWithSubcategories = {
  "T-shirts": ["Graphic", "Plain", "Polo", "Tank Tops"],
  "Shirts": ["Shirt Jackets", "Short-Sleeve Shirts", "Long-Sleeve Shirts", "Sweater Polos"],
  "Sweatshirts": ["Crew Neck Sweatshirts", "Graphic Sweatshirts"],
  "Denim": ["Straight", "Tapered", "Boyfriend", "Baggy", "Slim", "Bootcut", "Flared", "Jeggings", "Mom", "Wide Leg"],
  "Pants": ["Chinos", "Trousers", "Joggers", "Workwear", "Cargo"],
  "Sweatpants": ["Jogger", "Classic"],
  "Shorts": ["Classic", "Active", "Mesh Shorts", "Denim Shorts", "Cargo"],
  "Hoodies": ["Zip-Up Hoodies", "Pullover Hoodies", "Graphic Hoodies"],
  "Sweaters": ["Pullover Sweaters", "Cardigan Sweaters"]
};

const ItemPage = () => {
  const [itemName, setItemName] = useState('Blue Button Up');
  const [itemCategory, setItemCategory] = useState(Object.keys(categoriesWithSubcategories)[0]);
  const [itemSubcategory, setItemSubcategory] = useState('');
  const [itemColor, setItemColor] = useState('Color');
  const [wearCount, setWearCount] = useState(3);
  const [itemNotes, setItemNotes] = useState('');

  const navigate = useNavigate();

  const handleNameChange = (e) => setItemName(e.target.value);
  const handleColorChange = (e) => setItemColor(e.target.value);
  const handleNotesChange = (e) => setItemNotes(e.target.value);

  // Functions to increment and decrement wear count
  const incrementWearCount = () => setWearCount(wearCount + 1);
  const decrementWearCount = () => setWearCount(Math.max(0, wearCount - 1));

  useEffect(() => {
    setItemSubcategory(categoriesWithSubcategories[itemCategory][0]);
  }, [itemCategory]);
  
  return (
    <div className="item-page">
      <div className="headerr">
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

        <label htmlFor="dropdown labels">Category</label>
        <select
          id="item-category"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
          className="item-category"
        >
          {Object.keys(categoriesWithSubcategories).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <label htmlFor="dropdown labels">Subcategory</label>
        <select
          id="item-subcategory"
          value={itemSubcategory}
          onChange={(e) => setItemSubcategory(e.target.value)}
          className="item-subcategory"
        >
          {categoriesWithSubcategories[itemCategory].map((subcategory) => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>
          
        <label htmlFor="dropdown labels">Color</label>
          <select value={itemColor} onChange={handleColorChange} className="item-color">
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
            <label htmlFor="dropdown labels">Wear Count </label>
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
