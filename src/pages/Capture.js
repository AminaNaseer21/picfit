import React, { useState, useRef, useEffect } from 'react';
//import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
//import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
//import removeBackground from '../Services/BackgroundRemovalService';
import analyzeImage from '../Services/OpenAIVisionService';
//import { parseAnalyzedData } from '../Services/parseAnalyzedDataService';
import './Upload.css'; // Reuse the same CSS for consistency

export default function Capture() {
    const [/*image*/, setImage] = useState(null);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const { currentUser } = useAuth();
    //const firestore = getFirestore();
    //const navigate = useNavigate();

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                })
                .catch((error) => {
                    console.error("Error accessing the camera.", error);
                    setError("Cannot access the camera.");
                });
        }
    }, []);

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.toBlob(blob => {
                const imageFile = new File([blob], `capture-${uuidv4()}.png`, { type: 'image/png' });
                setImage(imageFile);
                uploadFiles(imageFile); // Upload the file directly after capturing
            }, 'image/png');
        }
    };

    const uploadFiles = async (fileToUpload) => {
        if (!currentUser || !fileToUpload) return;
    
        try {
            const fileRef = ref(storage, `images/${currentUser.uid}/${fileToUpload.name}`);
            await uploadBytes(fileRef, fileToUpload);
            const url = await getDownloadURL(fileRef);

            const prompt = 'Please analyze the uploaded image...'; // Define your actual prompt here
            const analyzedData = await analyzeImage(url, prompt);
            // Parse and save the analyzed data as required
            console.log('Image uploaded and analyzed:', analyzedData);
        } catch (error) {
            console.error('Error uploading or analyzing file:', error);
        }
    };

    return (
        <div className="upload-container">
            <h1 className="page-title">Capture Image</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="video-container">
                <video ref={videoRef} width="640" height="480" autoPlay></video>
                <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </div>
            <button className="action-button" onClick={captureImage}>Capture Photo</button>
        </div>
    );
}
