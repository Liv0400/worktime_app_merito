import {useState, useEffect} from "react";
import { db } from "../../services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {ListaWnioskow} from './ListaWnioskow';
import "../style/Wnioski.css"

export const Wnioski = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchApplications();
  }, []);

  if(loading){
    return <div>Pobieranie wniosków...</div>;
  }
      

  return (
    <div className= "pokazWnioski">
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
