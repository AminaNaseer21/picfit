import React, { useState, useRef } from 'react';
import logo512 from '../img/logo512.png';
import PointingPH from '../img/PointingPH.png'; // Importing PointingPH.png
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        const alpha = data[i + 3];
                        // Check if the pixel is white (you can adjust this condition based on your needs)
                        if (r > 200 && g > 200 && b > 200 && alpha > 0) {
                            data[i + 3] = 0; // Set alpha to 0 to make it transparent
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);
                    const url = canvas.toDataURL();
                    setImage(url);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="upload-container">
            <div className="image-holder">
                <div className="image-display-box">
                    {image && <img src={image} alt="Uploaded" />}
                    {!image && <img src={logo512} alt="Add Item Logo" />}
                </div>
                <div className="add-item-box">
                    <label htmlFor="input-file">
                        <span>Add Clothing Item Picture</span>
                    </label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg, image/heic"
                        id="input-file"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className="begin-making">
                <img src={PointingPH} alt="Pointing" style={{ width: '600px', height: '600px' }} /> {/* Adjusted width and height */}
            </div>
            <div className="description">
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Begin Making Today's Outfit</p>
                <p style={{ fontSize: '18px', fontWeight: 'normal' }}>because everyone deserves to feel good in what they wear</p>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}
import React, { useState, useRef, useEffect } from 'react';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [erasing, setErasing] = useState(false);
  const [undoHistory, setUndoHistory] = useState([]);
  const [eraserSize, setEraserSize] = useState(10); // Default eraser size

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const canvasSize = 400; // Increased size of the canvas box
        let drawWidth = canvasSize;
        let drawHeight = canvasSize / aspectRatio;

        if (drawHeight > canvasSize) {
          drawHeight = canvasSize;
          drawWidth = canvasSize * aspectRatio;
        }

        canvas.width = drawWidth;
        canvas.height = drawHeight;
        ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
      };
      img.src = URL.createObjectURL(image);
    }
  }, [image]);

  const handleMouseDown = () => {
    setErasing(true);
    setUndoHistory([...undoHistory, canvasRef.current.toDataURL()]);
  };

  const handleMouseUp = () => {
    setErasing(false);
  };

  const handleMouseMove = (e) => {
    if (erasing) {
      erasePixel(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const erasePixel = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.save(); // Save current context state
    ctx.beginPath();
    ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2);
    ctx.clip(); // Clip the area to be erased
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the clipped area
    ctx.restore(); // Restore context state to undo clipping
  };

  const handleUndo = () => {
    if (undoHistory.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const lastDataURL = undoHistory.pop();
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = lastDataURL;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUndoHistory([]); // Reset undo history when a new image is selected
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'edited_image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <div style={{ width: '400px', height: '400px', border: '1px solid black', position: 'relative', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', cursor: erasing ? 'crosshair' : 'default' }}
        />
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleDownload}>Download Image</button>
          <div>
            <label htmlFor="eraserSize">Eraser Size:</label>
            <input
              type="range"
              id="eraserSize"
              min="1"
              max="50"
              value={eraserSize}
              onChange={(e) => setEraserSize(parseInt(e.target.value))}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageEditor;
