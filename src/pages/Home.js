import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';
import clothing2 from "../img/items/2.png";
import clothing1 from "../img/items/1.png";
import camera from "../img/camera.png";
import heart from "../img/heart.png";

const Home = () =>{


  return (

<div className="Home">
<div className="header">
      <h1>Welcome to PicMyFit</h1> 
</div>
    

<div className = "BottomLeftCard">
    <h1>Favorites</h1>
    <div className="FavoritesButton">
        <Link to ="/Outfitter">
        <button type="">Favorites</button>
        </Link>  
    </div>
    <img src={heart} alt="heart"/> 
</div>




<div className = "MiddleCard">
  <h1>Outfits</h1>
<div className= "MiddleMiddleCard">
    <h2>Outfit #1</h2>
</div>
<div className= "LeftMiddleCard">
    <h2>Outfit #2</h2>
</div>
<div className= "RightMiddleCard">
    <h3>Outfit #3</h3>
</div>

<div className = "GenerateButton">
  <Link to ="/Outfitter">
        <button type="button">Generate Outfit</button>
   </Link>  
   <Link to ="/Login">
    <button type="button">Begin</button>
   </Link>
  
</div>
</div>


    <div className= "BottomMiddleCard">
    <h1>Wardrobe</h1>
        <div className = "FavoritesButton">
            <Link to ="/Wardrobe">
            <button type="Wardrobe">Wardrobe</button>
            </Link> 
        </div>
        <img src={clothing1} alt="Outfit1"/>
        
        <img src={clothing2} alt="Outfit2"/>
       
    </div>


    <div className= "BottomRightCard">
      <h1>Upload</h1>
      <div className = "FavoritesButton">
          <Link to = "/Profile">
          <button type ="Upload">Upload</button>
          </Link>
        </div>
        <img src={camera} alt="camera"/>
    </div>



</div> 

  );

}; export default Home;