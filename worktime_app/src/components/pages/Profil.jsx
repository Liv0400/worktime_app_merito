import { useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import '../style/Profil.css';

export const Profil = ()=>{

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

    
useEffect(()=>{
  const fetchUserData = async () => {
    if(user){
      try{
      console.log("Fetching data for user:", user.uid)
      const userDoc = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDoc);
      if(docSnap.exists()){
        console.log("User data:", docSnap.data());
        setUserData(docSnap.data());
      }else{
        console.log("No such document!")
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }finally {
      setLoading(false);
    }
  }else {
     console.log("No user is logged in");
    setLoading(false);
  }
};
  fetchUserData();
},[user]);

 if (loading) {
    return <div>Ładowanie...</div>; // Wyświetlenie komunikatu ładowania
  }

  if (!userData) {
    return <div>Brak danych użytkownika</div>;
  }


  return(
<div>
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

