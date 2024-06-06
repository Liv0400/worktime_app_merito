import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/firestore';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import './Administrator.css';
import { Link } from 'react-router-dom';

export const Dyspozycja = () => {
  const [users, setUsers] = useState([]);
  const [userStatuses, setUserStatuses] = useState({});

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
    if (week.length > 0) {
      weeks.push(week);
    }
    return weeks;
  };

  const checkAllWeeksPresent = (weeks, userWeeks) => {
    const weekStarts = userWeeks.map(week => week.week.split(' - ')[0]);
    return weeks.every(week => {
      const weekStart = week[0].toLocaleDateString();
      return weekStarts.includes(weekStart);
    });
  };

  //Pobieranie i filtrowanie użytkowników: Używając getUsers, pobieramy listę użytkowników i filtrujemy ich według roli (Pracownik lub Menadżer).
  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };

    //Funkcja fetchUserWeeks: Pobiera dane z calendarEntries i aktualizuje status każdego użytkownika na podstawie obecności wszystkich tygodni.
    const fetchUserWeeks = () => {
      const q = query(collection(db, 'calendarEntries'));
      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setUserStatuses(users.reduce((acc, user) => {
          const userWeeks = data.filter(entry => entry.userId === user.id);
          const weeks = getWeeksInMonth(new Date().getFullYear(), new Date().getMonth());
          const allWeeksPresent = checkAllWeeksPresent(weeks, userWeeks);
          acc[user.id] = allWeeksPresent ? 'success' : 'fail';
          return acc;
        }, {}));
      });
    };

    fetchUsers();
    fetchUserWeeks();
  }, [users]);

  const filteredUsers = users.filter(user => user.fullname?.rightapp === 'Pracownik' || user.fullname?.rightapp === 'Menadżer');

  //getUserStatusIcon zwraca odpowiednie ikony w zależności od statusu użytkownika.
  const getUserStatusIcon = (userId) => {
    const status = userStatuses[userId];
    return status === 'fail' ? '❌' : status === 'success' ? '✔️' : '❓';
  };

  return (
    <main>
      <h1 className="tytul">Lista pracowników</h1>
      <div>
        <Link to="/dyspozycjapracownik">
          <button className="PrzyciskDodaj">Dodaj dyspozycje</button>
        </Link>
      </div>
      <div className="users-list">
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id} className="user-item">
              <div className={`user-status ${userStatuses[user.id]}`}></div>
              <Link to={`/dyspozycja/${user.id}`}>
                {user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'No Name'}
              </Link>
              <span className={userStatuses[user.id] === 'fail' ? 'fail-icon' : 'success-icon'}>
                {getUserStatusIcon(user.id)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};
