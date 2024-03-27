import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Create a context
const UserContext = createContext();

// Create a custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component that wraps your app and makes the user object available everywhere
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfilePicURL(userData.profilePicture);
        }
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    profilePicURL
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
