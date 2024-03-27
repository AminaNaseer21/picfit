import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';


const Home = () =>{
  
  return (

    <div className="centerPicture">
      <h1>Welcome to PicMyFit</h1> 

<div className="lines">
</div>

      <div class="parent">
      <div class="card"></div>
      </div>

      {/* <div className="centeredBox">
        <button type="picture">OUTFIT</button>
      </div>                           */}
      
      <div className="favoriteButtons"> 
      <Link to="/Outfitters">
        <button type="favorites">favoriteButtons</button>
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


      <div class ="generateNowbutton">
        <Link to = "/Sign up">
          <button type ="Generate Now">generateNowbutton</button>
        </Link>
      </div>

      </div>

    
  );
}; export default Home;

