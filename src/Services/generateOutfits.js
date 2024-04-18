// generateOutfits.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const parseOutfits = (outfitsText, clothingItems) => {
  // Assuming each outfit is separated by a line that says something like "Outfit 1:"
  const outfits = outfitsText.split(/Outfit \d+:/).slice(1); // Remove the first split part before the first "Outfit"
  return outfits.map(outfitText => {
    const itemNames = outfitText.trim().split("\n").filter(line => line.trim() !== ''); // Get array of item names
    return itemNames.map(name => {
      // Find the clothing item object by its shortName
      const item = clothingItems.find(item => item.shortName.trim() === name.trim());
      // Return an object with the shortName and imageUrl
      return {
        shortName: name.trim(),
        imageUrl: item ? item.imageUrl : undefined // Or a placeholder URL for missing images
      };
    });
  });
};

const generateOutfits = async (clothingItems) => {
  // Constructing the list of items as strings, you might need to filter or sort them first
  const clothingItemsStrings = clothingItems.map(item => `${item.shortName}`).join(', ');

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": `I have these items: ${clothingItemsStrings}. Can you suggest three outfits using only the item names and nothing else? Please list them as: Outfit 1: item, item, item. Outfit 2: item, item, item. Outfit 3: item, item, item.`
        }
      ],
      max_tokens: 300,
    });

    // Assuming the API returns the desired text response directly
    const outfitsText = response.choices[0].message.content.trim();
    const structuredOutfitsWithImages = parseOutfits(outfitsText, clothingItems);
    return structuredOutfitsWithImages;
  } catch (error) {
    console.error('Error generating outfits:', error);
    throw error; // Rethrow the error so you can catch it in the component and handle it accordingly
  }
};

export default generateOutfits;

