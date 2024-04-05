// BackgroundRemovalService.js

const API_ENDPOINT = 'https://clipdrop-api.co/remove-background/v1';
const BkgRmvr_API_KEY = 'f368c06e45ec67d424ea1fa9d4a0423733f8ffd7c3c5ed38aa49b991176f23012f613fe96a1c16e519a15418aa71fee5';

const removeBackground = async (imageFile) => {
    const formData = new FormData();
    formData.append('image_file', imageFile);

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'x-api-key': BkgRmvr_API_KEY,
            },
        });

        if (!response.ok) throw new Error('Failed to remove background');
        return await response.blob();
    } catch (error) {
        console.error('Error removing background:', error);
        throw error;
    }
};

export default removeBackground;
