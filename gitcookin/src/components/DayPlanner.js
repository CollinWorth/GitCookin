import React, { useState, useEffect } from 'react';
import './css/DayPlanner.css';
import SearchBar from '../components/SearchBar.js';

function DayPlanner({ recipes, selectedWeek }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dayRecipes, setDayRecipes] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes || []);

  useEffect(() => {
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, recipes]);

  useEffect(() => {
    // Reset day recipes when the week changes
    setDayRecipes({
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    });
  }, [selectedWeek]);

  const handleDragStart = (event, recipe) => {
    event.dataTransfer.setData('recipe', JSON.stringify(recipe));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const recipe = JSON.parse(event.dataTransfer.getData('recipe'));
    setDayRecipes((prev) => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], recipe],
    }));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="day-planner">
      <div className="day-selector">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={`day-button ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="day-recipes" onDrop={handleDrop} onDragOver={handleDragOver}>
        <h2>Recipes for {selectedDay} ({selectedWeek})</h2>
        {dayRecipes[selectedDay].length > 0 ? (
          <ul>
            {dayRecipes[selectedDay].map((recipe, idx) => (
              <li key={idx} className="recipe-item">
                <span>{recipe.recipe_name}</span>
                <button
                  className="remove-recipe"
                  onClick={() => {
                    setDayRecipes((prev) => ({
                      ...prev,
                      [selectedDay]: prev[selectedDay].filter((_, i) => i !== idx), // Remove the specific recipe
                    }));
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes assigned to this day.</p>
        )}
      </div>

      <div className="search-bar">
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </div>

      <h2>Available Recipes</h2>
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="recipe-card"
            draggable
            onDragStart={(event) => handleDragStart(event, recipe)}
          >
            {recipe.recipe_name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DayPlanner;