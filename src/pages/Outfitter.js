import React from 'react';
import styles from './Outfitter.css';
import TempOutfitterImg from '../img/TempOutfitterImg.png';

const Outfitter = () => {
  return (
    <div className={styles.outfitterContainer}>
      <div className={styles.outfitterContent}>
        <div className={styles.outfitterButtonsContainer}>
          {/* Unique names for each button */}
          <button className={styles.outfitterButton}>Generate Outfit</button>
          <button className={styles.outfitterButton}>View More Outfits</button>
          <button className={styles.outfitterButton}>Favorites</button>
          <button className={styles.outfitterButton}>Why this Outfit?</button>
          <button className={styles.outfitterButton}>Rate this Outfit</button>
          <button className={styles.outfitterButton}>Edit Preferences</button>
        </div>
        <img src={TempOutfitterImg} alt="Outfitter" className={styles.outfitterImage} />
      </div>
      {/* Button on the right */}
      <button className={styles.outfitterButton}>Weather</button>
    </div>
  );
};

export default Outfitter;
