import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 } from 'uuid';

export default function Upload() {
    const [imageUploads, setImageUploads] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const { currentUser } = useAuth();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageUploads(files);
    };

    const uploadFiles = () => {
        if (!currentUser || imageUploads.length === 0) return;

        const promises = imageUploads.map((file) => {
            const imageRef = ref(storage, `images/${currentUser.uid}/${file.name + v4()}`);
            return uploadBytes(imageRef, file).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            });
        });

        Promise.all(promises)
            .then((urls) => {
                setImageUrls(urls);
            })
            .catch((error) => {
                console.error('Error uploading files:', error);
            });
    };

    useEffect(() => {
        if (!currentUser) return;

        const imagesListRef = ref(storage, `images/${currentUser.uid}/`);
        listAll(imagesListRef)
            .then((response) => {
                return Promise.all(response.items.map((item) => getDownloadURL(item)));
            })
            .then((urls) => {
                setImageUrls(urls);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }, [currentUser]);

    return (
        <div className="App">
            <input
                type="file"
                onChange={handleImageChange}
                multiple // Allow multiple file selection
            />
            <button onClick={uploadFiles}>Upload Images</button>
            {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded Image ${index}`} />
            ))}
        </div>
    );
}
