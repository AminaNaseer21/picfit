import logo from './PicMyFit_logo.png';

export default function Home() {
  const centerPicture={
    display: 'flex',
    justifyContent: 'center', //Sets the picture frames to focus in the center.
    alignItems: 'center', //Alligns everything to the center.
    height: '20vh' // This makes the div take the full height of the viewport
  };

  
    return (
    <div>
      <h1>Home</h1>                             
      <img src={logo} alt="PicMyFit logo" />    
    </div>
  );
}
