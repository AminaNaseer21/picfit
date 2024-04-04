import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { v4 as uuidv4 } from 'uuid';
import OpenAIVisionService from '../Services/OpenAIVisionService';

export default function Upload() {
    const [imageUploads, setImageUploads] = useState([]);
    const { currentUser } = useAuth();
    const firestore = getFirestore(); // Initialize Firestore here

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageUploads(files);
    };

    const prompt = `Please analyze the uploaded image of a clothing item and provide the following information in the specified format:
                    1. **Short Name**: Provide a concise name for the clothing item based on its most distinguishing features (e.g., "Blue Striped Polo").
                    2. **Category**: Determine the main category of the clothing item. Choose from:
                        - Tops
                        - Bottoms
                        - Outerwear
                    3. **Specific Item Type**: Based on the selected category, identify the specific type of the clothing item. Refer to the list below for options:
                        - **Tops**:
                            - T-Shirts: Graphic, Plain, Tank Tops, Polo
                            - Shirts: Shirt Jackets, Short-Sleeve Shirts, Long-Sleeve Shirts, Sweater Polos
                            - Sweatshirts: Crew Neck Sweatshirts, Graphic Sweatshirts
                        - **Bottoms**:
                            - Denim: Straight, Tapered, Boyfriend, Baggy, Slim, Bootcut, Flared, Jeggings, Mom, Wide Leg
                            - Pants: Chinos, Trousers, Joggers, Workwear, Cargo
                            - Sweatpants: Jogger Sweatpants, Classic Sweatpants
                            - Shorts: Classic/Active, Mesh Shorts, Denim Shorts, Cargo
                        - **Outerwear**:
                            - Hoodies: Zip-Up Hoodies, Pullover Hoodies, Graphic Hoodies
                            - Sweaters: Pullover Sweaters, Cardigan Sweaters
                    4. **Color**: Identify the primary color of the clothing item. If there are multiple prominent colors, list up to three.
                    5. **Weather Range**: Suggest a temperature range with two numbers (in degrees Celsius or Fahrenheit, based on your preference) that the item is most suitable for. Consider factors like material thickness, coverage, and intended use (e.g., "40°F - 68°F").
                    Ensure that the analysis is concise and directly relevant to the visible features of the clothing item in the uploaded image. Avoid speculation or assumptions not supported by visible evidence. The output should be printing with one answer in each line with only the answer like the example below that has the name in the first line, category in second, subcategory in third, the color in forth, the low end temp in fifth, and the high end temp in sixth. Ensure that the output contains no other words or information other than the exact output:
                    OUTPUT:
                    Blue Striped Polo
                    Top
                    Polo
                    Blue
                    40
                    60`;

    const uploadFiles = () => {
        if (!currentUser || imageUploads.length === 0) return;

        const promises = imageUploads.map((file) => {
            const imageRef = ref(storage, `images/${currentUser.uid}/${file.name + uuidv4()}`);
            return uploadBytes(imageRef, file).then(snapshot => {
                return getDownloadURL(snapshot.ref).then(url => {
                    return fetch(url)
                        .then(res => res.blob())
                        .then(blob => {
                            return OpenAIVisionService.analyzeImage(blob, prompt)
                                .then(async response => {
                                    console.log('Vision API response:', response);

                                    const [shortName, category, specificItemType, color, lowTemp, highTemp] = response.data.choices[0].text.trim().split('\n');

                                    const docRef = doc(firestore, `users/${currentUser.uid}/wardrobe/${file.name + uuidv4()}`);
                                    await setDoc(docRef, {
                                        imageUrl: url,
                                        shortName,
                                        category,
                                        specificItemType,
                                        color,
                                        temperatureRange: `${lowTemp} - ${highTemp}`,
                                    });

                                    return docRef;
                                })
                                .catch(err => {
                                    console.error('Vision API error:', err);
                                    throw err; // Rethrow to be caught by the outer catch
                                });
                        });
                });
            }).catch(error => {
                console.error('Error during file upload and Firestore operation:', error);
                throw error; // Rethrow to be caught by the outer promise chain
            });
        });

        Promise.all(promises)
            .then(docRefs => {
                console.log('Documents created:', docRefs);
                // Here you could update state to reflect the successful uploads or navigate the user to another page
            })
            .catch(error => {
                console.error('Error uploading files and saving data:', error);
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