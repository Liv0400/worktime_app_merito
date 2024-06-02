import React from "react";
import { logout } from "../services/auth";
import "./pages/Administrator.css";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";


export const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Wywołanie funkcji logout z modułu auth
      navigate("/zaloguj");
    } catch (error) {
      console.error("Error during logout:", error);
      
    }
  }

  return (
    <>
      <nav>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/grafik">Grafik</NavLink>
          </li>
          <li>
            <NavLink to="/dyspozycja">Dyspozycja</NavLink>
          </li>
          <li>
            <NavLink to="/wnioski">Wnioski</NavLink>
          </li>
          <li>
            <NavLink to="/pracownicy">Pracownicy</NavLink>
          </li>
          {/* <li>
            <NavLink to="/profil">Profil</NavLink>
          </li> */}
          <li>
            <NavLink to="/administrator">Administrator</NavLink>
          </li>
          <li>  <div><button className = "wyloguj" onClick={handleLogout}>Wyloguj</button></div></li>
        </ul>
      </nav>

    </>
  );
};
