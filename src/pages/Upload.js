const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static('public'));

app.post('/remove-background', (req, res) => {
    const imageData = req.body.imageData;
    
    // Save the image data to a temporary file
    const imageBuffer = Buffer.from(imageData, 'base64');
    const tempImagePath = 'temp_image.jpg';
    fs.writeFileSync(tempImagePath, imageBuffer);
    
    // Execute Python script for background removal
    const pythonScript = `
        import cv2
        import numpy as np

        # Read image
        img = cv2.imread('temp_image.jpg')

        # Perform background removal here using OpenCV
        # Example: Implement GrabCut algorithm
        mask = np.zeros(img.shape[:2], np.uint8)
        bgd_model = np.zeros((1, 65), np.float64)
        fgd_model = np.zeros((1, 65), np.float64)
        rect = (50, 50, img.shape[1] - 50, img.shape[0] - 50)
        cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)
        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        img = img * mask2[:, :, np.newaxis]

        # Convert processed image to base64
        retval, buffer = cv2.imencode('.jpg', img)
        img_str = buffer.tobytes()
        img_base64 = base64.b64encode(img_str).decode('utf-8')
        print(img_base64)
    `;

    exec(`python -c "${pythonScript}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        // Send the processed image data back to the client
        res.send({ image: stdout });

        // Delete the temporary image file
        fs.unlinkSync(tempImagePath);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
