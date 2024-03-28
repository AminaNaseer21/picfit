import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';


const Home = () =>{
  
  return (

   

<div className="Home">

<div className="header">
      <h1>Welcome to PicMyFit</h1> 
      </div>


<div className="Bottom">

<div className="cardMain">
  
</div>


  <div className="bottomLeft">
    <div className = "cardFavorites">
    <div className = "top">
  <div className="favoriteButtons"> 
      <Link to="/Outfitters">
        <button type="favorites">favoriteButtons</button>
        </Link>
  </div>  
  </div>
  </div> 
  </div>

<div className="bottomMiddle">
<div className = "cardFavorites">
<div className = "top">
  <div className="wardrobeButton">
        <Link to ="/Wardrobe">
        <button type="Wardrobe">Wardrobe</button>
        </Link>
  </div>
</div>  
</div>
</div>

<div className="bottomRight">
<div className = "cardFavorites">
  <div className = "top">
  <div className="uploadButton">
        <Link to = "/Login">
        <button type="Upload">Upload</button>
        </Link>
        </div>
  </div> 
  </div>
</div>



  <div class ="generateNowbutton">
        <Link to = "/Sign up">
          <button type ="Generate Now">generate Now button</button>
        </Link>
  </div>
</div>


{/* <div clasName="centerPicture">
<div className="card">
</div>
</div>     */}



      </div> /*end of <div className="Home">*/
      
    
  );
}; export default Home;

