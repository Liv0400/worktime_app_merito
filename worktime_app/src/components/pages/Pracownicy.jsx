import { useState, useEffect } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
// import { Link } from "react-router-dom";
import "../style/Pracownicy.css";

export const Pracownicy = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Błąd podczas pobierania listy pracowników:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Pobieranie listy pracowników...</div>;
  }

  const showMore = (user) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  return (
    <div className="pracownicy">
      <h1>Lista pracowników:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span className="fullName" onClick={() => showMore(user)}>
              {user.firstname} {user.lastname}
            </span>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="popup">
          <div className="popup-content">
            <div className="close" onClick={closePopup}>
              &times;
            </div>
            <p>Imię/imiona:</p>
            <span>{selectedUser.fullname.firstname}</span>
            <p>Nazwisko:</p>
            <span>{selectedUser.fullname.lastname}</span>
            <p>Data urodzenia:</p>
            <span>{selectedUser.fullname.birthdate}</span>
            <p>Rodzaj umowy:</p>
            <span>{selectedUser.fullname.typedeal}</span>
            <p>Uprawnienia:</p>
            <span>{selectedUser.fullname.rightapp}</span>
            {/* <p>Wymiar etatu:</p> 
          <span>cały etat</span>  */}
          </div>
        </div>
      )}
    </div>
  );
};
