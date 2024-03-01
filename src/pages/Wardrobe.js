import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file
import heart from "../img/heart.png";
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

                        <button className="button-heart">
                        <img src={heart} alt="Heart" className="heart-img" />
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
                                d="M21.5195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
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