// Import Firebase and its auth module
import firebase from 'firebase/app';
//import { getAuth} from "firebase/auth";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvwxniL5TX1B9WPpBi-uwLKpUKbAWe1Z0",
  authDomain: "picmyfitv2.firebaseapp.com",
  projectId: "picmyfitv2",
  storageBucket: "picmyfitv2.appspot.com",
  messagingSenderId: "192457121525",
  appId: "1:192457121525:web:fa269625d2818fce83efbc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to sign up a new user
const auth = getAuth();
onAuthStateChanged(auth,(user) => {
  if(user){
    const uid = user.uid;
  } else {

  }
})

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

// Function to sign in an existing user
 
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });


signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  
  



