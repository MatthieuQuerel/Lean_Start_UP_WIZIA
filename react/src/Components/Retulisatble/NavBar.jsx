import "./Style/NavBar.css"
import { NavLink } from "react-router-dom";

const NavBar = () => {
    
    return (
        <nav className="navbar">
            <NavLink to="/" className="nav-link" activeClassName="active-link">
            <div className="navbar-logo">
                <h1> WIZIA</h1>
            </div>
            </NavLink>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" className="nav-link" activeClassName="active-link">
                    Welcolm
                    </NavLink>   
                </li>
                <li>
                    <NavLink to="/about" className="nav-link" activeClassName="active-link">
                    about
                    </NavLink>   
                </li>
                <li>
                    <NavLink to="/Service" className="nav-link" activeClassName="active-link">
                    services
                    </NavLink>   
                </li>
                <li>
                    <NavLink to="/contact" className="nav-link" activeClassName="active-link">
                    contact
                    </NavLink>   
                </li>
            </ul>
        </nav>

    )
  };
  
  export default NavBar;