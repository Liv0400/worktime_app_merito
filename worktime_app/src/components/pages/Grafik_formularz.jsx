import React, { useState } from "react";
import "../style/Grafik_formularz.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const Grafik_formularz = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date || !startTime || !endTime) {
      alert("Please fill out all fields.");
      return;
    }

    const event = {
      title,
      start: `${date}T${startTime}`,
      end: `${date}T${endTime}`,
    };

    try {
      await addDoc(collection(db, "events"), event);
      setTitle("");
      setDate("");
      setStartTime("");
      setEndTime("");
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event: ", error);
      alert("Error adding event. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="dGrafik_formularz">
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
        <label>Dzień</label>
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
      <button type="submit">Dodaj zmianę</button>
    </form>
  );
};

export default Grafik_formularz;
