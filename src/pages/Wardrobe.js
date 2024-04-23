import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../Services/firebase';
import { useAuth } from '../Services/authentication';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Services/firebase';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file
import camera from "../img/camera.png";
import WeatherApp from './WeatherApp';
import icontrashcan from '../img/icon-trashcan.png';
import iconheart from '../img/heart.png';
import HeartButtonImage from '../img/heart.png';

export default function Wardrobe() {
    const [activeCategory, setActiveCategory] = useState('');
    const [activeSubcategory, setActiveSubcategory] = useState('');
    const [activeSubSubcategory, setActiveSubSubcategory] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) return;
        
        const wardrobeCollectionRef = collection(firestore, `users/${currentUser.uid}/wardrobe`);
        
        getDocs(wardrobeCollectionRef)
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const item = {
                        imageUrl: data.imageUrl,
                        subCategory: data.subCategory
                    };
                    items.push(item);
                });
                setImageUrls(items);
            })
            .catch((error) => {
                console.error('Error fetching wardrobe items:', error);
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

    const handleTrashClick = () => {
        
        // Logic to handle trashcan click for item at given index
      };
      
      const handleHeartClick = () => {
        // Logic to handle heart click for item at given index
      };


    const toggleCategory = (category) => setActiveCategory(activeCategory === category ? '' : category);

    const toggleSubcategory = (subcategory) => setActiveSubcategory(activeSubcategory === subcategory ? '' : subcategory);

    const toggleSubSubcategory = (subsubcategory) => setActiveSubSubcategory(activeSubSubcategory === subsubcategory ? '' : subsubcategory);

    const filteredImageUrls = imageUrls.filter(item => {
        const subCategory = item.subCategory;
        if (activeCategory && !activeCategory in categories) return false; // Check if active category exists
        if (activeSubcategory && !subCategory.includes(activeSubcategory)) return false;
        if (activeSubSubcategory && !subCategory.includes(activeSubSubcategory)) return false;
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
                        <img src={HeartButtonImage} alt="Heart" />
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
                    {filteredImageUrls.map((item, index) => (
                        <div key={index} className="item-image-container">
                        <img src={item.imageUrl} alt={`Uploaded ${index}`} className="item-image"/>
                        <button className="trash-button" onClick={handleTrashClick}>
                            <img src={icontrashcan} alt="Delete item" />
                        </button>
                        <button className="heart-button" onClick={handleHeartClick}>
                            <img src={iconheart} alt="Favorite item" />
                        </button>
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
