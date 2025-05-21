import React, { useState } from 'react';
import './css/addRecipe.css';

function AddRecipe({ onClose }) {
  const [form, setForm] = useState({
    recipeName: '',
    ingredients: '',
    instructions: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual endpoint URL
    const endpoint = 'https://your-api.com/recipes';
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        // Optionally handle success (e.g., close modal, show message)
        onClose();
      } else {
        // Handle error
        alert('Failed to add recipe');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="container">
            <div className="add-recipe-container">
                <h1>Add a New Recipe</h1>
                <form className="add-recipe-form">
                    <label>
                        Recipe Name:
                        <input type="text" name="recipeName" required />
                    </label>
                    <label>
                        Ingredients:
                        <input name="ingredients" required />
                        <input name="quantity" type="number" required />
                    </label>
                    <button type="button" onclick="addIngredient()">Add Another Ingredient</button>
                    <label>
                        Instructions:
                        <textarea name="instructions" required />
                    </label>
                    <button type="submit">Add Recipe</button>
            <div className="add-recipe-close">
                <button type="button" onClick={onClose}>Close</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;