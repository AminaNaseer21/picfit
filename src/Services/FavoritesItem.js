import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const db = getFirestore(firebaseApp);

export const addFavoriteStyle = async (style) => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user) throw new Error("User is not authenticated");

  try {
    const userFavoritesRef = collection(db, "users", user.uid, "favoriteStyle");
    const styleDoc = {
      items: style.map(item => ({
        shortName: item.shortName,
        imageUrl: item.imageUrl
      })),
      createdAt: new Date() // Timestamp to know when this was added
    };
    const docRef = await addDoc(userFavoritesRef, styleDoc);
    return docRef.id; // Returns the document reference id
  } catch (error) {
    console.error("Error adding favorite outfit:", error);
    throw error;
  }
};

export const getFavoriteStyles = async () => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user) throw new Error("User is not authenticated");

  try {
    const userFavoritesRef = collection(db, "users", user.uid, "favoriteStyle");
    const q = query(userFavoritesRef, where("createdAt", "<=", new Date()));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching favorite style:", error);
    throw error;
  }
};

export const removeFavoriteStyle = async (favoriteStyleId) => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const firestore = getFirestore(firebaseApp);

  if (!user) throw new Error("User is not authenticated");

  try {
    const favoriteDocRef = doc(firestore, "users", user.uid, "favoriteStyle", favoriteStyleId);
    await deleteDoc(favoriteDocRef);
  } catch (error) {
    console.error("Error removing favorite style:", error);
    throw error;
  }
};