//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Logo on the left */}
        <div className="logo">PICMYFIT</div>

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/wardrobe">Wardrobe</a></li>
          </ul>
        </nav>

        {/* Profile Icon on the right */}
        <div className="profile">Profile</div>
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
