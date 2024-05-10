import { useState } from "react"

export const ListaWnioskowPracownika = (props)=>{
  let stateArray = useState(props.accepted);
  let isAccepted = stateArray[0];

  

  const zaakceptowane = <p className="zaakceptowane">
    {isAccepted ? "✔️" : "❌"}
  </p>
 
  return(
      <li>
    <span className="type">{props.type}</span>
    <span className="date">{props.beginingDate} - {props.endDate}</span>
    <span className="comment">{props.comment}</span> 
    {zaakceptowane}
  </li>
  )
}