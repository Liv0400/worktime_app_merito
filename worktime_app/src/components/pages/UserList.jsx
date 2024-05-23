import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../services/firestore'; // Dodaj tę funkcję do services/firestore
import './Administrator.css';

export const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-list">
      <h1 className="tytulform">Lista Pracowników</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/edycja/${user.id}`}>{user.fullname.firstname} {user.fullname.lastname}</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

