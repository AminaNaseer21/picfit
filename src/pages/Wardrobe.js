import React, { useState, useEffect } from 'react';
import { useAuth } from '../Services/authentication';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Services/firebase';
import { addFavoriteStyle, getFavoriteStyles, removeFavoriteStyle } from '../Services/FavoritesItem';
import { deleteItem } from '../Services/deleteItem';
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
    const [isFilteredByFavorites, setIsFilteredByFavorites] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [favorite, setFavorites] = useState([]);
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
                        id: doc.id, // Document ID
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

    const handleTrashClick = async (itemId, imageName) => {
        const confirmation = window.confirm("Are you sure you want to delete this item?");
        if (confirmation) {
          const { success } = await deleteItem(currentUser.uid, itemId, imageName);
          if (success) {
            // Update the state to remove the item from the UI
            setImageUrls(prevUrls => prevUrls.filter(item => item.id !== itemId));
          } else {
            // Handle the error, e.g., show an error message to the user
          }
        }
      };
      
      const handleHeartClick = async (item) => {
        try {
            await addFavoriteStyle([item]);
            const updatedFavorites = await getFavoriteStyles();
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };
    
    

    const handleFavoriteClick = async () => {
    console.log("Favorite button clicked");

    if (isFilteredByFavorites) {
        const wardrobeCollectionRef = collection(firestore, `users/${currentUser.uid}/wardrobe`);

        try {
            const querySnapshot = await getDocs(wardrobeCollectionRef);
            const items = querySnapshot.docs.map(doc => ({
                imageUrl: doc.data().imageUrl,
                subCategory: doc.data().subCategory
            }));
            setImageUrls(items);
            setIsFilteredByFavorites(false);
        } catch (error) {
            console.error('Error fetching wardrobe items:', error);
        }
    } else {
        try {
            const updatedFavorites = await getFavoriteStyles();
            setFavorites(updatedFavorites);

            const favoriteImageUrls = imageUrls.filter(item => {
                return updatedFavorites.some(favorite => favorite.imageUrl === item.imageUrl);
            });
            setImageUrls(favoriteImageUrls);
            setIsFilteredByFavorites(true);
        } catch (error) {
            console.error("Error fetching favorite styles:", error);
        }
    }
};

    

    const toggleCategory = (category) => setActiveCategory(activeCategory === category ? '' : category);

    const toggleSubcategory = (subcategory) => setActiveSubcategory(activeSubcategory === subcategory ? '' : subcategory);

    const toggleSubSubcategory = (subsubcategory) => setActiveSubSubcategory(activeSubSubcategory === subsubcategory ? '' : subsubcategory);

    const filteredImageUrls = imageUrls.filter(item => {
        const subCategory = item.subCategory;
        if (activeCategory && !(activeCategory in categories)) return false; // Check if active category exists
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
                    <div className="right-side">
                        <button className="favorite-button" onClick={handleFavoriteClick}>
                            <img src={HeartButtonImage} alt="Heart" />
                        </button>
                    </div>
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
                        <button className="trash-button" onClick={() => handleTrashClick(item.id, item.imageName)}>
                        <img src={icontrashcan} alt="Delete item" />
                        </button>
                        <button className='heart-button' onClick={() => handleHeartClick(item)}>
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
