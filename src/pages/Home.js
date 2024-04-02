import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';
import clothing1 from "../img/items/1.png";

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
        
        <img src={clothing1} alt="Outfit 1"/>
        
    </div>
</div>


    <div className= "BottomMiddleCard">
    <h1>Wardrobe</h1>
        <div className = "Wardrobe">
            <Link to ="/Wardrobe">
              <button type="Wardrobe">Wardrobe</button>
            </Link>
        </div>
    </div>

    <div className= "BottomRightCard">
      <h1>Upload</h1>
    </div>



</div> /*end of <div className="Home">*/
    
  );

}; export default Home;