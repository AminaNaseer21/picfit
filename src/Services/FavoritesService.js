import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const db = getFirestore(firebaseApp);

export const addFavoriteOutfit = async (outfit) => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user) throw new Error("User is not authenticated");

  try {
    const userFavoritesRef = collection(db, "users", user.uid, "favorites");
    const outfitDoc = {
      items: outfit.map(item => ({
        shortName: item.shortName,
        imageUrl: item.imageUrl
      })),
      createdAt: new Date() // Timestamp to know when this was added
    };
    const docRef = await addDoc(userFavoritesRef, outfitDoc);
    return docRef.id; // Returns the document reference id
  } catch (error) {
    console.error("Error adding favorite outfit:", error);
    throw error;
  }
};

export const getFavoriteOutfits = async () => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user) throw new Error("User is not authenticated");

  try {
    const userFavoritesRef = collection(db, "users", user.uid, "favorites");
    const q = query(userFavoritesRef, where("createdAt", "<=", new Date()));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching favorite outfits:", error);
    throw error;
  }
};
