import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';


const Home = () =>{
  
  return (
<div className="Home"

><div className="Bottom">
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

    <div className="centerPicture">
      <h1>Welcome to PicMyFit</h1> 

{/* <div className="lines">
</div> */}
      


      

      </div>
      </div>
    
  );
}; export default Home;

