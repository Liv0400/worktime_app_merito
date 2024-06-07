import { useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import '../style/Profil.css';

export const Profil = ()=>{

  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  // const user = auth.currentUser;

    
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      setUser(user);
      } else{
      setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

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
    <p>Imię/imiona:</p>
    <span>{userData.fullname.firstname}</span>
    <p>Nazwisko:</p>
    <span >{userData.fullname.lastname}</span>
    <p>Data urodzenia:</p>
    <span>{userData.fullname.birthdate}</span>
    <p>Rodzaj umowy:</p>
    <span>{userData.fullname.typedeal}</span>
    <p>Uprawnienia:</p>
    <span>{userData.fullname.rightapp}</span>
  </div>
</div>
  )
}

