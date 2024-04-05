// Outfitter.js

import React, { useState } from 'react';
import styles from './Outfitter.module.css';
import TempOutfitterImg from '../img/TempOutfitterImg.png';

const Outfitter = () => {
  // State to track the active category for sidebar
  const [activeCategory, setActiveCategory] = useState('');

  // Function to handle click on a button and set the active category
  const handleButtonClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.outfitterContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Outfitter Categories</div>
        <ul className={styles.sidebarList}>
          <li className={activeCategory === 'Generate Outfit' ? styles.active : ''} onClick={() => handleButtonClick('Generate Outfit')}>Generate Outfit</li>
          <li className={activeCategory === 'View More Outfits' ? styles.active : ''} onClick={() => handleButtonClick('View More Outfits')}>View More Outfits</li>
          <li className={activeCategory === 'Favorites' ? styles.active : ''} onClick={() => handleButtonClick('Favorites')}>Favorites</li>
          <li className={activeCategory === 'Why this Outfit?' ? styles.active : ''} onClick={() => handleButtonClick('Why this Outfit?')}>Why this Outfit?</li>
          <li className={activeCategory === 'Rate this Outfit' ? styles.active : ''} onClick={() => handleButtonClick('Rate this Outfit')}>Rate this Outfit</li>
          <li className={activeCategory === 'Edit Preferences' ? styles.active : ''} onClick={() => handleButtonClick('Edit Preferences')}>Edit Preferences</li>
        </ul>
      </div>
      <div className={styles.outfitterContent}>
        <div className={styles.outfitterButtonsContainer}>
          {/* Buttons */}
          {/* Button titles will be displayed in the sidebar */}
          {/* Unique names for each button */}
          <button className={styles.outfitterButton}>Generate Outfit</button>
          <button className={styles.outfitterButton}>View More Outfits</button>
          <button className={styles.outfitterButton}>Favorites</button>
          <button className={styles.outfitterButton}>Why this Outfit?</button>
          <button className={styles.outfitterButton}>Rate this Outfit</button>
          <button className={styles.outfitterButton}>Edit Preferences</button>
        </div>
        {/* Image */}
        <img src={TempOutfitterImg} alt="Outfitter" className={styles.outfitterImage} />
      </div>
      {/* Button on the right */}
      <button className={styles.outfitterButton}>Weather</button>
    </div>
  );
};

export default Outfitter;
