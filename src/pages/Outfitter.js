// Outfitter.js

import React, { useState } from 'react';
import styles from './Outfitter.module.css';

const Outfitter = () => {
  const [activeCategory, setActiveCategory] = useState('');

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
        <div className={styles.square}></div>
      </div>
      <button className={styles.outfitterButton}>Weather</button>
    </div>
  );
};

export default Outfitter;
