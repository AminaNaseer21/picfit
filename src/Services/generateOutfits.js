// generateOutfits.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const generateOutfits = async (clothingItems) => {
  const clothingItemsStrings = clothingItems.map(item => `${item.shortName}`).join(', ');

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        {
          "role": "user",
          "content": `I have these items: ${clothingItemsStrings}. Can you suggest three outfits? Please list each outfit on a new line with items separated by commas and no item numbering. For example:\nOutfit: Blue Polo Shirt, Light Blue Denim Jeans\nOutfit: Black Denim Jacket, Biker Denim Jeans`
        }
      ],
      max_tokens: 300,
    });

    const outfitsText = response.choices[0].message.content.trim();
    // Split the response by the word "Outfit:" to separate outfits
    const outfitsLines = outfitsText.split(/Outfit:/).filter(line => line.trim() !== '');
    
    // Map over the lines and split each by commas to get individual items
    const outfits = outfitsLines.map(outfitLine =>
      outfitLine.split(',')
        .map(item => item.trim())
        .filter(item => item) // Filter out any empty strings just in case
    );

    return outfits; // Now 'outfits' is an array of arrays, each representing an outfit
  } catch (error) {
    console.error('Error generating outfits:', error);
    throw error;
  }
};

export default generateOutfits;
