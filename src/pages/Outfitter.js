import React, { useState } from 'react';
import styles from './Outfitter.module.css';

const Outfitter = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState({
    'Generate Outfit': false,
    'View More Outfits': false,
    'Favorites': false,
    'Why this Outfit?': false,
    'Rate this Outfit': false,
    'Edit Preferences': false,
    'Weather': false,
  });

  const handleButtonClick = (category) => {
    setActiveCategory(category);
    setDropdownVisible({
      ...dropdownVisible,
      [category]: !dropdownVisible[category],
    });
  };

  return (
    <div className={styles.outfitterContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarTitle}>Outfitter Categories</div>
        <ul className={styles.sidebarList}>
          <li className={activeCategory === 'Generate Outfit' ? styles.active : ''} onClick={() => handleButtonClick('Generate Outfit')}>
            Generate Outfit
            {dropdownVisible['Generate Outfit'] && <span className={styles.dropdownText}><br />Temp Text</span>}
          </li>
          <li className={activeCategory === 'View More Outfits' ? styles.active : ''} onClick={() => handleButtonClick('View More Outfits')}>
            View More Outfits
            {dropdownVisible['View More Outfits'] && <span className={styles.dropdownText}><br />Temp Text</span>}
          </li>
          <li className={activeCategory === 'Favorites' ? styles.active : ''} onClick={() => handleButtonClick('Favorites')}>
            Favorites
            {dropdownVisible['Favorites'] && <span className={styles.dropdownText}><br />Temp Text</span>}
          </li>
          <li className={activeCategory === 'Why this Outfit?' ? styles.active : ''} onClick={() => handleButtonClick('Why this Outfit?')}>
            Why this Outfit?
            {dropdownVisible['Why this Outfit?'] && <span className={styles.dropdownText}><br />Temp Text</span>}
          </li>
          <li className={activeCategory === 'Rate this Outfit' ? styles.active : ''} onClick={() => handleButtonClick('Rate this Outfit')}>
            Rate this Outfit
            {dropdownVisible['Rate this Outfit'] && <span className={styles.dropdownText}><br />Temp Text</span>}
          </li>
          <li className={activeCategory === 'Edit Preferences' ? styles.active : ''} onClick={() => handleButtonClick('Edit Preferences')}>
            Edit Preferences
            {dropdownVisible['Edit Preferences'] && <span className={styles.dropdownText}><br />Temp Text</span>}
          </li>
        </ul>
      </div>
      <div className={styles.outfitterContent}>
        <div className={styles.square}></div>
        <div className={styles.outfitTitle}>Today's Outfit</div> {/* Move this line inside outfitterContent */}
      </div>
      <button className={styles.outfitterButton} onClick={() => handleButtonClick('Weather')}>
        Weather
        {dropdownVisible['Weather'] && <span className={styles.dropdownText}><br />Temp Text</span>}
      </button>
    </div>
  );
};

export default Outfitter;
