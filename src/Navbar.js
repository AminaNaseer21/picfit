import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState, useEffect } from 'react';
import {getAuth, onAuthStateChanged } from "firebase/auth";
import './Navbar.css';
import logo from './img/PicMyFit_Logo.png';
import profilePlaceholder from './img/profilePlaceholder.png';

export default function Navbar() {
    
    // State to control the visibility of the dropdown
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
   
    const [user, setUser] = useState(null); // State to keep track of the user

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
        // Clean up the subscription on unmount
        return unsubscribe;
    }, []);


    // Function to toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownVisible(prevState => !prevState);
    


    return (
    <nav className="nav">

        
    
        <Link to="/" className="PicMyFit">
            <img src={logo} alt="PicMyFit Logo" className="logo"/>
        </Link>

        <ul>
            <CustomLink to="wardrobe">Wardrobe</CustomLink>
            <CustomLink to="outfitter">Outfitter</CustomLink>
        </ul>

        <div className="nav-right">
            {/* Toggle dropdown on click */}
            <img src={profilePlaceholder} alt="Profile" className="profilePlaceholder" onClick={toggleDropdown}/>
            {/* Dropdown menu */}
            {isDropdownVisible && (
                <div className="dropdown">
                    <CustomLink to="profile">Profile</CustomLink>
                    <CustomLink to="signup">Signup</CustomLink>
                    <CustomLink to="login">Login</CustomLink>
                </div>
            )}
        </div>

    </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})

    return (
        <li className={isActive? "active" : ""}>
            <Link to={to} {...props }>{children}</Link>
        </li>
    )
}