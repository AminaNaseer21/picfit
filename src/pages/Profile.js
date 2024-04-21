import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './Profile.css';
import profilePlaceholder from '../img/profilePlaceholder.png';

const commonColors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#00FFFF', '#FF00FF', '#FFFFFF', '#000000',
  '#800000', '#808000', '#008000', '#800080',
  '#008080', '#000080', '#808080', '#C0C0C0',
];

function ProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', profilePicture: '', location: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [dislikedColors, setDislikedColors] = useState([]);
  const [dislikedStyles, setDislikedStyles] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData(prevData => ({ ...prevData, email: user.email }));
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setDislikedColors(data.dislikedColors || []);
          setDislikedStyles(data.dislikedStyles || []);
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

  const toggleColor = (color) => {
    setDislikedColors(prevColors => 
      prevColors.includes(color) ? prevColors.filter(c => c !== color) : [...prevColors, color]
    );
  };

  const toggleStyle = (style) => {
    setDislikedStyles(prevStyles => 
      prevStyles.includes(style) ? prevStyles.filter(s => s !== style) : [...prevStyles, style]
    );
  };

  const savePreferences = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();

    if (user) {
      try {
        await setDoc(doc(firestore, "users", user.uid), {
          name: userData.name,
          phone: userData.phone,
          location: userData.location,
          dislikedColors,
          dislikedStyles,
          profilePicture: await uploadProfilePicture()
        }, { merge: true });

      } catch (error) {
        console.error("Error saving preferences:", error);
      }
    }
  };

  const uploadProfilePicture = async () => {
    if (profileImage) {
      const storage = getStorage();
      const imageRef = ref(storage, `profilePictures/${getAuth().currentUser.uid}`);
      await uploadBytes(imageRef, profileImage);
      return getDownloadURL(imageRef);
    }
    return userData.profilePicture;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePreferences();
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
            <input 
              type="text" 
              placeholder="Your Zipcode or City" 
              className="profile-input" 
              value={userData.location}
              name="location"
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
                    {['Casual', 'Athletic', 'Formal', 'Vintage', 'Retro', 'Streetwear', 'Preppy', 'Minimalist', 'Hipster', 'Business Casual', 'Chic', 'Gothic'].map(style => (
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
                <button onClick={savePreferences} className="save-colors-btn">Save Preferences</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
