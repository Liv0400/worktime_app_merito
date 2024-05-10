import '../style/PokazWnioski.css'
import { ListaWnioskow } from './ListaWnioskow';

const wnioski = [
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


// function odrzucWniosek(){
//   return(
//     alert('odrzucono'),
//     document.getElementById('hidden').style.display = "none"
//   )
// }
// function anuluj(){
//   return(
//     document.getElementById('hidden').style.display = "none"
//   )
// }
// function akceptujWniosek(){
//   return(
//     alert('zaakceptowano'),
//     document.getElementById('hidden').style.display = "none",
//     document.getElementsByClassName('comment').value
//   )
// }



  const WyswietlWnioski = wnioski.map((wniosek)=>(
    <ListaWnioskow 
    key={wniosek.id}
    type={wniosek.type}
    beginingDate={wniosek.beginingDate}
    endDate={wniosek.endDate}
    comment={wniosek.comment}
    />
  ));

export const PokazWnioski = () => {

  return(
  <div className="pokazWnioski">
    <h1>Pracownik Nazwisko</h1>
    <ul>
      {WyswietlWnioski}
    </ul>
  </div>
  )
}