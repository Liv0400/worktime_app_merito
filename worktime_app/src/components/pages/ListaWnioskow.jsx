import { useState} from "react";
import '../style/PokazWnioski.css'

export const ListaWnioskow = (props) => {


  let stateArray = useState(false);
  let isExpanded = stateArray[0];
  let setIsExpanded = stateArray[1]

  const rozwin = <button 
  className='rozwin'
  onClick={()=>{
    setIsExpanded(!isExpanded);
  }}>
    {isExpanded ? "▲":"▼"}
  </button>

  const anuluj = <button
  className='tbCancel'
  onClick={()=>{
    setIsExpanded(!isExpanded)
  }}>
    Anuluj
  </button>


  return(
  <div className='lista'>
    <li>
    <span className="name">{props.name}</span>
    <span className='createdAt'>{'Przesłano: ' + props.createdAt.toDate().toLocaleDateString()}</span>
    {props.status == 'oczekujący' ? <span className="newApply">!</span> : null}
    {rozwin}
  </li>
   <div  className='zaakceptuj'>
      
     {isExpanded && 
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
          <td><p>{props.beginningDate}</p></td>
          <td><p>{props.endingDate}</p></td>
          <td><textarea name="com" cols="24" rows="5"></textarea></td>
          <td><button className='btn'>✔️</button><button className='btn'>❌</button></td>
        </tr>
       <tr>
        <td></td>
        <td></td>
        <td></td>
        <td className='lastTd'>
          {anuluj}
        </td>
      </tr>
        </tbody>
      </table>}
    </div>
  </div>
)}