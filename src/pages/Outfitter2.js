import React, { useState, useEffect } from 'react';
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

  const [typedText, setTypedText] = useState('');
  const text = "Today's Outfit"; // Text to be typed

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100); // Typing speed: 100 milliseconds

    return () => clearInterval(timer); // Cleanup function to clear interval
  }, [text]);

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
        <div className={styles.outfitTitle}>{typedText}</div>
        <div className={styles.square}></div>
      </div>
      <button className={styles.outfitterButton} onClick={() => handleButtonClick('Weather')}>
        Weather
        {dropdownVisible['Weather'] && <span className={styles.dropdownText}><br />Temp Text</span>}
      </button>
    </div>
  );
};

export default Outfitter;
