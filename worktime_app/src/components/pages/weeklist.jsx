import { useState, useEffect } from 'react';
import CalendarForm from './CalendarForm';
import './Dyspozycja.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

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

const WeekList = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [weeksData, setWeeksData] = useState([]);
  const [timesFrom, setTimesFrom] = useState(new Array(7).fill(''));
  const [timesTo, setTimesTo] = useState(new Array(7).fill(''));

  const fetchUserInfo = async (user) => {
    try {
      if (user.displayName) {
        const [name, surname] = user.displayName.split(" ");
        setUserName({ name, surname });
      } else {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName({ name: userData.name, surname: userData.surname });
        } else {
          console.error("No such document!");
        }
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserInfo(user);
      } else {
        setUser(null);
        setUserName('');
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'calendarEntries'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs
          .filter(doc => doc.data().userId === user.uid)
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setWeeksData(data);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const weeks = getWeeksInMonth(currentYear, currentMonth);

  const handleOpenForm = (week) => {
    setSelectedWeek(week);
  };

  const handleCloseForm = () => {
    setSelectedWeek(null);
  };

  const handleFormSubmit = (data) => {
    console.log('Submitted data:', data);
    handleCloseForm();
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

  const getWeekStatus = (week) => {
    const weekStart = week[0].toLocaleDateString();
    const weekData = weeksData.find(w => w.week && w.week.startsWith(weekStart));
    return weekData && weekData.entries.every(entry => entry.timeFrom && entry.timeTo) ? 'success' : 'fail';
  };

  const displayWeekDays = (week) => {
    return week.map((day, index) => (
      <div key={index}>{day.toLocaleDateString()}</div>
    ));
  };

  return (
    <div className="week-list">
      <h2 className='dyspozycja'>Dyspozycja: {userName.name} {userName.surname}</h2>
      <div className="month-controls">
        <button className="poprzedniMiesiac" onClick={() => handleMonthChange(-1)}>Poprzedni miesiąc</button>
        <span className='miesiac'>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button className='nastepnyMiesiac' onClick={() => handleMonthChange(1)}>Następny miesiąc</button>
      </div>
      {selectedWeek && (
        <CalendarForm
          onClose={handleCloseForm}
          onSubmit={handleFormSubmit}
          week={selectedWeek}
          timesFrom={timesFrom}
          timesTo={timesTo}
          user={user}
        />
      )}
      {weeks.map((week, index) => (
        <div key={index} className="week-item">
          <div className="week-number">{index + 1} tydzień</div>
          <div className="week-date">
            {displayWeekDays(week)}
          </div>
          <div className={`week-status ${getWeekStatus(week)}`}>
            {getWeekStatus(week) === 'success' ? '✔️' : '❌'}
          </div>
          <button className='uzupelnij' onClick={() => handleOpenForm(week)}>Uzupełnij</button>
        </div>
      ))}
    </div>
  );
};

export default WeekList;
