import React, { useState, useEffect } from 'react';
import './Dyspozycja.css';

const CalendarFormManager = ({ onClose, week, timesFrom, timesTo, readOnly }) => {
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

  const displayWeekDays = (week) => {
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    return week.map((day, index) => (
      <div key={index}>{days[day.getDay()]} - {day.toLocaleDateString()}</div>
    ));
  };

  return (
    <form className="calendar-form">
      <div className="form-header">
        <h2>Godziny pracy</h2>
      </div>
      <div className="form-content">
        {dates.map((date, index) => (
          <div key={index} className="form-group">
            <label>{displayWeekDays(week)[index]}</label>
            <input
              type="time"
              value={timesFromState[index]}
              readOnly={readOnly} // dodanie właściwości tylko do odczytu
            />
            <input
              type="time"
              value={timesToState[index]}
              readOnly={readOnly} // dodanie właściwości tylko do odczytu
            />
          </div>
        ))}
      </div>
      <button className='dyspobutton' type="button" onClick={onClose}>Zamknij</button>
    </form>
  );
};

export default CalendarFormManager;
