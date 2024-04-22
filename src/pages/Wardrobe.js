import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { useNavigate } from 'react-router-dom';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file
import camera from "../img/camera.png";
import WeatherApp from './WeatherApp';

export default function Wardrobe() {
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubcategory, setActiveSubcategory] = useState('');
    const [activeSubSubcategory, setActiveSubSubcategory] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const { currentUser } = useAuth();

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

    const categories = {
        TOPS: {
            "T-shirts": ["Graphic", "Plain", "Polo", "Tank Tops"],
            "Shirts": ["Shirt Jackets", "Short-Sleeve Shirts", "Long-Sleeve Shirts", "Sweater Polos"],
            "Sweatshirts": ["Crew Neck Sweatshirts", "Graphic Sweatshirts"]
        },
        BOTTOMS: {
            Denim: ["Straight", "Tapered", "Boyfriend", "Baggy", "Slim", "Bootcut", "Flared", "Jeggings", "Mom", "Wide Leg"],
            Pants: ["Chinos", "Trousers", "Joggers", "Workwear", "Cargo"],
            Sweatpants: ["Jogger", "Classic"],
            Shorts: ["Classic", "Active", "Mesh Shorts", "Denim Shorts", "Cargo"]
        },
        OUTERWEAR: {
            "Hoodies": ["Zip-Up Hoodies", "Pullover Hoodies", "Graphic Hoodies"],
            "Sweaters": ["Pullover Sweaters", "Cardigan Sweaters"]
        }
    };

    const navigate = useNavigate();

    const handleUploadClick = () => {
        navigate('/upload');
    };

    const handleCaptureClick = () => {
        navigate('/capture');
    };

    const handleItemClick = (itemId) => {
        navigate('/itempage', { state: { itemId } });
    };

    const toggleCategory = (category) => setActiveCategory(activeCategory === category ? '' : category);

    const toggleSubcategory = (subcategory) => setActiveSubcategory(activeSubcategory === subcategory ? '' : subcategory);

    const toggleSubSubcategory = (subsubcategory) => setActiveSubSubcategory(activeSubSubcategory === subsubcategory ? '' : subsubcategory);

    // Filter image URLs based on active subcategory and sub-subcategory
    const filteredImageUrls = imageUrls.filter(url => {
        if (activeCategory && !url.includes(activeCategory)) return false;
        if (activeSubcategory && !url.includes(activeSubcategory)) return false;
        if (activeSubSubcategory && !url.includes(activeSubSubcategory)) return false;
        return true;
    });

    return (
        <div>
            <div className="headerx">
                <div className="title">W A R D R O B E</div>
                <div className="controls">
                    <button className="uc-button learn-more" onClick={handleUploadClick}>
                        <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Upload</span>
                    </button>
                    <button className="uc-button learn-more" onClick={handleCaptureClick}>
                        <span className="circle" aria-hidden="true">
                            <img src={camera} alt="Capture" className="icon camera" />
                        </span>
                        <span className="button-text">Capture</span>
                    </button>
                </div>
                <div className="right-side">
                    <button className="heart-button">
                        <svg className="empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path></svg>
                        <svg className="filled" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24V24H0z" fill="none"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path></svg>
                    </button>
                </div>
            </div>
            <div className="wardrobe-container">
                <div className="categories">
                    {Object.entries(categories).map(([categoryName, subcategories]) => (
                        <div key={categoryName}>
                            <div className="category-title">{categoryName}</div>
                            {Object.entries(subcategories).map(([subcategory, subsubcategories]) => (
                                <div key={subcategory} className="subcategory">
                                    <button className="dropdown-button" onClick={() => toggleSubcategory(subcategory)}>
                                        {subcategory}
                                        <span className={`arrow ${activeSubcategory === subcategory ? 'active' : ''}`}>↓</span>
                                    </button>
                                    {activeSubcategory === subcategory && (
                                        <ul className="subcategory-list">
                                            {subsubcategories.map((subsubcategory) => (
                                                <li key={subsubcategory} className="subcategory-item">
                                                    <button onClick={() => toggleSubSubcategory(subsubcategory)}>
                                                        {subsubcategory}
                                                        <span className={`arrow ${activeSubSubcategory === subsubcategory ? 'active' : ''}`}>↓</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="items">
                    {filteredImageUrls.map((url, index) => (
                        <div key={index} className="item-image-container" onClick={() => handleItemClick(index)}>
                            <img src={url} alt={`Uploaded ${index}`} className="item-image"/>
                        </div>
                    ))}
                    <div className="item add-new-item" onClick={handleUploadClick}>
                        <span className="plus-button">+</span>
                    </div>
                </div>
            </div>
            <div className="weather-card">
                <WeatherApp />
            </div>
        </div>
    );
}
