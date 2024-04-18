// getWardrobeService.js

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig"; // Assuming firebaseConfig is in a separate file or adjust the import based on your setup

const db = getFirestore(firebaseApp);

const getAllClothingItems = async () => {
  const clothingCollection = collection(db, "clothing"); // Adjust "clothing" to your specific collection name
  const snapshot = await getDocs(clothingCollection);
  const clothingList = snapshot.docs.map(doc => doc.data());
  return clothingList;
};

export default getAllClothingItems;
