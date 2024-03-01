import React from 'react';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file

export default function Wardrobe() {
  return (
    <div className="upload-container">
      <input type="file" accept="image/*" className="upload-button" />
    </div>
  );
}
