import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useState, useEffect } from "react";
import {collection, query, orderBy, where, getDocs, doc, getDoc} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import '../style/WnioskiPracownik.css'
// import { ListaWnioskowPracownika } from "./ListaWnioskowPracownika";


export const WnioskiPracownik = () => {

  const [requests, setRequests] = useState([]);
  const [userInfo, setUserInfo] = useState({name:"", surname:""});
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchRequests = async (user) => {
      try {

        const q = query(
          collection(db, "applications"), 
          where("userId", "==", user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
      const requestsList = querySnapshot.docs.map(doc => ({id:doc.id, ...doc.data()}));
      setRequests(requestsList);
      } catch (error) {
          console.error("Error fetching documents: ", error);
      }
    };

   const fetchUserInfo = async (user) => {
      try {
        if (user.displayName) {
          const [name, surname] = user.displayName.split(" ");
          setUserInfo({ name, surname });
        } else {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserInfo({ name: userData.name, surname: userData.surname });
          } else {
            console.error("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user);
        fetchRequests(user);
      } else {
        console.error("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'zaakceptowany':
        return 'Zaakceptowany';
        case 'odrzucony':
          return 'Odrzucony';
          default:
            return 'Oczekujący';
    }
  }


const WyswietlWnioski = requests.map(wniosek => (
  <li key={wniosek.id} className="wniosek-grid">
    <span className="name">{wniosek.type}</span>
    <span className="beginningDate">{`Początek: ${wniosek.beginningDate}`}<br/>{wniosek.beginningHour}</span>
    <span className="endingDate">{` Koniec: ${wniosek.endingDate}`}<br/>{wniosek.endingHour}</span>
    <span className="comment">{wniosek.comment}</span>
    <span className="status">{getStatusLabel(wniosek.status)}</span>
  </li>
));

const handleNewRequest = () => {
  navigate('/wnioski/nowyWniosek', {state: {name: userInfo.name, surname:userInfo.surname}})
}

  return(
  <div className="pokazWnioski wnioskiPracownika">
    <h1>{userInfo.name} {userInfo.surname}</h1>
    <button className="dodajWniosek" onClick={handleNewRequest}>Nowy wniosek</button>
    <ul>
      <div className="tytul-wniosek-grid">
    <span className="name">Typ wniosku</span>
    <span className="beginningDate">Początek</span>
    <span className="endingDate">Koniec</span>
    <span className="comment">Komentarz</span>
    <span className="status">Status</span>
    </div>
      {WyswietlWnioski}
    </ul>
  </div>
  )
}