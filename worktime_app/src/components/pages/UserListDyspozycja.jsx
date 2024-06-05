import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../services/firestore'; 
import './Administrator.css';

export const UsersListDyspo = () => {
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
      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className={`user-status ${user.status}`}></div>
            <Link to={`/dyspozycjamenager/${user.id}`}>
              {user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'No Name'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
