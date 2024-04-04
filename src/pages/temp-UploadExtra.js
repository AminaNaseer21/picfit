
import React, { useState } from 'react';
import axios from 'axios';
import API_KEY from './config'; // Import API key from the config file

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';

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

      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'x-api-key': API_KEY, // Use the API key from the config file
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
      setError(null);
    } catch (error) {
      setResult(null);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Remove Background API Demo</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      
      {result && (
        <div>
          <h2>Result</h2>
          <img src={`data:image/png;base64,${result}`} alt="Processed Image" />
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
