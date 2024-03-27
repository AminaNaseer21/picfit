import React, { useState, useRef, useEffect } from 'react';
import logo512 from '../img/logo512.png';
import PointingPH from '../img/PointingPH.png'; // Importing PointingPH.png
import './Upload.css';

export default function Upload() {
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);
    const [erasing, setErasing] = useState(true); // Start with erasing mode

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
                    setImage(canvas.toDataURL());
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (image) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = image;
        }
    }, [image]);

    const handleMouseDown = (e) => {
        if (canvasRef.current && e.target === canvasRef.current) {
            setErasing((prevState) => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const x = e.nativeEvent.offsetX;
                const y = e.nativeEvent.offsetY;
                if (prevState) {
                    ctx.clearRect(x, y, 10, 10); // Adjust the clear area size as needed
                } else {
                    const img = new Image();
                    img.onload = () => {
                        ctx.drawImage(img, x, y);
                    };
                    img.src = logo512;
                }
                return prevState;
            });
        }
    };

    const handleToggleMode = () => {
        setErasing((prevState) => !prevState);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'edited_image.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="upload-container">
            <div className="image-holder">
                <div className="image-display-box">
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        style={{ maxWidth: '100%', maxHeight: '100%', border: '1px solid black' }}
                    />
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
                <button onClick={handleToggleMode}>
                    {erasing ? 'Add Pixel' : 'Erase Pixel'}
                </button>
                <button onClick={handleDownload}>Download Image</button>
            </div>
            <div className="begin-making">
                <img src={PointingPH} alt="Pointing" style={{ width: '600px', height: '600px' }} /> {/* Adjusted width and height */}
            </div>
            <div className="description">
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Begin Making Today's Outfit</p>
                <p style={{ fontSize: '18px', fontWeight: 'normal' }}>because everyone deserves to feel good in what they wear</p>
            </div>
        </div>
    );
}
