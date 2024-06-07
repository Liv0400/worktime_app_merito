import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useState, useEffect} from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, orderBy, query, doc, getDoc } from "firebase/firestore";
import {ListaWnioskow} from './ListaWnioskow';
import { useNavigate } from "react-router-dom";
import "../style/Wnioski.css"

export const Wnioski = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({name:"", surname:""});

  const navigate = useNavigate();


  useEffect(()=>{
    const fetchApplications = async () => {
      try {
        const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const applicationsList = querySnapshot.docs.map(doc =>({
          id:doc.id,
          ...doc.data()
        }));
        setApplications(applicationsList);
        setLoading(false);
      }catch (error) {
        console.error('Błąd podczas pobierania wniosków:', error);
        setLoading(false);
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
      } else {
        console.error("No user is logged in.");
      }
    });

    fetchApplications();
    return () => unsubscribe();
  }, []);

  if(loading){
    return <div>Pobieranie wniosków...</div>;
  }

  const handleNewRequest = () => {
  navigate('/wnioskiPracownik/nowyWniosek', {state: {name: userInfo.name, surname:userInfo.surname}})
}
      

  return (
    <div className= "pokazWnioski">
      <button className="dodajWniosek" onClick={handleNewRequest}>Nowy wniosek</button>
      <h1>Lista wniosków:</h1>
      <ul>
      {applications.map(application =>(
    <ListaWnioskow
    key = {application.id}
    id = {application.id}
    name = {application.name}
    status = {application.status}
    type = {application.type}
    beginningDate = {application.beginningDate}
    beginningHour = {application.beginningHour}
    endingDate = {application.endingDate}
    endingHour = {application.endingHour}
    comment = {application.comment}
    createdAt = {application.createdAt}
    />
      ))}
      </ul>
    </div>
  );
};
