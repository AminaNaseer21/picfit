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
 <div className = "Wardrobecard1">
  <h1>Outfit 1</h1>
</div> 
<div className="Wardrobecard2">
  <h2>Outfit 2</h2>
</div>
<div className="Wardrobecard3">
  <h3>Outfit 3</h3>
</div>
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


<div className = "NavbuttonRight">
  <button type="NavbuttonRight" >Next</button>
</div>
<div className = "NavbuttonLeft">
  <button type="NavbuttonLeft">Previous</button>
</div>



  <div class ="generateNowbutton">
        <Link to = "/login">
          <button type ="Generate Now">generate Now button</button>
        </Link>
  </div>
</div>


      </div> /*end of <div className="Home">*/
      
    
  );
}; export default Home;

