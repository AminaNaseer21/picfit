// OutfitService.js
import { OpenAI } from 'openai';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getAllClothingItems = async () => {
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

export const generateOutfits = async (clothingItems, temperature) => {
  const clothingItemsStrings = clothingItems.map(item => `${item.shortName}`).join(', ');
  const temperatureStatement = `The current temperature is ${temperature}°F. `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { "role": "system", "content": "You are an AI fashion consultant. You are aware of current fashion trends, color coordination, and other information to create great outfits." },
        {
          "role": "user",
          "content": `${temperatureStatement}I have these clothing items: ${clothingItemsStrings}. Please suggest three stylish outfits that are suitable for this weather and that showcase good color coordination and contemporary fashion sense. Consider creating versatile looks that could be worn for various daily activities, focusing on the harmonious blending of colors and modern styling. Outfits should consist of a 1 top, 1 botton, and if wanted 1 layering item. Please list each outfit on a new line with items separated by commas and no item numbering. For example:\nOutfit: Blue Polo Shirt, Light Blue Denim Jeans\nOutfit: Black Denim Jacket, Biker Denim Jeans`
        }
      ],
      max_tokens: 300,
    });

    const outfitsText = response.choices[0].message.content.trim();
    const outfitsLines = outfitsText.split(/Outfit:/).filter(line => line.trim() !== '');
    const outfits = outfitsLines.map(outfitLine =>
      outfitLine.split(',')
        .map(item => item.trim())
        .filter(item => item)
    );

    return outfits;
  } catch (error) {
    console.error('Error generating outfits:', error);
    throw error;
  }
};
