import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

function Calendar() {
  const events = [
    {
      title: "The Title",
      start: "2024-05-05T08:00:00",
      end: "2024-05-05T09:00:00",
    },
  ];

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
        weekNumbers={true}
        firstDay={1}
      />
    </div>
  );
}

export default Calendar;
