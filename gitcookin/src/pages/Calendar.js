import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import react-calendar styles
import './css/Calendar.css';
import DayPlanner from '../components/DayPlanner';

function CalendarPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [selectedWeek, setSelectedWeek] = useState(''); // Week range format: "6/22-6/29"

  useEffect(() => {
    if (!user || !(user.id || user._id)) {
      console.error('User is not logged in');
      return;
    }
    const userId = user.id || user._id;
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recipes/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Calculate the start and end of the week based on the selected date
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

    // Format the week range as "MM/DD-MM/DD"
    const formattedWeek = `${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()}-${endOfWeek.getMonth() + 1}/${endOfWeek.getDate()}`;
    setSelectedWeek(formattedWeek);
  };

  return (
    <div className="calendar">
      <h1>Weekly Planner</h1>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
      <DayPlanner recipes={recipes} selectedWeek={selectedWeek} />
    </div>
  );
}

export default CalendarPage;