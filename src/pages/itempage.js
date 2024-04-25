import React, { useState, useEffect } from 'react';
import './itempage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { firestore } from '../Services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import itemPlaceholder from '../img/items/1.png';


const categoriesWithSubcategories = {
  "T-shirts": ["Graphic", "Plain", "Polo", "Tank Tops"],
  "Shirts": ["Shirt Jackets", "Short-Sleeve Shirts", "Long-Sleeve Shirts", "Sweater Polos"],
  "Sweatshirts": ["Crew Neck Sweatshirts", "Graphic Sweatshirts"],
  "Denim": ["Straight", "Tapered", "Boyfriend", "Baggy", "Slim", "Bootcut", "Flared", "Jeggings", "Mom", "Wide Leg"],
  "Bottoms": ["Chinos", "Trousers", "Joggers", "Workwear", "Cargo", 'Slacks'],
  "Sweatpants": ["Jogger", "Classic"],
  "Shorts": ["Classic", "Active", "Mesh Shorts", "Denim Shorts", "Cargo"],
  "Hoodies": ["Zip-Up Hoodies", "Pullover Hoodies", "Graphic Hoodies"],
  "Sweaters": ["Pullover Sweaters", "Cardigan Sweaters"],
  "Outerwear": ["Pullover Sweaters", "Cardigan Sweaters", 'Blazers', 'Hoodies', 'Coats']
};

const ItemPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemName: '',
    itemCategory: Object.keys(categoriesWithSubcategories)[0],
    itemSubcategory: '',
    itemColor: 'Color',
    wearCount: 3,
    itemNotes: '',
    minTemp: '',
    maxTemp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!userId || !itemId) return;
    setLoading(true);
    const docRef = doc(firestore, 'users', userId, 'wardrobe', itemId);
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        setItem({
          itemName: docSnap.data().shortName,
          itemCategory: docSnap.data().category,
          itemSubcategory: docSnap.data().subCategory,
          itemColor: docSnap.data().color,
          itemNotes: docSnap.data().ItemNotes,
          imageUrl: docSnap.data().imageUrl,
          maxTemp: docSnap.data().tempRangeHigh,
          minTemp: docSnap.data().tempRangeLow,
          wearCount: docSnap.data().wearCount,
        });
      } else {
        setError('Item not found');
      }
    }).catch(error => {
      setError('Failed to fetch item');
    }).finally(() => {
      setLoading(false);
    });
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
    if (!userId || !itemId) return;
    const docRef = doc(firestore, 'users', userId, 'wardrobe', itemId);
    try {
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
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;


  return (
    <div className="item-page">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">← Back</button>
        <input type="text" name="itemName" value={item.itemName} onChange={handleInputChange} className="item-name" />
        <button onClick={handleSaveChanges} className="save-button">Save</button>
      </div>
      <div className="content">
        <div className="photo-section">
          <img src={item.imageUrl || itemPlaceholder} alt="Item" className="item-photo"/>
        </div>
        <div className="details-section">
          <div className="form-field">
            <label htmlFor="itemCategory">Category</label>
            <select name="itemCategory" value={item.itemCategory} onChange={handleInputChange} className="item-category">
              {Object.keys(categoriesWithSubcategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="itemSubcategory">Subcategory</label>
            <select name="itemSubcategory" value={item.itemSubcategory} onChange={handleInputChange} className="item-subcategory">
              {categoriesWithSubcategories[item.itemCategory]?.map(subcategory => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="itemColor">Color</label>
            <select name="itemColor" value={item.itemColor} onChange={handleInputChange} className="item-color">
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
          </div>
          <div className="form-field">
            <label htmlFor="wearCount">Wear Count</label>
            <div className="wear-counter">
              <button onClick={decrementWearCount}>-</button>
              <span>{item.wearCount}</span>
              <button onClick={incrementWearCount}>+</button>
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="itemNotes">Notes</label>
            <textarea name="itemNotes" value={item.itemNotes} onChange={handleInputChange} className="item-notes" placeholder="Add notes here..."></textarea>
          </div>
          <div className="weather-range">
            <label htmlFor="minTemp">Min Temp:</label>
            <input type="number" id="minTemp" name="minTemp" value={item.minTemp} onChange={handleInputChange} />
            <label htmlFor="maxTemp">Max Temp:</label>
            <input type="number" id="maxTemp" name="maxTemp" value={item.maxTemp} onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;