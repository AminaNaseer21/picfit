import { Link, useMatch, useResolvedPath } from "react-router-dom"
import {getAuth} from "firebase/auth";
import './Navbar.css';
import logo from './img/PicMyFit_Logo.png';
import profilePlaceholder from './img/profilePlaceholder.png';

export default function Navbar() {
    return (
    <nav className="nav">
    
        <Link to="/" className="PicMyFit">
            <img src={logo} alt="PicMyFit Logo" className="logo"/>
        </Link>

        <ul>
            <CustomLink to="wardrobe">Wardrobe</CustomLink>
            <CustomLink to="outfitter">Outfitter</CustomLink>
            <CustomLink to="profile">Profile</CustomLink>
            <CustomLink to="signup">Signup</CustomLink>
            <CustomLink to="login">Login</CustomLink>
        </ul>

        <div className="nav-right">
            <img src={profilePlaceholder} alt="Profile" className="profilePlaceholder"/>
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