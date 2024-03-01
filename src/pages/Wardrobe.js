import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file
import camera from "../img/camera.png";

export default function Wardrobe() {
    // State to track the active category for dropdown
    const [activeCategory, setActiveCategory] = useState('');

    // Categories and subcategories data structure
    const categories = {
        Tops: ['T-shirts', 'Dress Shirts', 'Sweaters', 'Hoodies', 'Blouses', 'Tank Tops', 'Polo Shirts', 'Crop Tops'],
        Bottoms: ['Jeans', 'Shorts', 'Skirts', 'Trousers', 'Leggings', 'Cargo Pants', 'Chinos', 'Capris'],
        Layering: ['Cardigans', 'Vests', 'Light Jackets', 'Blazers', 'Coats', 'Ponchos', 'Windbreakers']
    };

    // Replace with real items
    const items = new Array(20).fill('Clothing Item');

    // Function to handle dropdown toggle
    const toggleDropdown = (category) => {
        // Assuming `activeCategory` holds the currently active category name
        // This will toggle the active state of the category
        setActiveCategory(activeCategory === category ? '' : category);
    };

        let navigate = useNavigate();
      
        const handleUploadClick = () => {
          navigate('/upload'); // Use the path you've defined for the Upload component in your router setup
        };

    return (
        <div>
            
            <div className="header">
                    <div className="title">W A R D R O B E</div>
                    <div className="controls">


                        <button className="uc-button learn-more" onClick={handleUploadClick}>
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Upload</span>
                        </button>


                        <button className="uc-button learn-more">
                            <span className="circle" aria-hidden="true">
                                <img src={camera} alt="Capture" className="icon camera" />
                            </span>
                            <span className="button-text">Capture</span>
                            </button>
                    
                    
                    </div>
                    <div className="right-side">

                        <button className="heart-button">
                        <svg class="empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path></svg>
                        <svg class="filled" height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24V24H0z" fill="none"></path><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path></svg>
                        </button>

                        <div className="weather">Weather Info</div>
                        
                    
                    </div>

            </div>
            
            


            <div className="wardrobe-container">
                
                <div className="categories">

                    <div class="group">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                            <g>
                            <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                            ></path>
                            </g>
                        </svg>
                        <input class="input" type="search" placeholder="Something Specific?" />
                    </div>

                    {Object.keys(categories).map((category) => (
                        <div key={category} className="category">
                            <button className="dropdown-button" onClick={() => toggleDropdown(category)}>
                                {category}
                                <span className={`arrow ${activeCategory === category ? 'active' : ''}`}>↓</span>
                            </button>
                            {activeCategory === category && (
                                <ul className="subcategory-list">
                                    {categories[category].map((subcategory) => (
                                        <li key={subcategory} className="subcategory">
                                            {subcategory}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="items">
                    {items.map((item, index) => (
                        <div key={index} className="item">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>    
    );
}