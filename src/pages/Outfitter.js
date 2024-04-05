import React from 'react';
import styles from './Outfitter.module.css';
import TempOutfitterImg from '../img/TempOutfitterImg.png';

const Outfitter = () => {
  return (
    <div className={styles.outfitterContainer}>
      <div className={styles.outfitterButtonsContainer}>
        {/* Buttons on the left */}
        <button className={styles.outfitterButton}>Button 1</button>
        <button className={styles.outfitterButton}>Button 2</button>
        <button className={styles.outfitterButton}>Button 3</button>
        <button className={styles.outfitterButton}>Button 4</button>
        <button className={styles.outfitterButton}>Button 5</button>
        <button className={styles.outfitterButton}>Button 6</button>
      </div>
      <img src={TempOutfitterImg} alt="Outfitter" className={styles.outfitterImage} />
      {/* Button on the right */}
      <button className={styles.outfitterButton}>Button 7</button>
    </div>
  );
};

export default Outfitter;
