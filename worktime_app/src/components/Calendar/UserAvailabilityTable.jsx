import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import "./CalendarForms.css";

const UserAvailabilityTable = ({ userId }) => {
  const [availability, setAvailability] = useState([]);
  const [searchWeek, setSearchWeek] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      if (userId) {
        const q = query(
          collection(db, "calendarEntries"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const availabilityData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAvailability(availabilityData);
      } else {
        setAvailability([]);
      }
    };

    fetchAvailability();
  }, [userId]);

  const handleSearchChange = (e) => {
    setSearchWeek(e.target.value);
  };

  const filteredAvailability = availability.filter((entry) =>
    entry.week.toString().includes(searchWeek)
  );

  if (!userId) {
    return (
      <p className="dyspoKomunikat">
        Wybierz użytkownika, aby zobaczyć jego dostępność.
      </p>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Szukaj wg tygodnia"
        value={searchWeek}
        onChange={handleSearchChange}
        className="searchInput"
      />
      <table className="tabela">
        <thead>
          <tr>
            <th>Tydzień</th>
            <th>Data</th>
            <th>Od</th>
            <th>Do</th>
          </tr>
        </thead>
        <tbody>
          {filteredAvailability.map((entry) =>
            entry.entries.map((subEntry, index) => (
              <tr key={`${entry.id}-${index}`}>
                <td>{entry.week}</td>
                <td>{subEntry.date}</td>
                <td>{subEntry.timeFrom}</td>
                <td>{subEntry.timeTo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAvailabilityTable;
