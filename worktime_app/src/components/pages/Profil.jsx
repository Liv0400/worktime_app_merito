import './Profil.css';
import { Link } from "react-router-dom";
// import { Pracownicy } from './Pracownicy';

export const Profil = ()=>{
  return(
<div>
  <Link to="/pracownicy"><button className='profilButton'>Powrót</button></Link>
  <div className="profil">
    <div className="photo"></div>
    <p>Imię/imiona:</p>
    <span>Janina</span>
    <p>Nazwisko:</p>
    <span >Przykład</span>
    <p>Data urodzenia:</p>
    <span>30.12.1980</span>
    <p>Rodzaj umowy:</p>
    <span>o pracę</span>
    <p>Wymiar etatu:</p> 
    <span>cały etat</span> 
  </div>
</div>
  )
}

