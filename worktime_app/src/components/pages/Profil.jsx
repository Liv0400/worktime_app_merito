import '../style/Profil.css';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

export const Profil = ()=>{

  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  if (!user) {
    return <div>Brak danych użytkownika</div>;
  }
  return(
<div>
  <Link to="/pracownicy">
    <button className='profilButton'>Powrót</button>
    </Link>
  <div className="profil">
    <div className="photo"></div>
    <p>Imię/imiona:</p>
    <span>{user.fullname.firstname}</span>
    <p>Nazwisko:</p>
    <span >{user.fullname.lastname}</span>
    <p>Data urodzenia:</p>
    <span>{user.fullname.birthdate}</span>
    <p>Rodzaj umowy:</p>
    <span>{user.fullname.rightapp}</span>
    <p>Wymiar etatu:</p> 
    <span>cały etat</span> 
  </div>
</div>
  )
}

