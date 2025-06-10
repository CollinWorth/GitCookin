import React from 'react';
import Calendar from 'react-calendar'; // Import Calendar from react-calendar
import 'react-calendar/dist/Calendar.css'; // Import styles for react-calendar
import './css/Calendar.css';

function CalendarComponent({ selectedDate, handleDateChange }) {
  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="hebrew"
      />
    </div>
  );
}

export default CalendarComponent;