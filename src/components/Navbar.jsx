import { FaRegMoon } from "react-icons/fa6";
import './Navbar.css'

function Navbar({handleThemeToggle, theme}) {
    return (
        <nav>
            <div className="container navbar">
            <h2>Where in the world?</h2>
            <div className="theme" onClick={handleThemeToggle}>
            <FaRegMoon />
            <p>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            </div>
        </nav>
    )
}

export default Navbar