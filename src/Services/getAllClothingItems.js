import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const getAllClothingItems = async () => {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (!user) throw new Error("No authenticated user found");

  try {
    const userWardrobeRef = collection(db, "users", user.uid, "wardrobe");
    const snapshot = await getDocs(userWardrobeRef);
    return snapshot.docs.map(doc => ({
      shortName: doc.data().shortName,
      imageUrl: doc.data().imageUrl
    }));
  } catch (error) {
    console.error("Error fetching clothing items:", error);
    throw error;
  }
};


export default getAllClothingItems;