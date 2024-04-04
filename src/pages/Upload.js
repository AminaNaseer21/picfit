import React, { useState } from 'react';
import { BkgRmvr_API_KEY } from './config.js'; // Import API key from config.js
import './Upload.css'; // Import the CSS file

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [developerImage, setDeveloperImage] = useState(null); // State for developer testing image
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleRemoveBackground = async () => {
    try {
      const formData = new FormData();
      formData.append('image_file', image);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'x-api-key': BkgRmvr_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const result = await response.blob();
      setResult(URL.createObjectURL(result));
      setError(null);
    } catch (error) {
      console.error(error); // Log the actual error
      setResult(null);
      setError('Failed to remove background');
    }
  };

  const handleDeveloperButtonClick = () => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height + 50; // Add 50 pixels for the thicker rainbow row
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Draw rainbow pixels at the bottom
          const rainbowGradient = ctx.createLinearGradient(0, img.height, 0, img.height + 50);
          rainbowGradient.addColorStop(0, 'red');
          rainbowGradient.addColorStop(0.17, 'orange');
          rainbowGradient.addColorStop(0.34, 'yellow');
          rainbowGradient.addColorStop(0.51, 'green');
          rainbowGradient.addColorStop(0.68, 'blue');
          rainbowGradient.addColorStop(0.85, 'indigo');
          rainbowGradient.addColorStop(1, 'violet');

          ctx.fillStyle = rainbowGradient;
          ctx.fillRect(0, img.height, img.width, 50); // Draw thicker rainbow row
          setDeveloperImage(canvas.toDataURL());
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="upload-container container">
      <h1 className="begin-making">Remove Background API Demo</h1>
      <div className="image-container">
        <div className="image-display-box">
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="uploaded-image" />}
        </div>
        <div className="image-display-box">
          {result && <img src={result} alt="Processed Image" className="processed-image" />}
          {developerImage && <img src={developerImage} alt="Developer Test Image" className="processed-image" />} {/* Display the developer testing image within the same box */}
        </div>
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      <button onClick={handleDeveloperButtonClick}>Display Uploaded Image (for Developer Testing only)</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default App;
