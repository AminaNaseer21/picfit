import React, { useState} from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

    return (
        <div className="App">
            <input
                type="file"
                onChange={handleImageChange}
                multiple // Allow multiple file selection
            />
            <button onClick={uploadFiles}>Upload Images</button>
        </div>
    );
}
