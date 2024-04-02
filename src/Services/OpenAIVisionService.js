// OpenAIVisionService.js

import axios from 'axios'; // Ensure axios is installed

class OpenAIVisionService {
  async analyzeImage(imageBlob, prompt) {
    try {
      // Convert image blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];

        // Call the OpenAI Vision API
        const response = await axios.post('https://api.openai.com/v1/images', {
          model: 'vision-base-v1',
          images_base64: [base64data],
          query: prompt,
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          }
        });

        // Handle the response as needed
        return response.data;
      };
    } catch (error) {
      console.error('Error calling OpenAI Vision API:', error);
      throw error;
    }
  }
}

export default new OpenAIVisionService();
