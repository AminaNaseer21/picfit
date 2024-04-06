import React, { useState } from 'react';
import styles from './Outfitter.module.css';

const Outfitter = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleButtonClick = (category) => {
    setActiveCategory(category);
    // Toggle dropdown visibility only if the clicked category is not "Weather"
    if (category !== 'Weather') {
      setDropdownVisible(!dropdownVisible);
    }
  };

  return (
    <div className={styles.outfitterContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Outfitter Categories</div>
        <ul className={styles.sidebarList}>
          <li className={activeCategory === 'Generate Outfit' ? styles.active : ''} onClick={() => handleButtonClick('Generate Outfit')}>
            Generate Outfit
            {dropdownVisible && <span className={styles.dropdownText}>Temp Text</span>}
          </li>
          <li className={activeCategory === 'View More Outfits' ? styles.active : ''} onClick={() => handleButtonClick('View More Outfits')}>
            View More Outfits
            {dropdownVisible && <span className={styles.dropdownText}>Temp Text</span>}
          </li>
          <li className={activeCategory === 'Favorites' ? styles.active : ''} onClick={() => handleButtonClick('Favorites')}>
            Favorites
            {dropdownVisible && <span className={styles.dropdownText}>Temp Text</span>}
          </li>
          <li className={activeCategory === 'Why this Outfit?' ? styles.active : ''} onClick={() => handleButtonClick('Why this Outfit?')}>
            Why this Outfit?
            {dropdownVisible && <span className={styles.dropdownText}>Temp Text</span>}
          </li>
          <li className={activeCategory === 'Rate this Outfit' ? styles.active : ''} onClick={() => handleButtonClick('Rate this Outfit')}>
            Rate this Outfit
            {dropdownVisible && <span className={styles.dropdownText}>Temp Text</span>}
          </li>
          <li className={activeCategory === 'Edit Preferences' ? styles.active : ''} onClick={() => handleButtonClick('Edit Preferences')}>
            Edit Preferences
            {dropdownVisible && <span className={styles.dropdownText}>Temp Text</span>}
          </li>
        </ul>
      </div>
      <div className={styles.outfitterContent}>
        <div className={styles.square}></div>
      </div>
      <button className={styles.outfitterButton} onClick={() => handleButtonClick('Weather')}>
        Weather
      </button>
    </div>
  );
};

export default Outfitter;
