import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';


const Home = () => {
  
  return (

    <div className="centerPicture">
      <h1>Welcome to MyPicFit</h1> 

<div className="lines">
</div>

      <div className="centeredBox">
        <button type="picture">OUTFIT</button>
      </div>                          
      
      <div className="favoriteButtons"> 
      <Link to="/">
        <button type="favorites">Favorites</button>
        </Link>
      </div>   

      <div className="wardrobeButton">
        <Link to ="/Wardrobe">
        <button type="Wardrobe">Wardrobe</button>
        </Link>
      </div>  

      <div className="uploadButton">
        <Link to = "/Login">
        <button type="Upload">Upload</button>
        </Link>
      </div> 

      </div>

     
  );
};

export default Home;
