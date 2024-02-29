import React from 'react';
import './Wardrobe.css'; // Make sure to create a corresponding CSS file

export default function Wardrobe() {
    // Assuming you will fetch or define your categories and items
    const categories = ['Tops', 'Bottoms', 'Layering', 'Shoes', 'Coats'];
    const items = new Array(20).fill('Clothing Item'); // Replace with real items

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
                    {categories.map((category, index) => (
                        <div key={index} className="category">
                            {category}
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
