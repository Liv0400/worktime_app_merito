import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../services/firestore'; 
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

  const filteredUsers = users.filter(user => user.fullname?.rightapp === 'Pracownik' || user.fullname?.rightapp === 'Menadżer');

  return (
    <div className="users-list">
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} className="user-item">
            <div className={`user-status ${user.status}`}></div>
            <Link to={`/edycja/${user.id}`}>
              {user.fullname ? `${user.fullname.firstname} ${user.fullname.lastname}` : 'No Name'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
