import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBvwxniL5TX1B9WPpBi-uwLKpUKbAWe1Z0",
    authDomain: "picmyfitv2.firebaseapp.com",
    projectId: "picmyfitv2",
    storageBucket: "picmyfitv2.appspot.com",
    messagingSenderId: "192457121525",
    appId: "1:192457121525:web:fa269625d2818fce83efbc"
};
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const firebaseApp = initializeApp(firebaseConfig);