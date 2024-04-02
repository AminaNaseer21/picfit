import React from 'react';
import './home.css'; // Make sure to import the CSS file




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
    </div>

    <div className= "BottomMiddleCard">
    <h1>Wardrobe</h1>
    </div>

    <div className= "BottomRightCard">
      <h1>Upload</h1>
    </div>



</div> /*end of <div className="Home">*/
    
  );

}; export default Home;