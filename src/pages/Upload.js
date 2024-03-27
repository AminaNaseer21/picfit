// ImageProcessor.js
import React, { useRef, useEffect, useState } from 'react';

function applyThreshold(imageData, threshold) {
    const { data } = imageData;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const value = avg > threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = value;
    }
    return imageData;
}

function removeBackground(imageData, threshold) {
    // Implement your background removal algorithm here
    // For simplicity, we'll just use a fixed threshold value for now
    const { data } = imageData;
    const thresholdSquared = threshold * threshold;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const distanceSquared = r * r + g * g + b * b;
        if (distanceSquared < thresholdSquared) {
            data[i] = data[i + 1] = data[i + 2] = 0; // Set as black (foreground)
        }
    }
    return imageData;
}

function ImageProcessor() {
    const [imageSrc, setImageSrc] = useState(null);
    const [threshold, setThreshold] = useState(100); // Adjust threshold range based on image data

    const canvasRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (!imageSrc) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Apply threshold
            imageData = applyThreshold(imageData, threshold);

            // Remove background
            imageData = removeBackground(imageData, threshold);

            ctx.putImageData(imageData, 0, 0);
        };
        img.src = imageSrc;
    }, [imageSrc, threshold]);

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            <br />
            Threshold: <input type="range" min="0" max="255" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
            <canvas ref={canvasRef} />
        </div>
    );
}

export default ImageProcessor;
