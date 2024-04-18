import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const getAllClothingItems = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  try {
    const userWardrobeRef = collection(db, "users", user.uid, "wardrobe");
    const snapshot = await getDocs(userWardrobeRef);
    const clothingList = snapshot.docs.map(doc => doc.data());
    return clothingList;
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    throw error;
  }
};

export default getAllClothingItems;