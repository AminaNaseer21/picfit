// deleteItem.js
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

const firestore = getFirestore();
const storage = getStorage();

export const deleteItem = async (userId, itemId, imageName) => {
  try {
    // Delete the document from Firestore
    const docRef = doc(firestore, `users/${userId}/wardrobe/${itemId}`);
    await deleteDoc(docRef);

    // Delete the image from Storage
    const imageRef = ref(storage, `images/${userId}/${imageName}`);
    await deleteObject(imageRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting item:", error);
    return { success: false, error: error };
  }
};
