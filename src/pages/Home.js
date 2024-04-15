import React from 'react';
import './home.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="Home">
      {/* Centered dotted box */}
      <div className="dotted-box"></div>

      {/* Upload button */}
      <div className="upload-button">
        <Link to="/Upload">
          <button type="button">Upload</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
