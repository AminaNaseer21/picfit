export default function Navbar() {
    return <nav className="nav">
        <a href="/" className="PicMyFit">PicMyFit</a>
        <ul>
            <CustomLink href="wardrobe">Wardrobe</CustomLink>
            <CustomLink href="profile">Profile</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname

    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props }>{children}</a>
        </li>
    )
}