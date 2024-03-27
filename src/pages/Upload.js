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
    ctx.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
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
