import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
import OpenAIVisionService from '../Services/OpenAIVisionService';
import './Upload.css'; // Import the CSS file

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';
const BkgRmvr_API_KEY = 'f368c06e45ec67d424ea1fa9d4a0423733f8ffd7c3c5ed38aa49b991176f23012f613fe96a1c16e519a15418aa71fee5';

const App = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [developerImage, setDeveloperImage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionInitiated, setActionInitiated] = useState(false);
  const [imageUploads, setImageUploads] = useState([]);
  const { currentUser } = useAuth();
  const firestore = getFirestore();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setActionInitiated(false); // Reset action initiated when new image is selected
    setImageUploads(Array.from(event.target.files));
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
      setActionInitiated(true); // Indicate that background removal process has been initiated
    } catch (error) {
      console.error(error);
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
    setShowModal(false);
    setActionInitiated(false);

    // Upload both original and processed images if available
    await uploadFiles(result || developerImage);
  };

  const handleRetake = () => {
    setImage(null);
    setResult(null);
    setDeveloperImage(null);
    setShowModal(false);
    setActionInitiated(false);
  };

  const uploadFiles = async (processedImage) => {
    if (!currentUser || imageUploads.length === 0) return;

    const contentType = processedImage.startsWith('data:image/png') ? 'image/png' : 'application/octet-stream';

    const promises = imageUploads.map((file) => {
      const imageRef = ref(storage, `images/${currentUser.uid}/${file.name + uuidv4()}`);
      const metadata = {
        contentType: contentType,
      };
      return fetch(processedImage)
        .then(res => res.blob())
        .then(blob => {
          return uploadBytes(imageRef, blob, metadata).then(snapshot => {
            return getDownloadURL(snapshot.ref).then(url => {
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
                  throw err;
                });
            });
          });
        }).catch(error => {
          console.error('Error during file upload and Firestore operation:', error);
          throw error;
        });
    });

    try {
      const docRefs = await Promise.all(promises);
      console.log('Documents created:', docRefs);
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
          {developerImage && <img src={developerImage} alt="Developer Test Image" className="processed-image" />}
        </div>
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleRemoveBackground}>Remove Background</button>
      <button onClick={handleDeveloperButtonClick}>Display Uploaded Image (for Developer Testing only)</button>
      {error && <div className="error">{error}</div>}

      {actionInitiated && (
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
