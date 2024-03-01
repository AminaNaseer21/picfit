import React, { useState } from 'react';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file

export default function Wardrobe() {
    // State to track the active category for dropdown
    const [activeCategory, setActiveCategory] = useState('');

    // Categories and subcategories data structure
    const categories = {
        Tops: ['T-shirts', 'Dress Shirts', 'Sweaters', 'Hoodies'],
        Bottoms: ['Jeans', 'Shorts', 'Skirts', 'Trousers'],
        Layering: ['Cardigans', 'Vests', 'Light Jackets'],
        Shoes: ['Sneakers', 'Boots', 'Sandals'],
        Coats: ['Winter Coats', 'Raincoats', 'Trench Coats']
    };

    // Replace with real items
    const items = new Array(20).fill('Clothing Item');

    // Function to handle dropdown toggle
    const toggleDropdown = (category) => {
        setActiveCategory(activeCategory === category ? '' : category);
    };

    return (
        <div>
            
            <div className="header">
                    <div className="title">MY WARDROBE</div>
                    <div className="controls">
                        <button className="button">Upload</button>
                        <button className="button">Capture</button>
                    </div>
                    <div className="right-side">
                        <button className="button heart">❤</button>
                        <div className="weather">Weather Info</div>
                    </div>
            </div>

            <div className="wardrobe-container">
                <div className="categories">
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