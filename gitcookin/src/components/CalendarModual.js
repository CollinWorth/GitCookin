import React, { useState } from 'react';
import './css/CalendarModual.css';

function CalendarModual() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [events, setEvents] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const addEvent = (day) => {
    const event = prompt(`Add an event for ${day}:`);
    if (!event) return;

    setEvents((prevEvents) => ({
      ...prevEvents,
      [day]: [...prevEvents[day], event],
    }));
  };

  return (
    <div className="week-view-calendar">
      {daysOfWeek.map((day) => (
        <div key={day} className="day-box">
          <h2>{day}</h2>
          <ul>
            {events[day].map((event, idx) => (
              <li key={idx}>{event}</li>
            ))}
          </ul>
          <button onClick={() => addEvent(day)} className="add-event-button">Add Event</button>
        </div>
      ))}
    </div>
  );
}

export default CalendarModual;