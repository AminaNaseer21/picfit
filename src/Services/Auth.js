// Import Firebase and its auth module
import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjUy0PIj4UM9fv4Pr38OTCtWFLfkuen6Y",
  authDomain: "picmyfit.firebaseapp.com",
  // other config values
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to sign up a new user
function signUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // Additional user info or redirection can be handled here
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Handle errors here
      console.error("Error signing up:", errorCode, errorMessage);
    });
}

// Function to sign in an existing user
function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // Redirect the user or update UI
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Handle errors here
      console.error("Error signing in:", errorCode, errorMessage);
    });
}

function signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("User signed out.");
      // Redirect to login page or update UI
    }).catch((error) => {
      // An error happened.
      console.error("Error signing out:", error);
    });
  }
  
  function resetPassword(email) {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(() => {
      // Email sent.
      console.log("Password reset email sent.");
      // Inform the user and update UI accordingly
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error sending password reset email:", errorCode, errorMessage);
    });
  }
  



