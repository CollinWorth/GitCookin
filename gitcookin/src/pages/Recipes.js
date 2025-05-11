import React from 'react';
import './css/Recipes.css';

function Recipes() {
  return (
    <div className="recipes">
      <h1>Our Recipes</h1>
      <p>Explore a variety of delicious recipes curated just for you!</p>
      <div className="recipe-list">
        <div className="recipe-card">
          <h2>Spaghetti Carbonara</h2>
          <p>A classic Italian pasta dish with creamy sauce and pancetta.</p>
        </div>
        <div className="recipe-card">
          <h2>Chicken Tikka Masala</h2>
          <p>A flavorful Indian curry with tender chicken pieces.</p>
        </div>
        <div className="recipe-card">
          <h2>Chocolate Chip Cookies</h2>
          <p>Soft and chewy cookies loaded with chocolate chips.</p>
        </div>
      </div>
    </div>
  );
}

export default Recipes;