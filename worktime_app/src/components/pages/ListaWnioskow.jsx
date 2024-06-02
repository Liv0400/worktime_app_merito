import { useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../services/firebase";
import '../style/PokazWnioski.css'

export const ListaWnioskow = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(props.status);
  const [comment, setComment] = useState(props.comment || "");
  // let stateArray = useState(false);
  // let isExpanded = stateArray[0];
  // let setIsExpanded = stateArray[1];
  // const [status, setStatus] = useState(props.status);
  // const [comment, setComment] = useState(props.comment || "");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // const rozwin = 
  // <button 
  // className='rozwin'
  // onClick={()=>{
  //   setIsExpanded(!isExpanded);
  // }}>
  //   {isExpanded ? "▲":"▼"}
  // </button>

  // const anuluj = <button
  // className='tbCancel'
  // onClick={()=>{
  //   setIsExpanded(!isExpanded)
  // }}>
  //   Anuluj
  // </button>

  const updateStatus = async (newStatus) => {
    try {
      const docRef = doc(db, "applications", props.id);
      await updateDoc(docRef, {
        status: newStatus,
        comment: comment
      });
        setStatus(newStatus);
        setIsExpanded(false)
      }catch (error){
        console.error("Error updating document:", error)
      }
    }


  const zaakceptuj = async () => {
    updateStatus('zaakceptowany')
  }
  const odrzuc = async () => {
    updateStatus('odrzucony')
  };



  const applyStatus = () => {
    if(status === 'oczekujący'){
      return <span className="newApply">⌛</span>
    } else if (status === 'zaakceptowany'){
      return <span className="newApply">✔️</span>
    }else if (status==="odrzucony"){
      return <span className="newApply">❌</span>
    }else{
      return null
    }
  }


  return(
  <div className='lista'>
    <li>
    <span className="name">{props.name}</span>
    <span className='createdAt'>{'Przesłano: ' + props.createdAt.toDate().toLocaleDateString()}</span>
    {applyStatus()}
    {/* {rozwin} */}
    <button className="rozwin" onClick={toggleExpand}>
          {isExpanded ? "▲" : "▼"}
    </button>
  </li>
  {isExpanded && (
 <div  className='zaakceptuj'> 
     <table>
        <tbody>
        <tr>
          <th>Typ wniosku</th>
          <th>Początek</th>
          <th>Koniec</th>
          <th>Dodaj komentarz</th>
        </tr>
        <tr>
          <td><p>{props.type}</p></td>
          <td><p>{props.beginningDate} {props.beginningHour}</p></td>
          <td><p>{props.endingDate} {props.endingHour}</p></td>
          <td>
            <textarea 
            name="com" 
            cols="24" 
            rows="5" 
            onChange={(e)=>setComment(e.target.value)}>
              </textarea>
              </td>
        </tr>
       <tr>
        <td colSpan="2"></td>
        <td colSpan="2" className='lastTd'>
          <button className='btn' onClick={zaakceptuj}>Zaakceptuj</button>
          <button className='btn' onClick={odrzuc}>Odrzuć</button>
          <button className='tbCancel' onClick={toggleExpand}>
            Anuluj
          </button></td>
      </tr>
        </tbody>
      </table>
    </div>
  )}
  </div>
)}