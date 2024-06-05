import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { differenceInHours, parseISO, startOfWeek, endOfWeek } from "date-fns";
import "./CalendarForms.css";
import UserAvailabilityTable from "./UserAvailabilityTable";

const EditEventForm = ({
  event,
  onClose,
  onEventUpdated,
  onEventDeleted,
  events,
}) => {
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
      setStartTime(eventStartTime.substring(0, 5));
      setEndTime(eventEndTime.substring(0, 5));
      setSelectedUser(event.user);
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

  // Sprawdź, czy użytkownik ma co najmniej 11 godzin przerwy między zmianami
  const checkUserAvailability = (updatedEvent) => {
    const userEvents = events.filter(
      (event) =>
        event.user === updatedEvent.user && event.id !== updatedEvent.id
    );
    for (let event of userEvents) {
      const start = parseISO(event.start);
      const end = parseISO(event.end);
      const newStart = parseISO(updatedEvent.start);
      const newEnd = parseISO(updatedEvent.end);

      if (
        (differenceInHours(newStart, end) < 11 && newStart > end) ||
        (differenceInHours(start, newEnd) < 11 && newEnd < start)
      ) {
        return false;
      }
    }
    return true;
  };

  // Sprawdź, czy użytkownik nie przekroczył 48 godzin w tygodniu
  const checkWeeklyHoursLimit = (updatedEvent) => {
    const newStart = parseISO(updatedEvent.start);
    const newEnd = parseISO(updatedEvent.end);
    const eventDuration = differenceInHours(newEnd, newStart);

    const startOfWeekDate = startOfWeek(newStart, { weekStartsOn: 1 });
    const endOfWeekDate = endOfWeek(newStart, { weekStartsOn: 1 });

    const userEvents = events.filter((event) => {
      const eventStart = parseISO(event.start);
      return (
        event.user === updatedEvent.user &&
        eventStart >= startOfWeekDate &&
        eventStart <= endOfWeekDate &&
        event.id !== updatedEvent.id
      );
    });

    const totalWeeklyHours = userEvents.reduce((sum, event) => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      return sum + differenceInHours(eventEnd, eventStart);
    }, 0);

    return totalWeeklyHours + eventDuration <= 48;
  };

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

    const updatedEvent = {
      ...event,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      user: selectedUser,
    };

    if (!checkUserAvailability(updatedEvent)) {
      alert(
        "Pracownik musi mieć co najmniej 11 godzin przerwy między zmianami."
      );
      return;
    }

    if (!checkWeeklyHoursLimit(updatedEvent)) {
      alert("Pracownik nie może pracować więcej niż 48 godzin w tygodniu.");
      return;
    }

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

  const filteredUsers = users.filter(
    (user) =>
      user.fullname?.rightapp === "Pracownik" ||
      user.fullname?.rightapp === "Menadżer"
  );
  return (
    <div className="EdytujZmiane">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="WybierzUzytkownika">Edytuj:</label>
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
      <div className="UserAvailabilityTable">
        <UserAvailabilityTable userId={selectedUser} />
      </div>
    </div>
  );
};

export default EditEventForm;
