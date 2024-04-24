import React, { useState, useEffect } from 'react';
import './itempage.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";

import item1 from '../img/items/1.png';
import { firestore } from '../Services/firebase'; // Ensure you have this import from your Firebase config
import { doc, getDoc, updateDoc } from 'firebase/firestore';


const categoriesWithSubcategories = {
  "T-shirts": ["Graphic", "Plain", "Polo", "Tank Tops"],
  "Shirts": ["Shirt Jackets", "Short-Sleeve Shirts", "Long-Sleeve Shirts", "Sweater Polos"],
  "Sweatshirts": ["Crew Neck Sweatshirts", "Graphic Sweatshirts"],
  "Denim": ["Straight", "Tapered", "Boyfriend", "Baggy", "Slim", "Bootcut", "Flared", "Jeggings", "Mom", "Wide Leg"],
  "Pants": ["Chinos", "Trousers", "Joggers", "Workwear", "Cargo"],
  "Sweatpants": ["Jogger", "Classic"],
  "Shorts": ["Classic", "Active", "Mesh Shorts", "Denim Shorts", "Cargo"],
  "Hoodies": ["Zip-Up Hoodies", "Pullover Hoodies", "Graphic Hoodies"],
  "Sweaters": ["Pullover Sweaters", "Cardigan Sweaters"],
  "Outerwear": ["Pullover Sweaters", "Cardigan Sweaters", 'Blazers', 'Hoodies', 'Coats']
};

const ItemPage = () => {
  const { itemId } = useParams(); // Retrieve the item ID from URL
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemName: '',
    itemCategory: Object.keys(categoriesWithSubcategories)[0],
    itemSubcategory: '',
    itemColor: 'Color',
    wearCount: 3,
    itemNotes: '',
    minTemp: '', // Initialize min temperature
  maxTemp: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
   

    const fetchItem = async () => {
      if (!userId || !itemId) return;

    setLoading(true); // Start loading indicator
    setError('');

    
      const docRef = doc(firestore, 'users', userId, 'wardrobe', itemId);
      try {
        const docSnap = await getDoc(docRef); // Attempt to fetch the document
        if (docSnap.exists()) {
          // Assuming your document's structure matches your component's state structure
          setItem({
            itemName: docSnap.data().shortName || '',
            itemCategory: docSnap.data().category || '',
            itemSubcategory: docSnap.data().subCategory || '',
            itemColor: docSnap.data().color || '',
            itemNotes: docSnap.data().ItemNotes || '',
            imageUrl: docSnap.data().imageUrl || '',
            maxTemp: docSnap.data().tempRangeHigh || '',
            minTemp: docSnap.data().tempRangeLow || '',
            wearCount: docSnap.data().wearCount || '',

          });
        } else {
          setError('Item not found.');
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        setError('Failed to fetch item.'); // Set error state on fetch error
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch attempt
      }
    };
    fetchItem();
    
  }, [userId, itemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const incrementWearCount = () => {
    setItem(prev => ({ ...prev, wearCount: prev.wearCount + 1 }));
  };

  const decrementWearCount = () => {
    setItem(prev => ({ ...prev, wearCount: Math.max(0, prev.wearCount - 1) }));
  };

  const handleSaveChanges = async () => {
    if (!userId || !itemId) {
      console.error("UserId or ItemId is undefined", { userId, itemId });
      return;
    }
    const docRef = doc(firestore, 'users', userId, 'wardrobe', itemId);
    try {
      console.log("Updating with item data", item);
      await updateDoc(docRef, {
        shortName: item.itemName,
        category: item.itemCategory,
        subCategory: item.itemSubcategory,
        color: item.itemColor,
        favorite: item.wearCount,
        ItemNotes: item.itemNotes,
        imageUrl: item.imageUrl,
        tempRangeHigh: item.maxTemp,
        tempRangeLow: item.minTemp,
        wearCount: item.wearCount
        });      
        console.log('Item updated successfully!');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
<div className="item-page">
    {loading ? (
      <div className="loading">Loading...</div>
    ) : error ? (
      <div className="error">{error}</div>
    ) : (
      <>
        <div className="header">
    <button onClick={() => navigate(-1)} className="back-button">← Back</button>
    <input
      type="text"
      name="itemName"
      value={item.itemName}
      onChange={handleInputChange}
      className="item-name"
    />
    <button onClick={handleSaveChanges} className="confirm-icon">✓</button>
  </div>
  <div className="content">

  <div className="photo-section">
            <img src={item.imageUrl || item1} alt="Item" className="item-photo"/>
          </div>


        <div className="details-section">
        <label htmlFor="itemCategory">Category</label>
            <select
              name="itemCategory"
              value={item.itemCategory}
              onChange={handleInputChange}
              className="item-category"
            >
              {Object.keys(categoriesWithSubcategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <label htmlFor="itemSubcategory">Subcategory</label>
            <select name="itemSubcategory" value={item.itemSubcategory} onChange={handleInputChange} className="item-subcategory">
  {
    (categoriesWithSubcategories[item.itemCategory] || []).map(subcategory => (
      <option key={subcategory} value={subcategory}>{subcategory}</option>
    ))
  }
</select>
          
            <label htmlFor="itemColor">Color</label>
            <select
              name="itemColor"
              value={item.itemColor}
              onChange={handleInputChange}
              className="item-color"
            >
            <option value="Blue">Blue</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Red">Red</option>
            <option value="Indigo">Indigo</option>
            <option value="Violet">Violet</option>
            <option value="Purple">Purple</option>
            <option value="Magenta">Magenta</option>
            <option value="Pink">Pink</option>
            <option value="Brown">Brown</option>
            <option value="Black">Black</option>
            <option value="Gray">Gray</option>
            <option value="Silver">Silver</option>
            <option value="White">White</option>
            <option value="Cyan">Cyan</option>
            <option value="Teal">Teal</option>
          </select>

          <div className="wear-counter">
            <label htmlFor="wearCount">Wear Count </label>
            <button onClick={decrementWearCount}>-</button>
            <span>{item.wearCount}</span>
            <button onClick={incrementWearCount}>+</button>
          </div>
          <textarea
            name="itemNotes"
            value={item.itemNotes}
            onChange={handleInputChange}
            className="item-notes"
            placeholder="Add notens here..."
            ></textarea>
            <div className="confirm-icon">✓</div>
          </div>
          <div className="weather-range">
          <label htmlFor="minTemp">Min Temp:</label>
<input
  type="number"
  id="minTemp"
  name="minTemp"
  value={item.minTemp}
  onChange={handleInputChange}
  
/>

<label htmlFor="maxTemp">Max Temp:</label>
<input
  type="number"
  id="maxTemp"
  name="maxTemp"
  value={item.maxTemp}
  onChange={handleInputChange}
  
/>

</div>
        </div>
      </>
    )}
  </div>
);
};

export default ItemPage;
