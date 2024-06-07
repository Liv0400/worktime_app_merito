import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/firestore';
import './Administrator.css';
import { Link } from 'react-router-dom';

export const Dyspozycja = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => user.fullname?.rightapp === 'Pracownik' || user.fullname?.rightapp === 'Menadżer');

 

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
              <div className={`user-status ${user.status}`}></div>
              <Link to={`/dyspozycja/${user.id}`}>
                {user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'No Name'}
              </Link>
           
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};