import openai from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

class OpenAIVisionService {
  constructor() {
    openai.apiKey = process.env.OPENAI_API_KEY;
  }

  async analyzeImage(imageBuffer, prompt) {
    try {
      // Convert image buffer to base64
      const imageBase64 = imageBuffer.toString('base64');

      // Call the OpenAI Vision API
      const response = await openai.Image.create({
        model: 'vision-base-v1',
        images_base64: [imageBase64],
        n: 1,
        query: prompt,
      });

      // Handle the response as needed
      return response;
    } catch (error) {
      console.error('Error calling OpenAI Vision API:', error);
      throw error;
    }
  }
}

export default new OpenAIVisionService();
