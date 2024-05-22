import {useState, useEffect} from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import {ListaWnioskow} from './ListaWnioskow';
import "../style/Wnioski.css"

export const Wnioski = () => {

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchApplications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'applications'));
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

        // <li key={application.id}>
        //   <div className="wniosek">
        //     {application.name}
        //     {application.status == 'oczekujący' ? <span className="newApply">!</span> : null}
        //     </div>
        //     <div className="wniosekAkceptuj">
        //   <strong>Typ:</strong> {application.type} <br />
        //   <strong>Początek:</strong> {application.beginningDate} {application.beginningHour} <br />
        //   <strong>Koniec:</strong> {application.endingDate} {application.endingHour} <br />
        //   <strong>Status:</strong> {application.status} <br />
        //   <strong>Utworzono:</strong> {application.createdAt.toDate().toLocaleString()}
        //   </div>
        // </li>
      

  return (
    <div className= "pracownicy wnioski">
      <h1>Lista wniosków:</h1>
      <ul>
      {applications.map(application =>(
    <ListaWnioskow
    key = {application.id}
    name = {application.name}
    status = {application.status}
    type = {application.type}
    beginningDate = {application.beginningDate}
    beginningHour = {application.beginningHour}
    endingDate = {application.endingDate}
    endingHour = {application.endingHour}
    createdAt = {application.createdAt}
    />
      ))}
      </ul>
    </div>
  );
};
