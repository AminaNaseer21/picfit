import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';
import clothing1 from "../img/items/1.png";
import clothing2 from "../img/items/2.png";
import camera from "../img/camera.png";

const Home = () =>{
 
  return (


<div className="Home">
<div className="header">
      <h1>Welcome to PicMyFit</h1> 
  </div>
    
  <div className = "MiddleCard">
  <h1>Outfits</h1>
  </div>


<div className = "BottomLeftCard">
    <h1>Favorites</h1>
    <div className="FavoritesButton">
        <Link to ="THE OUTFITTER">
        <button type="Wardrobe">Favorites</button>
        </Link>  
    </div>
    <img src={clothing1} alt="Outfit1"/> 
    <img src={clothing2} alt="Outfit2"/> 
</div>


    <div className= "BottomMiddleCard">
    <h1>Wardrobe</h1>
        <div className = "Wardrobe">
            <Link to ="/Wardrobe">
            <button type="Wardrobe">Wardrobe</button>
            </Link> 
        </div>
        <img src={clothing2} alt="Outfit2"/>
    </div>


    <div className= "BottomRightCard">
      <h1>Upload</h1>
      <div className = "Wardrobe">
          <Link to = "profile">
          <button type = "profile">upload</button>
          </Link>
        </div>
        <img src={camera} alt="camera"/>
    </div>



</div> /*end of <div className="Home">*/
    
  );

}; export default Home;