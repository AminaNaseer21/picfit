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
    const { data } = imageData;
    const thresholdSquared = threshold * threshold;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const distanceSquared = r * r + g * g + b * b;
        if (distanceSquared < thresholdSquared) {
            // For black pixels, set alpha to a value greater than 0 to make them visible
            data[i + 3] = 255; // Set alpha channel to maximum (255) for black pixels
        } else {
            // For non-black pixels, set alpha to 0 to make them transparent
            data[i + 3] = 0; // Set alpha channel to 0 for non-black pixels
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

            // Create a temporary canvas to blend the original image and black pixels
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(img, 0, 0);
            const tempImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

            // Remove background and overlay with black pixels
            imageData = removeBackground(imageData, threshold);

            // Blend the original image with the black pixels based on the alpha value
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = imageData.data[i] * (imageData.data[i + 3] / 255) + tempImageData.data[i] * (1 - imageData.data[i + 3] / 255);
                imageData.data[i + 1] = imageData.data[i + 1] * (imageData.data[i + 3] / 255) + tempImageData.data[i + 1] * (1 - imageData.data[i + 3] / 255);
                imageData.data[i + 2] = imageData.data[i + 2] * (imageData.data[i + 3] / 255) + tempImageData.data[i + 2] * (1 - imageData.data[i + 3] / 255);
                imageData.data[i + 3] = 255;
            }

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
