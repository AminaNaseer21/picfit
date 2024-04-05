import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const analyzeImage = async (imageUrl, prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          "role": "user",
          "content": [
            { "type": "text", "text": prompt },
            {
              "type": "image_url",
              "image_url": {
                "url": imageUrl,
                "detail": "high"
              },
            },
          ],
        }
      ],
      max_tokens: 300,
    });

    // Assuming the API returns the desired text response directly
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error; // Rethrow the error so you can catch it in the component and handle it accordingly
  }
};

export default analyzeImage;
