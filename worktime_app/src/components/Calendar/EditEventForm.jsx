import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import "./CalendarForms.css";

const EditEventForm = ({ event, onClose, onEventUpdated, onEventDeleted }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (event) {
      const [eventDate, eventStartTime] = event.start.split("T");
      const [, eventEndTime] = event.end.split("T");
      setDate(eventDate);
      setStartTime(eventStartTime);
      setEndTime(eventEndTime);
      setSelectedUser(event.userId);
    }
  }, [event]);

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

    const updatedEvent = {
      ...event,
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
      user: selectedUser,
    };

    const eventDocRef = doc(db, "events", event.id);

    try {
      await updateDoc(eventDocRef, updatedEvent);
      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji zmiany: ", error);
      alert(
        "Wystąpił błąd podczas aktualizacji zmiany. Proszę spróbować ponownie."
      );
    }
  };

  const handleDelete = async () => {
    const eventDocRef = doc(db, "events", event.id);

    try {
      await deleteDoc(eventDocRef);
      onEventDeleted(event.id);
      onClose();
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania zmiany: ", error);
      alert(
        "Wystąpił błąd podczas usuwania zmiany. Proszę spróbować ponownie."
      );
    }
  };

  return (
    <div className="EdytujZmiane">
      <h2 className="Naglowek">Edytuj zmianę</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="WybierzUzytkownika">Wybierz użytkownika:</label>
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
        <button className="ZaktualizujZmiane" type="submit">
          Zaktualizuj zmianę
        </button>
        <button className="UsunZmiane" type="button" onClick={handleDelete}>
          Usuń zmianę
        </button>
        <button className="AnulujEdit" type="button" onClick={onClose}>
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;
