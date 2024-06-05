import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import CalendarFormManager from './CalendarFormManager';

const getWeeksInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const weeks = [];
  let week = [];

  while (date.getMonth() === month) {
    week.push(new Date(date));
    date.setDate(date.getDate() + 1);

    if (date.getDay() === 1 || date.getMonth() !== month) {
      weeks.push(week);
      week = [];
    }
  }
  return weeks;
};

export const WeekListManager = () => {
  const { userId } = useParams();
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [userName, setUserName] = useState({ firstname: '', lastname: '' });
  const [weeksData, setWeeksData] = useState([]);
  const [timesFrom, setTimesFrom] = useState(new Array(7).fill(''));
  const [timesTo, setTimesTo] = useState(new Array(7).fill(''));

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data for userId:', userId);
      try {
        const userDoc = doc(db, 'users', userId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log('Fetched user data:', userData); // Debugging line

          // Check if the fields exist
          if (userData.firstname && userData.lastname) {
            setUserName({ firstname: userData.firstname, lastname: userData.lastname });
          } else if (userData.fullname) {
            // If the fullname field is a map, extract firstname and lastname
            setUserName({ firstname: userData.fullname.firstname, lastname: userData.fullname.lastname });
          } else {
            console.error('User data does not contain firstname and lastname');
          }
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchWeeksData = async () => {
      console.log('Fetching weeks data for userId:', userId);
      try {
        const q = query(
          collection(db, 'calendarEntries'),
          where('userId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log('Fetched weeks data:', data); // Debugging line
        setWeeksData(data);
      } catch (error) {
        console.error('Error fetching weeks data:', error);
      }
    };

    if (userId) {
      fetchWeeksData();
    }
  }, [userId]);

  const weeks = getWeeksInMonth(currentYear, currentMonth);

  const handleOpenForm = (week) => {
    const weekStart = week[0].toLocaleDateString();
    const weekData = weeksData.find(w => w.week.startsWith(weekStart));
    if (weekData) {
      setSelectedWeek(week);
      setTimesFrom(weekData.entries.map(entry => entry.timeFrom));
      setTimesTo(weekData.entries.map(entry => entry.timeTo));
    }
  };

  const handleCloseForm = () => {
    setSelectedWeek(null);
  };

  const handleMonthChange = (offset) => {
    const newMonth = currentMonth + offset;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const displayWeekDays = (week) => {
    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    return week.map((day, index) => (
      <div key={index}>{days[day.getDay()]} - {day.toLocaleDateString()}</div>
    ));
  };

  const isWeekFilled = (week) => {
    const weekStart = week[0].toLocaleDateString();
    const weekData = weeksData.find(w => w.week.startsWith(weekStart));
    if (weekData) {
      const filled = weekData.entries.some(entry => entry.timeFrom || entry.timeTo);
      console.log(`Week ${weekStart} filled:`, filled); // Debugging line
      return filled;
    }
    return false;
  };

  return (
    <div className="week-list">
      <h2 className='dyspozycja'>
        Dyspozycja: {userName.firstname && userName.lastname ? `${userName.firstname} ${userName.lastname}` : 'Loading...'}
      </h2>
      <div className="month-controls">
        <button className="poprzedniMiesiac" onClick={() => handleMonthChange(-1)}>Poprzedni miesiąc</button>
        <span className='miesiac'>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button className='nastepnyMiesiac' onClick={() => handleMonthChange(1)}>Następny miesiąc</button>
      </div>
      {selectedWeek && (
        <CalendarFormManager
          onClose={handleCloseForm}
          week={selectedWeek}
          timesFrom={timesFrom}
          timesTo={timesTo}
          readOnly={true}
        />
      )}
      {weeks.map((week, index) => (
        <div key={index} className="week-item">
          <div className="week-number">{index + 1} tydzień</div>
          <div className="week-date">
            {displayWeekDays(week)}
          </div>
          <button 
            className={`uzupelnij ${isWeekFilled(week) ? 'highlight' : ''}`} 
            onClick={() => handleOpenForm(week)}
            disabled={!isWeekFilled(week)}
          >
            Otwórz
          </button>
        </div>
      ))}
    </div>
  );
};
