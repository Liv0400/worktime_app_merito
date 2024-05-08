import { NavLink } from "react-router-dom";
import '../style/WnioskiPracownik.css'
import { ListaWnioskowPracownika } from "./ListaWnioskowPracownika";

const listaWnioskow = [
  {
    id: 0,
    type: 'Urlop wypoczynkowy',
    beginingDate: '22/05/24' ,
    endDate: '30/05/24',
    new: true, 
    accepted: false,
    comment: ''
  },
    {
    id: 1,
    type: 'Urlop na żadanie',
    beginingDate: '3/03/24',
    endDate: '3/03/24',
    new: false,
    accepted: true,
    comment:''
  }, {
    id: 2,
    type: 'Zwolnienie lekarskie',
    beginingDate:'27/02/24',
    endDate:'28/02/24',
    new: false,
    accepted: true,
    comment:''
  }, {
    id: 3,
    type: 'Urlop wypoczynkowy',
    beginingDate: '23/12/24',
    endDate:'27/12/24',
    new: false,
    accepted: false,
    comment: 'W okresie świątecznym nie udzielamy urlopów'
  },
];

   const WyswietlWnioski = listaWnioskow.map(wniosek=>
<ListaWnioskowPracownika 
key={wniosek.id}
type={wniosek.type}
beginingDate = {wniosek.beginingDate}
endDate={wniosek.endDate}
comment={wniosek.comment}
accepted={wniosek.accepted}
new={wniosek.new}
 />
  )

export const WnioskiPracownik = () => {

  return(
  <div className="pokazWnioski">
    <h1>Pracownik Nazwisko</h1>
    <NavLink to='/wnioski/nowyWniosek'><button className="dodajWniosek">Nowy wniosek</button></NavLink>
    <ul>
      {WyswietlWnioski}
    </ul>
  </div>
  )
}