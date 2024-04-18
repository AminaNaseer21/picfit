// getWardrobeService.js

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "./firebase";

const db = getFirestore(firebaseApp);

const getAllClothingItems = async () => {
  const clothingCollection = collection(db, "wardrobe");
  const snapshot = await getDocs(clothingCollection);
  const clothingList = snapshot.docs.map(doc => doc.data());
  return clothingList;
};

export default getAllClothingItems;
