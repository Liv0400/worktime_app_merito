import React from "react";
import { logout } from "../services/auth";
import "./pages/Administrator.css";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

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
          <li>
            <NavLink to="/administrator">Administrator</NavLink>
          </li>
          <li>  <div><button className = "PrzyciskDodaj" onClick={logout}>Wyloguj</button></div></li>
        </ul>
      </nav>

    </>
  );
};
