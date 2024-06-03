import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import AddEventForm from "./AddEventForm";
import EditEventForm from "./EditEventForm";
import { differenceInHours, parseISO } from "date-fns";
import "./Calendar.css";

const CalendarWithManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [users, setUsers] = useState([]);

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

    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      async (snapshot) => {
        const deletedUsers = snapshot
          .docChanges()
          .filter((change) => change.type === "removed")
          .map((change) => change.doc.id);

        if (deletedUsers.length > 0) {
          const q = query(
            collection(db, "events"),
            where("user", "in", deletedUsers)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
      }
    );

    fetchUsers();
    return () => unsubscribeUsers();
  }, []);

  const checkUserAvailability = (newEvent) => {
    const userEvents = events.filter((event) => event.user === newEvent.user);
    for (let event of userEvents) {
      const start = parseISO(event.start);
      const end = parseISO(event.end);
      const newStart = parseISO(newEvent.start);
      const newEnd = parseISO(newEvent.end);

      if (
        (differenceInHours(newStart, end) < 11 && newStart > end) ||
        (differenceInHours(start, newEnd) < 11 && newEnd < start)
      ) {
        return false;
      }
    }
    return true;
  };
  const handleEventAdded = async (newEvent) => {
    if (!checkUserAvailability(newEvent)) {
      alert(
        "Pracownik musi mieć co najmniej 11 godzin przerwy między zmianami."
      );
      return false;
    }
    try {
      const docRef = await addDoc(collection(db, "events"), newEvent);
      const addedEvent = { id: docRef.id, ...newEvent };
      setEvents([...events, addedEvent]);
      alert("Zmiana została pomyślnie dodana!");
    } catch (error) {
      console.error("Wystąpił błąd podczas dodawania zmiany: ", error);
      return false;
    }
  };

  const handleEventClick = (clickInfo) => {
    const clickedEvent = events.find(
      (event) => event.id === clickInfo.event.id
    );
    setSelectedEvent(clickedEvent);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleEventDeleted = (deletedEventId) => {
    setEvents(events.filter((event) => event.id !== deletedEventId));
    return false;
  };

  return (
    <div>
      <AddEventForm onEventAdded={handleEventAdded} />
      {selectedEvent && (
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
