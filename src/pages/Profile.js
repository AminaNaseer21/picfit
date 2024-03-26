import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './Profile.css';

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

      // Update user data in Firestore
      await updateDoc(doc(firestore, "users", user.uid), {
        name: userData.name,
        phone: userData.phone,
        ...(photoURL && { profilePicture: photoURL }) // Only set profilePicture if photoURL is truthy
      });

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

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        {/* If the user has a profile picture, display it, otherwise show a placeholder */}
        {userData.profilePicture ? (
          <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <div className="profile-picture">Profile Picture</div>
        )}
        <h2 className="profile-name">Welcome {userData.name}</h2>
      </div>
      <div className="profile-main">
        <h1 className="profile-header">Your Profile</h1>
        <div className="profile-info">
          <form className="profile-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
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
              type="file" 
              onChange={handleFileChange}
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
