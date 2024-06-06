import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import { format } from "date-fns";

const CalendarViewOnly = () => {
  const [events, setEvents] = useState([]);
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
        color: getRandomColor(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const updateTooltipPosition = (event, tooltip) => {
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  };

  const handleEventMouseEnter = (info) => {
    const startTime = format(info.event.start, "HH:mm");
    const endTime = format(info.event.end, "HH:mm");

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip top";
    tooltip.innerHTML = `
      <strong>Pracownik:</strong> ${info.event.title}<br>
      <strong>Początek:</strong> ${startTime}<br>
      <strong>Koniec:</strong> ${endTime}
    `;
    document.body.appendChild(tooltip);

    const updatePosition = (event) => updateTooltipPosition(event, tooltip);

    updateTooltipPosition(info.jsEvent, tooltip);
    info.el.addEventListener("mousemove", updatePosition);

    info.el.tooltip = tooltip;
    info.el.updatePosition = updatePosition; // Save the function reference
  };

  const handleEventMouseLeave = (info) => {
    if (info.el.tooltip) {
      document.body.removeChild(info.el.tooltip);
      info.el.removeEventListener("mousemove", info.el.updatePosition); // Use the saved reference
      info.el.tooltip = null;
      info.el.updatePosition = null;
    }
  };

  return (
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
      events={events.map((event) => {
        const user = users.find((emp) => emp.id === event.user);
        return {
          ...event,
          title: user
            ? `${user.fullname.firstname} ${user.fullname.lastname}`
            : "Unknown Employee",
          backgroundColor: user ? user.color : "#ccc",
        };
      })}
      eventMouseEnter={handleEventMouseEnter}
      eventMouseLeave={handleEventMouseLeave}
      weekNumbers={true}
      firstDay={1}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        meridiem: false,
      }}
      allDaySlot={false}
      editable={false} // Disable event editing
      selectable={false} // Disable event selection
    />
  );
};
export default CalendarViewOnly;
