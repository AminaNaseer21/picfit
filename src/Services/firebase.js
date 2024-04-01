import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvwxniL5TX1B9WPpBi-uwLKpUKbAWe1Z0",
    authDomain: "picmyfitv2.firebaseapp.com",
    projectId: "picmyfitv2",
    storageBucket: "picmyfitv2.appspot.com",
    messagingSenderId: "192457121525",
    appId: "1:192457121525:web:fa269625d2818fce83efbc"
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({   
    prompt : "select_account "
  });
export const auth = getAuth();
export const storage = getStorage(app);
export const firebaseApp = initializeApp(firebaseConfig);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);