import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState, useEffect } from 'react';
import {getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from './UserContext';
import './Navbar.css';
import logo from './img/PicMyFit_Logo.png';
import profilePlaceholder from './img/profilePlaceholder.png';

export default function Navbar() {
    
    const { profilePicURL } = useUser();

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
        <>
        <nav className="nav">
            
            <div className="nav-left">
                <ul>
                    <CustomLink to="/">HOME</CustomLink>
                    <CustomLink to="about">ABOUT PICMYFIT</CustomLink>
                </ul>
            </div>  

            <div className="nav-center">
                <Link to="/" className="PicMyFit">
                    <img src={logo} alt="PicMyFit Logo" className="logo"/>
                </Link>
            </div>  

            
    
            <div className="nav-right">

                <ul>
                    <CustomLink className="right-textbox" to="wardrobe">YOUR WARDROBE</CustomLink>
                    <CustomLink className="right-textbox" to="outfitter">THE OUTFITTER</CustomLink>
                </ul>

                {/* Toggle dropdown on click */}
                <img src={profilePicURL || profilePlaceholder} alt="Profile" className="profilePlaceholder" onClick={toggleDropdown}/>
                {/* Dropdown menu */}
                {isDropdownVisible && (
                <div className={`dropdown ${isDropdownVisible ? 'dropdown-visible' : 'dropdown-hidden'}`}>
                    {user ? (
                        // Dropdown for authenticated users
                        <>
                            <CustomLink to="profile">Profile</CustomLink>
                            <CustomLink to="/" onClick={() => getAuth().signOut()}>Log Out</CustomLink>
                        </>
                    ) : (
                        // Dropdown for unauthenticated users
                        <>
                            <CustomLink to="login">Log In</CustomLink>
                            <CustomLink to="signup">Sign Up</CustomLink>
                        </>
                    )}
                </div>
            )}
            </div>
                        
        </nav>
        <div className="navbar-subtitle">REVOLUTIONIZING YOUR STYLE: TAILORED FASHION INSIGHTS FROM YOUR WARDROBE</div>
        </>
        )
    }
    
    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    
        // Render as 'div' or 'span' instead of 'li' if it affects the dropdown style
        return (
            <div className={isActive ? "active" : ""}>
                <Link to={to} {...props}>{children}</Link>
            </div>
        );
    }