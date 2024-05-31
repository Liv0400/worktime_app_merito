import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const Grafik_formularz = ({ onEventAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !selectedUser) {
      alert("Proszę wypełnić wszystkie pola.");
      return;
    }

    const selectedUserData = users.find((user) => user.id === selectedUser);
    const userFullName = selectedUserData
      ? `${selectedUserData.fullname.firstname} ${selectedUserData.fullname.lastname}`
      : "Unknown Employee";

    const event = {
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
      user: selectedUser,
      title: userFullName, // Ustawienie tytułu na imię i nazwisko użytkownika
    };

    onEventAdded(event, selectedUser);
    setDate("");
    setStartTime("");
    setEndTime("");
    setSelectedUser("");
    setShowForm(false);
    alert("Wydarzenie zostało pomyślnie dodane!");
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Nowa zmiana</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Wybierz użytkownika:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              <option value="">Wybierz użytkownika</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullname
                    ? `${user.fullname.firstname} ${user.fullname.lastname}`
                    : "Unknown Employee"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Dzień:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Początek zmiany:</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Koniec zmiany:</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <button type="submit">Dodaj zmianę</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Anuluj
          </button>
        </form>
      )}
    </div>
  );
};

export default Grafik_formularz;
