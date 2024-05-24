import React from "react";
import { Link } from "react-router-dom";
import './Administrator.css'
import { UsersList } from "./UserList";



 
export const Administrator = () => {
 
    

  return (
  <main>
      <h1 className="tytul">Administrator</h1>
 <div>
   <Link to="/formularz"><button className="PrzyciskDodaj">Dodaj pracownika</button></Link>
  
    </div>  
   
    <UsersList />

    </main>
  )
};






 


 