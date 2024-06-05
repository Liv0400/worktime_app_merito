import React from "react";
import { logout } from "../services/auth";
import "./pages/Administrator.css";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../services/useUser";


export const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await logout(); // Wywołanie funkcji logout z modułu auth
      navigate("/");
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
            {user && user.rightapp === "Menadżer" ? (
              <NavLink to="/dyspozycja">Dyspozycja</NavLink>
            ) : user && user.rightapp === "Pracownik" ? (
              <NavLink to="/dyspozycjapracownik">Dyspozycja</NavLink>
            ) : user && user.rightapp === "Administrator" ? (
              <>
                <NavLink to="/dyspozycja">Dyspozycja Menadżer</NavLink>
                <NavLink to="/dyspozycjapracownik">Dyspozycja Pracownik</NavLink>
              </>
            ) : null}
          </li>
          <li>
            {user && user.rightapp === "Menadżer" ? (
              <NavLink to="/wnioski">Wnioski</NavLink>
            ) : user && user.rightapp === "Pracownik" ? (
              <NavLink to="/wnioskiPracownik">Wnioski</NavLink>
            ) : user && user.rightapp === "Administrator" ? (
              <>
                <NavLink to="/wnioski">Wnioski Menadżer</NavLink>
                <NavLink to="/wnioskiPracownik">Wnioski Pracownik</NavLink>

              </>
            ) : null}
          </li>
          <li>
            {user && user.rightapp === "Menadżer" ? (
              <NavLink to="/pracownicy">Pracownicy</NavLink>
            ) : user && user.rightapp === "Pracownik" ? (
              <NavLink to="/profil">Profil</NavLink>
            ) : user && user.rightapp === "Administrator" ? (
              <>
                <NavLink to="/pracownicy">Pracownicy</NavLink>
                <NavLink to="/profil">Profil</NavLink>
              </>
            ) : null}
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
