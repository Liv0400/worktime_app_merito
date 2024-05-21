import React from "react";
import { Link } from "react-router-dom";
import './Administrator.css'




  
const pracownicy = [
  {
  id:0,
  name:'Jan',
  lastName:'Jeden',
  birthDate:'12.12.2012',
  contract: 'umowa o pracę',
  timeEmployment: 'cały etat'
},
  {
  id:1,
  name:'Edyta',
  lastName:'Druga',
  birthDate:'30.03.2003',
  contract:'umowa o pracę',
  timeEmployment:'3/4 etatu'
},
  {
  id:2,
  name:'Janina',
  lastName:'Trzecia',
  birthDate:'15.05.1995',
  contract:'umowa zlecenie',
  timeEmployment:'-'
},  {
  id:3,
  name:'Ewa',
  lastName:'Czwarta',
  birthDate:'5.05.2005',
  contract:'umowa o pracę',
  timeEmployment:'1/4 etatu'
},  {
  id:4,
  name:'Piotr',
  lastName:'Piąty',
  birthDate:'7.08.1999',
  contract:"umowa o pracę",
  timeEmployment:'cały etat'
}
];
const newApply = <span className="newApply">!</span> 
export const Administrator = () => {
  const listaPracowników = pracownicy.map(pracownik =>
  <li key={pracownik.id} >
    <span className="minPhoto"></span>

    {pracownik.name} {pracownik.lastName}
   
    {newApply}
    </li>)
    

  return (
  <main>
      <h1 className="tytul">Administrator</h1>
 <div>
   <Link to="/formularz"><button className="PrzyciskDodaj">Dodaj pracownika</button></Link>
   <Link to="/edycja"><button className="PrzyciskDodaj">Edytuj</button></Link>
    </div>  
    <div className= "pracownicy wnioski">
    <ul>
      {listaPracowników}
      </ul>
    </div>
    

    </main>
  )
};




 


 