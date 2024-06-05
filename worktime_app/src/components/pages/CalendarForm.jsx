import { useState, useEffect } from 'react';
import './Dyspozycja.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const CalendarForm = ({ onClose, onSubmit, week, timesFrom, timesTo, user, setTimesFrom, setTimesTo }) => {
  const [dates, setDates] = useState([]);
  const [timesFromState, setTimesFromState] = useState(new Array(7).fill(''));
  const [timesToState, setTimesToState] = useState(new Array(7).fill(''));

  useEffect(() => {
    if (week) {
      setDates(week.map(date => date.toLocaleDateString()));
      setTimesFromState(timesFrom);
      setTimesToState(timesTo);
    }
  }, [week, timesFrom, timesTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entries = dates.map((date, index) => ({
        date,
        timeFrom: timesFromState[index],
        timeTo: timesToState[index]
      }));

      const weekData = {
        userId: user.uid,
        week: dates[0] + ' - ' + dates[dates.length - 1],
        entries
      };

      const weekDocId = `${user.uid}_${dates[0].replaceAll('/', '.')}`;
      const weekDocRef = doc(db, 'calendarEntries', weekDocId);
      await setDoc(weekDocRef, weekData, { merge: true }); // Używamy setDoc z opcją merge aby zaktualizować istniejący dokument lub utworzyć nowy

      onSubmit(entries);
    } catch (e) {
      console.error('Error adding/updating document: ', e);
    }
  };

 const handleTimeChange = (index, type, value) => {
    if (type === 'from') {
      const newTimesFrom = [...timesFromState];
      newTimesFrom[index] = value;
      setTimesFrom(newTimesFrom);
    } else if (type === 'to') {
      const newTimesTo = [...timesToState];
      newTimesTo[index] = value;
      setTimesTo(newTimesTo);
    }
  };

  const displayWeekDays = (week) => {
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    return week.map((day, index) => (
      <div key={index}>{days[day.getDay()]} - {day.toLocaleDateString()}</div>
    ));
  };

  return (
    <form className="calendar-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{week ? 'Edytuj dyspozycję' : 'Utwórz nową dyspozycję'}</h2>
      </div>
      <div className="form-content">
        {dates.map((date, index) => (
          <div key={index} className="form-group">
            <label>{displayWeekDays(week)[index]}</label>
            <input
              type="time"
              value={timesFromState[index]}
              onChange={(e) => handleTimeChange(index, 'from', e.target.value)}
            />
            <input
              type="time"
              value={timesToState[index]}
              onChange={(e) => handleTimeChange(index, 'to', e.target.value)}
            />
          </div>
        ))}
      </div>
      <button className='dyspobutton' type="submit">Zapisz</button>
      <button className='dyspobutton' type="button" onClick={onClose}>Anuluj</button>
    </form>
  );
};

export default CalendarForm;

