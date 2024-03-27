const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static('public'));

app.post('/remove-background', (req, res) => {
    const imageData = req.body.imageData;
    const pythonScript = `
        import base64
        import cv2
        import numpy as np
        import sys

        img_data = base64.b64decode('${imageData}')
        nparr = np.frombuffer(img_data, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Perform background removal here using OpenCV

        # Convert image back to base64
        retval, buffer = cv2.imencode('.jpg', img_np)
        img_str = base64.b64encode(buffer).decode('utf-8')
        print(img_str)
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
        res.send({ image: stdout });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
