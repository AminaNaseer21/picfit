// Outfitter.js

import React from 'react';
import styles from './Outfitter.module.css'; // Import CSS module
import TempOutfitterImg from '../img/TempOutfitterImg.png'; // adjust the path as needed

const Outfitter = () => {
  return (
    <div className={styles.outfitterContainer}>
      <header className={styles.header}>
        <h1>Today's Outfit</h1>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.generateOutfitSection}>
          <h2>Generate Outfit</h2>
          <button className={styles.generateOutfitButton}>Generate Outfit</button>
        </section>
        <section className={styles.viewMoreOutfitsSection}>
          <h2>View More Outfits</h2>
        </section>
        <section className={styles.weatherOutfitsSection}>
          <h2>WEATHER Outfits</h2>
          <p>Weather conditions: [insert weather conditions here]</p>
          <img src={TempOutfitterImg} alt="Weather Icon" className={styles.weatherImage} />
          <div className={styles.rateOutfitSection}>
            <h3>Rate this Outfit</h3>
            <button className={styles.rateOutfitButton}>Rate this Outfit</button>
          </div>
          <p>Why this Outfit?</p>
          <p>Edit Preferences</p>
        </section>
        <section className={styles.favoritesSection}>
          <h2>Favorites</h2>
          <button className={styles.favoriteButton}>Favorite this outfit</button>
          <p>NIRVANA</p>
        </section>
      </main>
      <footer className={styles.footer}>
        {/* Empty footer */}
      </footer>
    </div>
  );
}

export default Outfitter;
