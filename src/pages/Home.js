import logo from './PicMyFit_Logo.png';
import  React from 'react';
export default function Home() {
/*Section 1: This section of the code centers the picture of the clothes from wardrobe and displays it in a way that can be similarly 
seen in 'HomePagePic.jpg'. 
*/
  const centerPicture={
    display: 'flex',
    justifyContent: 'center', //Sets the picture frames to focus in the center.
    alignItems: 'center', //Alligns everything to the center.
    height: '20vh' // This makes the div take the full height of the viewport
  };

  /*Section 2: For this part, the code below will display images of the outfits pulled from the wardrobe and display it 
  as said in section 1.
  */
  
const favoriteButtons={ //This button should be displayed at the bottom left of the webpage.
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '20vh', 
    position: 'fixed',
    width: '50%', 
    bottom: '0', 
    left: '0', 
};

const wardrobeButton={ // this should be displayed at the bottom middle of the webpage 
    display: 'flex',
    justifyContent: 'center', 
    position: 'fixed', 
    left: '50%', 
    bottom: '0', 
    transform: 'translateX(-50%)', //translate the 
    width: 'auto', 
    padding: '10px', 
};

const uploadButton={ //This button should be displayed at the bottom right of the webpage.
    display: 'flex',
    justifyContent: 'center', 
    position: 'fixed', 
    right: '0', 
    bottom: '0', 
    //transform: 'translateX(-100%)', 
    width: 'auto', 
    padding: '10px', 
};
  
    return (
    <div style = {centerPicture}>
      <h1>Home</h1>                             
      <img src={logo} alt="PicMyFit logo" /> 

      <div style={favoriteButtons}> 
        <button type="favorites">favorites</button>
      </div>   

      <div style={wardrobeButton}>
        <button type="Wardrobe">Wardrobe</button>
      </div>  

      <div style={uploadButton}>
        <button type="Upload">Upload</button>
      </div> 

    </div>
    
  );
}
