import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./CalendarForms.css";
import UserAvailabilityTable from "./UserAvailabilityTable";

const AddEventForm = ({ onEventAdded }) => {
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
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    // Sprawdź, czy zmiana nie przekracza 13 godzin
    const hoursDifference = (endDateTime - startDateTime) / (1000 * 60 * 60);
    if (hoursDifference > 13) {
      alert("Zmiana nie może przekraczać 13 godzin.");
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
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname?.rightapp === "Pracownik" ||
      user.fullname?.rightapp === "Menadżer"
  );

  return (
    <div>
      <button className="NowaZmiana" onClick={() => setShowForm(true)}>
        Nowa zmiana
      </button>
      {showForm && (
        <div className="AddEventContainer">
          <div className="Formularz">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="WybierzUzytkownika">
                  Wybierz użytkownika:
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  required
                >
                  <option value="">Wybierz użytkownika</option>
                  {filteredUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullname
                        ? `${user.fullname.firstname} ${user.fullname.lastname}`
                        : "Unknown Employee"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="Dzien">Dzień:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="PoczatekZmiany">Początek zmiany:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="KoniecZmiany">Koniec zmiany:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <button className="DodajZmiane" type="submit">
                Dodaj zmianę
              </button>
              <button
                className="Anuluj"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Anuluj
              </button>
            </form>
          </div>
          <div className="UserAvailabilityTable">
            <UserAvailabilityTable userId={selectedUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEventForm;
