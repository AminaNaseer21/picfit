import logo from './PicMyFit_Logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Logo on the left */}
        <div className="picmyfit-logo">
          <img src={logo} alt="PicMyFit Logo" />
        </div>
          
        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/My Wardrobe">Wardrobe</a></li>
            <li><a href="/My Profile">Profile</a></li>
          </ul>
        </nav>
        
      </header>

      {/* Main content area */}
      <main>
        <h1>Welcome to Pic My Fit</h1>
        {/* Other content goes here */}
      </main>
    </div>
  );
}

export default App;
