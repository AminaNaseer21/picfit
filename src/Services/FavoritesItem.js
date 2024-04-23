import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const db = getFirestore(firebaseApp);

export const addFavoriteStyle = async (item) => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user) throw new Error("User is not authenticated");

  try {
    const userFavoritesRef = collection(db, "users", user.uid, "favoriteStyle");
    
    // Ensure item is an array
    if (!Array.isArray(item)) {
      throw new Error("Item must be an array");
    }

    // Map each item in the array to create style documents
    const styleDocs = item.map((item) => ({
      imageUrl: item.imageUrl,
      subCategory: item.subCategory,
      createdAt: new Date() // Timestamp to know when this was added
    }));

    // Add each style document to Firestore
    const promises = styleDocs.map((styleDoc) => addDoc(userFavoritesRef, styleDoc));
    const docRefs = await Promise.all(promises);
    
    return docRefs.map((docRef) => docRef.id); // Returns an array of document reference ids
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