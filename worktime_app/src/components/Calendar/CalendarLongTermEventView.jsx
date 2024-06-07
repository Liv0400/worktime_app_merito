import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
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
            hourstart: data.beginningHour,
            hourend: data.endingHour,
            extendedProps: {
              status: data.status,
              type: data.type,
              name: data.name,
              beginningDate: data.beginningDate,
              endingDate: data.endingDate,
              beginningHour: data.beginningHour,
              endingHour: data.endingHour,
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
      case "Szkolenie":
        return { backgroundColor: "Peru", borderColor: "Peru" };
      case "Nadgodziny":
        return { backgroundColor: "Coral", borderColor: "Coral" };
      default:
        return { backgroundColor: "LimeGreen", borderColor: "LimeGreen" };
    }
  };

  const updateTooltipPosition = (event, tooltip) => {
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  };

  const handleEventMouseEnter = (info) => {
    console.log("handleEventMouseEnter", info);

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip top";
    tooltip.innerHTML = `
      <strong>Pracownik:</strong> ${info.event.extendedProps.name}<br>
      <strong>Typ:</strong> ${info.event.extendedProps.type}<br>
      <strong>Początek:</strong> ${info.event.extendedProps.beginningDate}<br>
      <strong>Koniec:</strong> ${info.event.extendedProps.endingDate}<br>
      <strong>Start:</strong> ${info.event.extendedProps.beginningHour}<br>
      <strong>Stop:</strong> ${info.event.extendedProps.endingHour}
    `;
    document.body.appendChild(tooltip);

    const updatePosition = (event) => updateTooltipPosition(event, tooltip);

    updateTooltipPosition(info.jsEvent, tooltip);
    info.el.addEventListener("mousemove", updatePosition);

    info.el.tooltip = tooltip;
    info.el.updatePosition = updatePosition; // Save the function reference
  };

  const handleEventMouseLeave = (info) => {
    console.log("handleEventMouseLeave", info);

    if (info.el.tooltip) {
      document.body.removeChild(info.el.tooltip);
      info.el.removeEventListener("mousemove", info.el.updatePosition); // Use the saved reference
      info.el.tooltip = null;
      info.el.updatePosition = null;
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
