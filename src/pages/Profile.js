import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './Profile.css';
import profilePlaceholder from '../img/profilePlaceholder.png';

const commonColors = [
  '#FF0000', // Red
  '#00FF00', // Lime
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#00FFFF', // Aqua/Cyan
  '#FF00FF', // Magenta/Fuchsia
  '#FFFFFF', // White
  '#000000', // Black
  '#800000', // Maroon
  '#808000', // Olive
  '#008000', // Green
  '#800080', // Purple
  '#008080', // Teal
  '#000080', // Navy
  '#808080', // Gray
  '#C0C0C0', // Silver
];

function ProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', profilePicture: '' });
  const [profileImage, setProfileImage] = useState(null); // For the image file

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    // Subscribe to the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set the email field from authentication
        setUserData(prevData => ({ ...prevData, email: user.email }));

        // Get additional user data from Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          if (data.dislikedColors) {
            setDislikedColors(data.dislikedColors);
          }

          if (data.dislikedStyles) {
            setDislikedStyles(data.dislikedStyles);
          }
        }
    }
  });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const updateUserProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();
    const storage = getStorage();
  
    if (user) {
      let photoURL = userData.profilePicture;
      if (profileImage) {
        // Create a file reference
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
  
        // Upload file
        await uploadBytes(imageRef, profileImage);
  
        // Get file URL
        photoURL = await getDownloadURL(imageRef);
      }
  
      // Set user data in Firestore (this will create the document if it doesn't exist)
      await setDoc(doc(firestore, "users", user.uid), {
        name: userData.name,
        phone: userData.phone,
        ...(photoURL && { profilePicture: photoURL }) // Only set profilePicture if photoURL is truthy
      }, { merge: true }); // Merge with existing document data
  
      // Update local state
      setUserData(prevData => ({ ...prevData, profilePicture: photoURL }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile();
  };

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  
  const [dislikedColors, setDislikedColors] = useState([]);

  const toggleColor = (color) => {
    setDislikedColors(prevColors => {
      if (prevColors.includes(color)) {
        return prevColors.filter(c => c !== color); // Remove color
      } else {
        return [...prevColors, color]; // Add color
      }
    });
  };

  const saveColorPreferences = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();

    if (user) {
      const userDocRef = doc(firestore, "users", user.uid);
      try {
        // Save both color and style preferences
        await setDoc(userDocRef, {
          dislikedColors,
          dislikedStyles
        }, { merge: true });
        console.log('Preferences saved!');
      } catch (error) {
        console.error("Error saving preferences:", error);
      }
    }
  };  

  const [dislikedStyles, setDislikedStyles] = useState([]);

  const toggleStyle = (style) => {
    setDislikedStyles(prevStyles => {
      if (prevStyles.includes(style)) {
        return prevStyles.filter(s => s !== style); // Remove style
      } else {
        return [...prevStyles, style]; // Add style
      }
    });
  };






  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        {/* If the user has a profile picture, display it, otherwise show a placeholder */}
        {userData.profilePicture ? (
          <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture">
            <img src={profilePlaceholder} alt="PicMyFit Logo" className="profile-picture"/>
          </div>
        )}
        <h2 className="profile-name">Welcome {userData.name}</h2>
      </div>
      <div className="profile-main">
        
          <div className="profile-info">
            <form className="profile-form" onSubmit={handleSubmit}>
              
              <div className="profile-header">P R O F I L E</div>

              <input 
                type="text" 
                placeholder="Your Name" 
                className="profile-input" 
                value={userData.name}
                name="name"
                onChange={handleChange}
              />
              <input 
                type="email" 
                placeholder="youremail@example.com" 
                className="profile-input" 
                value={userData.email}
                name="email"
                onChange={handleChange}
                disabled // Email should not be editable as it's used for login
              />
              <input 
                type="tel" 
                placeholder="(555) 123-4567" 
                className="profile-input" 
                value={userData.phone}
                name="phone"
                onChange={handleChange}
              />
              <div className="upload-photo">Upload Profile Picture</div>
              <input 
                type="file" 
                className="profile-input-file"
                onChange={handleFileChange}
              />
              <button type="submit" className="profile-submit">Update Profile Details</button>

              <div className="profile-additional-settings">
                <h3 className="settings-header">P R E F E R E N C E</h3>
                <div className="settings-content">
                  <h1 className="settings2-header">Avoid Colors</h1>
                  <div className="settings3-header">Select any colors that you prefer not to wear.</div>
                    <div className="color-grid">
                      {commonColors.map(color => (
                        <div 
                          key={color}
                          className={`color-square ${dislikedColors.includes(color) ? 'disliked' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => toggleColor(color)}
                        />
                      ))}
                    </div>


              <div className="style-preferences">
                <h1 className="settings2-header">Avoid Styles</h1>
                <div className="settings3-header">Select any styles that you prefer not to wear.</div>
                  <div className="style-grid">
                    {['Casual', 'Athletic', 'Formal'].map(style => (
                      <button
                        key={style}
                        className={`style-button ${dislikedStyles.includes(style) ? 'disliked-style' : ''}`}
                        onClick={() => toggleStyle(style)}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
              </div>

                    <button onClick={saveColorPreferences} className="save-colors-btn">Save Preferences</button>
                </div>
              </div>

            </form>
          </div>

          

        </div>
        
    </div>
  );
}

export default ProfilePage;
