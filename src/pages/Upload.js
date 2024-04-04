import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';
const BkgRmvr_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
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

  return (
    <div className="container">
      <h1>Remove Background API Demo</h1>
      <div className="image-container">
        <div className="image-box">
          {image && (
            <div>
              <h2>Uploaded Image</h2>
              <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="uploaded-image" />
            </div>
          )}
        </div>
        <div className="result-box">
          {result && (
            <div>
              <h2>Processed Image</h2>
              <img src={result} alt="Processed Image" className="processed-image" />
            </div>
          )}
        </div>
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
