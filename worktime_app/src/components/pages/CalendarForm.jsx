import { useState, useEffect } from 'react';
import './Dyspozycja.css';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const CalendarForm = ({ onClose, onSubmit, week, timesFrom, timesTo, user }) => {
  const [dates, setDates] = useState([]);
  const [timesFromState, setTimesFromState] = useState(new Array(7).fill(''));
  const [timesToState, setTimesToState] = useState(new Array(7).fill(''));
  const [existingData, setExistingData] = useState(null);

  useEffect(() => {
    if (week) {
      setDates(week.map(date => date.toLocaleDateString()));
      setTimesFromState(timesFrom);
      setTimesToState(timesTo);
      const weekStart = week[0].toLocaleDateString();
      const fetchWeekData = async () => {
        const weekDoc = await getDoc(doc(db, 'calendarEntries', `${user.uid}_${weekStart}`));
        if (weekDoc.exists()) {
          const data = weekDoc.data();
          setExistingData(data);
          setTimesFromState(data.entries.map(entry => entry.timeFrom));
          setTimesToState(data.entries.map(entry => entry.timeTo));
        } else {
          setTimesFromState(new Array(7).fill(''));
          setTimesToState(new Array(7).fill(''));
        }
      };
      fetchWeekData();
    }
  }, [week, timesFrom, timesTo, user.uid]);

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

      if (existingData) {
        await updateDoc(doc(db, 'calendarEntries', `${user.uid}_${dates[0]}`), weekData);
      } else {
        await addDoc(collection(db, 'calendarEntries'), weekData);
      }

      console.log('Document written with ID: ', dates[0]);
      onSubmit(entries);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleTimeChange = (index, type, value) => {
    if (type === 'from') {
      const newTimesFrom = [...timesFromState];
      newTimesFrom[index] = value;
      setTimesFromState(newTimesFrom);
    } else if (type === 'to') {
      const newTimesTo = [...timesToState];
      newTimesTo[index] = value;
      setTimesToState(newTimesTo);
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
        <h2>Uzupełnij godziny pracy</h2>
      </div>
      <div className="form-content">
        {dates.map((date, index) => (
          <div key={index} className="form-group">
            <label>{displayWeekDays(week)[index]}</label>
            <input
              type="time"
              value={timesFromState[index]}
              onChange={(e) => handleTimeChange(index, 'from', e.target.value)}
             //jesli chcemy pole obligatoryjne uzywamy required
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
