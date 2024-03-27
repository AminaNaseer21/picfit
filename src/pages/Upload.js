import React, { useState, useRef, useEffect } from 'react';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const canvasSize = 200; // Size of the canvas box
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

  const handleMouseDown = (e) => {
    setErasing(true);
    erasePixel(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
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
    ctx.clearRect(x - 5, y - 5, 10, 10); // Adjust the clear area size as needed
  };

  const handleAddPixels = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const canvasSize = 200; // Size of the canvas box
      let drawWidth = canvasSize;
      let drawHeight = canvasSize / aspectRatio;

      if (drawHeight > canvasSize) {
        drawHeight = canvasSize;
        drawWidth = canvasSize * aspectRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };
    img.src = URL.createObjectURL(image);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
      <div style={{ width: '200px', height: '200px', border: '1px solid black', position: 'relative', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ position: 'absolute', top: '0', left: '0', transform: 'translate(-50%, -50%)', cursor: 'crosshair' }}
        />
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <>
          <button onClick={handleAddPixels}>Add Pixels</button>
          <button onClick={handleDownload}>Download Image</button>
        </>
      )}
    </div>
  );
};

export default ImageEditor;
