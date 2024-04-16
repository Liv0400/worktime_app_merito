import React from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      {/* <Link to="/" className="title">
        <h1>Worktime</h1>
      </Link> */}
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
        </ul>
      </nav>

    </>
  );
};
