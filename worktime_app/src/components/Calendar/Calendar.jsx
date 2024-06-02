import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import Modal from "react-modal";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import "./Calendar.css";

// Modal.setAppElement("#root"); // Ustawienie głównego elementu aplikacji

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo) => {
    const event = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      date: clickInfo.event.startStr.split("T")[0],
      startTime: clickInfo.event.startStr.split("T")[1],
      endTime: clickInfo.event.endStr.split("T")[1],
    };
    setSelectedEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
  };
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      await deleteDoc(doc(db, "events", selectedEvent.id));
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      handleCloseModal();
    }
  };
  const handleUpdateEvent = async () => {
    if (selectedEvent) {
      const updatedEvent = {
        title,
        start: `${date}T${startTime}`,
        end: `${date}T${endTime}`,
      };

      await updateDoc(doc(db, "events", selectedEvent.id), updatedEvent);
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id
            ? { id: selectedEvent.id, ...updatedEvent }
            : event
        )
      );
      handleCloseModal();
    }
  };
  return (
    <div className="Kalendarz">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        contentHeight={790}
        events={events}
        eventClick={handleEventClick}
        weekNumbers={true}
        firstDay={1}
      />
      {selectedEvent && (
        <Modal
          isOpen={true}
          onRequestClose={handleCloseModal}
          contentLabel="Edit Event"
        >
          <h2>Edytuj zmianę</h2>
          <form>
            <div>
              <label>Pracownik</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event Title"
                required
              />
            </div>
            <div>
              <label>Data</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Początek zmiany</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Koniec zmiany</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </form>
          <button onClick={handleUpdateEvent}>Aktualizuj zmianę</button>
          <button onClick={handleDeleteEvent}>Usuń zmianę</button>
          <button onClick={handleCloseModal}>Anuluj</button>
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
