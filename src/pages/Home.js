import React from 'react';
import './home.css'; // Make sure to import the CSS file

const Home = () => {
  return (
    <div className="centerPicture">
      <h1>Home</h1>                             

      <div className="favoriteButtons"> 
        <button type="favorites">Favorites</button>
      </div>   

      <div className="wardrobeButton">
        <button type="Wardrobe">Wardrobe</button>
      </div>  

      <div className="uploadButton">
        <button type="Upload">Upload</button>
      </div> 

    </div>
  );
};

export default Home;
