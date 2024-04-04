import React, { useState } from 'react';

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';
const BkgRmvr_API_KEY = 'f368c06e45ec67d424ea1fa9d4a0423733f8ffd7c3c5ed38aa49b991176f23012f613fe96a1c16e519a15418aa71fee5';

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
    <div>
      <h1>Remove Background API Demo</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      
      {image && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={URL.createObjectURL(image)} alt="Uploaded Image" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}

      {result && (
        <div>
          <h2>Result</h2>
          <img src={result} alt="Processed Image" style={{ maxWidth: '100%', height: 'auto' }} />
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
