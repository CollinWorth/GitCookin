import React, { useState } from 'react';
import '../App.css'; // Use universal styles
import './css/Recipes.css';
import AddRecipe from '../components/addRecipe.js';

function Recipes() {
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  return (
    <>
      <div className="add-recipe-button" style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 900, margin: '32px auto 0 auto' }}>
        <button onClick={() => setShowAddRecipe(true)}>Add Recipe</button>
      </div>
      {showAddRecipe && (
        <AddRecipe onClose={() => setShowAddRecipe(false)} />
      )}
      <div className="container">
        <div className='recipePage-container'>
          <div className="recipes">
            <h1>Our Recipes</h1>
            <p>Explore a variety of delicious recipes curated just for you!</p>
            <div className="recipe-list">
              <div className="recipe-card">
                <h2>Spaghetti Carbonara</h2>
                <p>A classic Italian pasta dish with creamy sauce and pancetta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipes;