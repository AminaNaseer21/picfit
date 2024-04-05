// Outfitter.js

import React from 'react';
import './Outfitter.css';
import TempOutfitterImg from './img/TempOutfitterImg.png'; // import the image

const Outfitter = () => {
  return (
    <div className="outfitter-container">
      <header>
        <h1>Today's Outfit</h1>
      </header>
      <main className="main-content"> {/* Add className here */}
        <section className="generate-outfit">
          <h2>Generate Outfit</h2>
          <button>Generate Outfit</button>
        </section>
        <section className="view-more-outfits">
          <h2>View More Outfits</h2>
        </section>
        <section className="weather-outfits">
          <h2>WEATHER Outfits</h2>
          <p>Weather conditions: [insert weather conditions here]</p>
          <img src={TempOutfitterImg} alt="Weather Icon" /> {/* Use the imported image */}
          <div className="rate-outfit">
            <h3>Rate this Outfit</h3>
            <button>Rate this Outfit</button>
          </div>
          <p>Why this Outfit?</p>
          <p>Edit Preferences</p>
        </section>
        <section className="favorites">
          <h2>Favorites</h2>
          <button>Favorite this outfit</button>
          <p>NIRVANA</p>
        </section>
      </main>
      <footer>
        {/* Empty footer */}
      </footer>
    </div>
  );
}

export default Outfitter;
