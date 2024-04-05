import React, { useState } from 'react';
import { BkgRmvr_API_KEY } from './config.js'; // Import API key from config.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
import OpenAIVisionService from '../Services/OpenAIVisionService';
import './Upload.css'; // Import the CSS file

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [developerImage, setDeveloperImage] = useState(null); // State for developer testing image
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionInitiated, setActionInitiated] = useState(false);
  const [imageUploads, setImageUploads] = useState([]);
  const { currentUser } = useAuth();
  const firestore = getFirestore(); // Initialize Firestore here

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setActionInitiated(true); // Set action initiated when image is selected
    setImageUploads(Array.from(event.target.files)); // Set image uploads for Firebase
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
      setShowModal(true); // Show modal after processing image
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
          setShowModal(true); // Show modal after processing image
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(image);
      setActionInitiated(true);
    }
  };

  const handleConfirmUpload = async () => {
    // Handle confirming upload
    setShowModal(false);
    setActionInitiated(false); // Reset action initiated after confirming upload
    await uploadFiles(); // Upload images to Firebase
  };

  const handleRetake = () => {
    // Handle retaking image
    setImage(null);
    setResult(null);
    setDeveloperImage(null);
    setShowModal(false);
    setActionInitiated(false); // Reset action initiated after retaking image
  };

  const uploadFiles = async () => {
    if (!currentUser || imageUploads.length === 0) return;

    const processedImage = result || developerImage; // Use processed image if available, fallback to developerImage if not
    if (!processedImage) return; // Return if neither processedImage nor developerImage is available

    const promises = imageUploads.map((file) => {
      const imageRef = ref(storage, `images/${currentUser.uid}/${file.name + uuidv4()}`);
      return uploadBytes(imageRef, processedImage).then(snapshot => {
        return getDownloadURL(snapshot.ref).then(url => {
          return fetch(url)
            .then(res => res.blob())
            .then(blob => {
              return OpenAIVisionService.analyzeImage(blob, prompt)
                .then(async response => {
                  console.log('Vision API response:', response);

                  const [shortName, category, specificItemType, color, lowTemp, highTemp] = response.data.choices[0].text.trim().split('\n');

                  const docRef = doc(firestore, `users/${currentUser.uid}/wardrobe/${file.name + uuidv4()}`);
                  await setDoc(docRef, {
                    imageUrl: url,
                    shortName,
                    category,
                    specificItemType,
                    color,
                    temperatureRange: `${lowTemp} - ${highTemp}`,
                  });

                  return docRef;
                })
                .catch(err => {
                  console.error('Vision API error:', err);
                  throw err; // Rethrow to be caught by the outer catch
                });
            });
        });
      }).catch(error => {
        console.error('Error during file upload and Firestore operation:', error);
        throw error; // Rethrow to be caught by the outer promise chain
      });
    });

    try {
      const docRefs = await Promise.all(promises);
      console.log('Documents created:', docRefs);
      // Here you could update state to reflect the successful uploads or navigate the user to another page
    } catch (error) {
      console.error('Error uploading files and saving data:', error);
    }
  };

  return (
    <div className="upload-container container">
      <h1 className="begin-making">Upload Image and Process</h1>
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

      {/* Modal for Confirm Upload or Retake */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Upload</h2>
            <p>Would you like to confirm the upload or retake the image?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmUpload}>Confirm Upload</button>
              <button onClick={handleRetake}>Retake</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
