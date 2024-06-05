import {useState, useEffect} from 'react';
import {db} from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getCurrentUser } from '../../services/auth';
import { useLocation } from 'react-router-dom';
import '../style/NowyWniosek.css';


export const NowyWniosek = () => {

  const [type, setType] = useState('');
   const [beginningDate, setBeginningDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [beginningHour, setBeginningHour] = useState('');
  const [endingHour, setEndingHour] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const {name, surname} = location.state || {name: '', surname:''};

  useEffect(()=>{
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);

//   const formatDate = (date) => {
//   const d = new Date(date);
//   const day = String(d.getDate()).padStart(2, '0');
//   const month = String(d.getMonth() + 1).padStart(2, '0'); // Miesiące są indeksowane od 0
//   const year = d.getFullYear();
//   return `${day}/${month}/${year}`;
// };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Wysłano pomyślnie');
      console.log('Current user:', currentUser);
    

      if (new Date(endingDate) < new Date(beginningDate)) {
      setMessage('Data końca nie może być wcześniejsza niż data początku.');
      return;
    }

    try{
        if (!currentUser) {
        setMessage('Brak zalogowanego użytkownika.');
        return;
      }

        const currentUserData = currentUser;
        const displayName = currentUserData.displayName || `${name} ${surname}`;

        // Dodawanie nowego wniosku do Firestore
        await addDoc(collection(db, 'applications'),{
          userId:currentUserData?.uid || 'ID pracownika',
          name:displayName,
          type: type,
          beginningDate: beginningDate,
          endingDate: endingDate,
          beginningHour: beginningHour,
          endingHour: endingHour,
          status: 'oczekujący',
          createdAt: new Date(),
        });
        setType('');
        setBeginningDate('');
        setEndingDate('');
        setBeginningHour('');
        setEndingHour('');
        setMessage('Wniosek został pomyślnie przesłany.');
      }
      catch (error){
        console.error('Błąd podczas przesyłania wniosku:', error);
        setMessage('Wystąpił błąd podczas przesyłania wniosku.');
      }
    };


  
  return(
    <>
    <h1 className='nowyWniosekh1'>{currentUser?.displayName || `${name} ${surname}`}</h1>
    <form onSubmit={handleSubmit} className='nowyWniosek'>
      <label className='typWniosku'>
        Typ wniosku
        <select 
        id='type'
        value={type}
        onChange={(e)=>setType(e.target.value)}
        required
        >
          <option></option>
          <option value="Urlop wypoczynkowy">Urlop wypoczynkowy</option>
          <option value="Na żądanie">Urlop na żądanie</option>
          <option value="Urlop macierzynski/tacierzynski">Urlop macierzyński/tacierzyński</option>
          <option value="Na dziecko">Urlop na dziecko</option>
          <option value="Opiekunczy">Urlop opiekuńczy</option>
          <option value="Zwolnienie lekarskie">Zwolnienie lekarskie</option>
          <option value="Szkolenie">Szkolenie</option>
          <option value="Nadgodziny">Odbiór nadgodzin</option>

        </select>
      </label>
      <label className='dataWniosku'>
        Początek
        <input 
        type="date" 
        id="beginnigDate"
        value={beginningDate}
        onChange={(e) => setBeginningDate(e.target.value)}
        required
        />
        Koniec
        <input 
        type="date" 
        id="endingDate"
        value={endingDate}
        onChange={(e) => {
        setEndingDate(e.target.value);
        if (new Date(e.target.value) < new Date(beginningDate)) {
                setMessage('Data końca nie może być wcześniejsza niż data początku.');
              } else {
                setMessage('');
              }
            }}
        required
        />
      </label>
      <label className='godzinyWniosku'>
        Początek <span>opcjonalnie</span>
        <input 
        type="time" 
        id="beginigHour"
        value={beginningHour}
        onChange={(e) => setBeginningHour(e.target.value)}
        />
    
        Koniec <span>opcjonalnie</span>
        <input 
        type="time" 
        id="endingHour"
        value={endingHour}
        onChange={(e) => setEndingHour(e.target.value)}
        />
      </label>
      <input type="submit" value="Wyślij" className='zatwierdzWniosek'></input>
    </form>
    {message && <div>{message}</div>}
    </>
  )
}