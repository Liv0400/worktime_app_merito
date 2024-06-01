import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

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
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleEventMouseEnter = (info) => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip top";
    tooltip.innerHTML = `
      <strong>Title:</strong> ${info.event.title}<br>
      <strong>Start:</strong> ${info.event.start}<br>
      <strong>End:</strong> ${info.event.end}
    `;
    document.body.appendChild(tooltip);

    const updateTooltipPosition = (event) => {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    };

    updateTooltipPosition(info.jsEvent);
    info.el.addEventListener("mousemove", updateTooltipPosition);

    info.el.tooltip = tooltip;
  };

  const handleEventMouseLeave = (info) => {
    if (info.el.tooltip) {
      document.body.removeChild(info.el.tooltip);
      info.el.removeEventListener("mousemove", updateTooltipPosition);
      info.el.tooltip = null;
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
