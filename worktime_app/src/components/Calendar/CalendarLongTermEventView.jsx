import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import plLocale from "@fullcalendar/core/locales/pl";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./Calendar.css";

const CalendarLongTermEventView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "applications"));
      const eventsData = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            start: data.beginningDate,
            end: data.endingDate,
            extendedProps: {
              status: data.status,
              type: data.type,
              name: data.name,
              beginningDate: data.beginningDate,
              endingDate: data.endingDate,
            },
          };
        })
        .filter((event) => event.extendedProps.status === "zaakceptowany");

      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const getEventColor = (type) => {
    switch (type) {
      case "Urlop wypoczynkowy":
        return { backgroundColor: "DarkViolet", borderColor: "DarkViolet" };
      case "Na żądanie":
        return { backgroundColor: "Crimson", borderColor: "Crimson" };
      case "Urlop macierzynski/tacierzynski":
        return { backgroundColor: "Magenta", borderColor: "Magenta" };
      case "Na dziecko":
        return {
          backgroundColor: "DarkTurquoise",
          borderColor: "DarkTurquoise",
        };
      case "Opiekunczy":
        return {
          backgroundColor: "MediumAquaMarine",
          borderColor: "MediumAquaMarine",
        };
      case "Zwolnienie lekarskie":
        return { backgroundColor: "MediumOrchid", borderColor: "MediumOrchid" };
      default:
        return { backgroundColor: "LimeGreen", borderColor: "LimeGreen" };
    }
  };

  const handleEventMouseEnter = (info) => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip top";
    tooltip.innerHTML = `
      <strong>Name:</strong> ${info.event.extendedProps.name}<br>
      <strong>Type:</strong> ${info.event.extendedProps.type}<br>
      <strong>Start:</strong> ${info.event.extendedProps.beginningDate}<br>
      <strong>End:</strong> ${info.event.extendedProps.endingDate}
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
    <div>
      <FullCalendar
        locale={plLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth",
        }}
        contentHeight={790}
        events={events.map((event) => ({
          ...event,
          ...getEventColor(event.extendedProps.type),
        }))}
        weekNumbers={true}
        firstDay={1}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
      />
    </div>
  );
};

export default CalendarLongTermEventView;
