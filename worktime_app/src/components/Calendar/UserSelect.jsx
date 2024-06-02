import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const UserSelect = ({ onSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Wybierz użytkownika</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.firstname} {user.lastname}
        </option>
      ))}
    </select>
  );
};

export default UserSelect;
