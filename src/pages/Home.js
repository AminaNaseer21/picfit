import React from 'react';
import './home.css'; // Make sure to import the CSS file

import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="header">
      <h1>Home</h1>                             
      

      <div className="favoriteButtons"> 
        <button type="favorites">Favorites</button>
      </div>   

      <div className="wardrobeButton">
        <Link to ="/Wardrobe">
        <button type="Wardrobe">Wardrobe</button>
        </Link>
      </div>  

      <div className="uploadButton">
        <button type="Upload">Upload</button>
      </div> 

      </div>

     
  );
};

export default Home;
