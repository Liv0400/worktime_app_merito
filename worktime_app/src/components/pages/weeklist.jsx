import React from 'react';
import './Dyspozycja.css';

const weeks = [
  { id: 14, date: '25.03.2024 - 31.03.2024', status: 'fail' },
  { id: 13, date: '18.03.2024 - 24.03.2024', status: 'fail' },
  { id: 12, date: '11.03.2024 - 17.03.2024', status: 'fail' },
  { id: 11, date: '04.03.2024 - 10.03.2024', status: 'success' },
  { id: 10, date: '26.02.2024 - 03.03.2024', status: 'success' },
  { id: 9, date: '19.02.2024 - 25.02.2024', status: 'success' },
  { id: 8, date: '12.02.2024 - 18.02.2024', status: 'success' },
  { id: 7, date: '05.02.2024 - 11.02.2024', status: 'success' },
  { id: 6, date: '29.01.2024 - 04.02.2024', status: 'success' },
  { id: 5, date: '22.01.2024 - 28.01.2024', status: 'success' },
];

const WeekList = () => {
  return (
    <div className="week-list">
      <h2>Pracownik 2</h2>
      {weeks.map(week => (
        <div key={week.id} className="week-item">
          <div className="week-number">{week.id} tydzień</div>
          <div className="week-date">{week.date}</div>
          <div className={`week-status ${week.status}`}>
            {week.status === 'success' ? '✔️' : '❌'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekList;