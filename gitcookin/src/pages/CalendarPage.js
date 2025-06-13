import React, { useState, useEffect } from 'react';
import CalendarComponent from './CalendarComponent'; // Renamed Calendar.js to CalendarComponent.js
import DayPlanner from '../components/DayPlanner';
import './css/Calendar.css';

function CalendarPage({ user }) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [recipes, setRecipes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
  const [selectedDay, setSelectedDay] = useState('Sunday'); // Default to Sunday
  const [selectedWeek, setSelectedWeek] = useState(''); // Week range format: "MM/DD-MM/DD"
  const [dayRecipes, setDayRecipes] = useState([]); // Recipes for the selected day

  // Fetch all recipes for the user
  useEffect(() => {
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

  // Fetch recipes for the selected day
  useEffect(() => {
    const fetchDayMeals = async () => {
      try {
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

        const response = await fetch(
          `http://localhost:8000/mealPlans/${formattedDate}/${user.id || user._id}`
        );

        if (response.ok) {
          const mealPlans = await response.json();

          const recipeIds = mealPlans.map((meal) => meal.recipe_id);

          const recipePromises = recipeIds.map((id) =>
            fetch(`http://localhost:8000/recipes/${id}`).then((res) => res.json())
          );

          const recipes = await Promise.all(recipePromises);

          setDayRecipes(recipes); // Update state with detailed recipe information
        } else {
          console.error('Failed to fetch day meals:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching day meals:', error);
      }
    };

    if (selectedDate && user) {
      fetchDayMeals();
    }
  }, [selectedDate, user]);

  // Handle date change from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dayIndex = new Date(date).getDay();
    setSelectedDay(daysOfWeek[dayIndex]);

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
    <div className="calendar-page">
      <h1>Weekly Planner</h1>
      <CalendarComponent
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <DayPlanner
        user={user}
        recipes={dayRecipes}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedWeek={selectedWeek}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}

export default CalendarPage;