import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import AddEventForm from "./AddEventForm";
import EditEventForm from "./EditEventForm";
import "./Calendar.css";

const CalendarWithManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };

    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    });

    fetchEvents();
    return () => unsubscribe();
  }, []);

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

  const handleEventAdded = async (newEvent) => {
    try {
      const docRef = await addDoc(collection(db, "events"), newEvent);
      const addedEvent = { id: docRef.id, ...newEvent };
      setEvents([...events, addedEvent]);
    } catch (error) {
      console.error("Wystąpił błąd podczas dodawania zmiany: ", error);
    }
    setShowAddForm(false);
  };

  const handleEventClick = (clickInfo) => {
    const clickedEvent = events.find(
      (event) => event.id === clickInfo.event.id
    );
    setSelectedEvent(clickedEvent);
    setShowAddForm(false);
    setShowEditForm(true);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setShowEditForm(false);
  };

  const handleEventDeleted = (deletedEventId) => {
    setEvents(events.filter((event) => event.id !== deletedEventId));
    setShowEditForm(false);
  };

  return (
    <div>
      <AddEventForm onEventAdded={handleEventAdded} closeForm={!showAddForm} />
      {showEditForm && selectedEvent && (
        <EditEventForm
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEventUpdated={handleEventUpdated}
          onEventDeleted={handleEventDeleted}
        />
      )}
      <FullCalendar
        locale={plLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        contentHeight={790}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        events={events.map((event) => {
          const user = users.find((user) => user.id === event.user);
          return {
            ...event,
            title: user
              ? `${user.fullname.firstname} ${user.fullname.lastname}`
              : "Unknown Employee",
          };
        })}
        eventClick={handleEventClick}
        allDaySlot={false}
        weekNumbers={true}
        firstDay={1}
      />
    </div>
  );
};

export default CalendarWithManagement;
