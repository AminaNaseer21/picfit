import { Link, useMatch, useResolvedPath } from "react-router-dom"
export default function Navbar() {
    return (
    <nav className="nav">
        <Link to="/" className="PicMyFit">PicMyFit</Link>
        <ul>
            <CustomLink to="wardrobe">Wardrobe</CustomLink>
            <CustomLink to="profile">Profile</CustomLink>
            <CustomLink to="upload">Upload</CustomLink>
        </ul>
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