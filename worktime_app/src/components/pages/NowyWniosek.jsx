import {useState, useEffect} from 'react';
import {db} from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getCurrentUser } from '../../services/auth';
import '../style/NowyWniosek.css';


export const NowyWniosek = () => {

  const [type, setType] = useState('');
   const [beginningDate, setBeginningDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [beginningHour, setBeginningHour] = useState('');
  const [endingHour, setEndingHour] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    
      e.preventDefault();
      console.log('Wysłano pomyślnie')
    
      try{
        const currentUserData = currentUser;
        // Dodawanie nowego wniosku do Firestore
        await addDoc(collection(db, 'applications'),{
          userId:currentUserData?.uid || 'ID pracownika',
          name:currentUserData?.displayName || 'Imię Nazwisko',
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
    <h1 className='nowyWniosekh1'>{currentUser?.displayName || "Imię Nazwisko"}</h1>
    <form onSubmit={handleSubmit} className='nowyWniosek'>
      <label className='typWniosku'>
        Typ wniosku
        <select 
        id='type'
        value={type}
        onChange={(e)=>setType(e.target.value)}
        required
        >
          <option value="Urlop wypoczynkowy">Urlop wypoczynkowy</option>
          <option value="Na żądanie">Urlop na żądanie</option>
          <option value="Urlop macierzynski/tacierzynski">Urlop macierzyński/tacierzyński</option>
          <option value="Na dziecko">Urlop na dziecko</option>
          <option value="Opiekunczy">Urlop opiekuńczy</option>
          <option value="Zwolnienie lekarskie">Zwolnienie lekarskie</option>
        </select>
      </label>
      <label className='dataWniosku'>
        Początek
        <input 
        type="date" 
        id="beginigDate"
        value={beginningDate}
        onChange={(e) => setBeginningDate(e.target.value)}
        required
        />
        Koniec
        <input 
        type="date" 
        id="endingDate"
        value={endingDate}
        onChange={(e) => setEndingDate(e.target.value)}
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
      <input type="reset" value="Anuluj" className='anulujWniosek'></input>
    </form>
    {message && <div>{message}</div>}
    </>
  )
}