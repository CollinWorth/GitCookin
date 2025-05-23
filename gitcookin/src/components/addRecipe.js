import React, { useState, useEffect } from 'react';
import './css/addRecipe.css';

function AddRecipe({ onClose, user }) {
  const [form, setForm] = useState({
    recipe_name: '',
    instructions: '',
    prep_time: '',
    cook_time: '',
    servings: '',
    cuisine: '',
    tags: '',
    image_url: '',
    user_id: user?.id || user?._id || '',
  });

  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: '' }
  ]);

  useEffect(() => {
    if (user && (user.id || user._id)) {
      setForm(f => ({ ...f, user_id: user.id || user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (idx, e) => {
    const newIngredients = ingredients.map((ing, i) =>
      i === idx ? { ...ing, [e.target.name]: e.target.value } : ing
    );
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('submitting recipe', form, ingredients);

    const endpoint = 'http://localhost:8000/recipes';

    const recipe = {
      recipe_name: form.recipe_name,
      ingredients: ingredients.map(ing => ({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
      })),
      instructions: form.instructions,
      prep_time: form.prep_time ? Number(form.prep_time) : undefined,
      cook_time: form.cook_time ? Number(form.cook_time) : undefined,
      servings: form.servings ? Number(form.servings) : undefined,
      cuisine: form.cuisine,
      tags: form.tags,
      image_url: form.image_url,
      user_id: form.user_id,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });
      if (response.ok) {
        onClose();
      } else {
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
        <form className="add-recipe-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="recipe_name" value={form.recipe_name} onChange={handleChange} required />
          </label>
          <label>
            Ingredients:
            {ingredients.map((ingredient, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={ingredient.name}
                  onChange={e => handleIngredientChange(idx, e)}
                  required
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={e => handleIngredientChange(idx, e)}
                  required
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Unit (e.g. tbs)"
                  value={ingredient.unit}
                  onChange={e => handleIngredientChange(idx, e)}
                  required
                />
                {ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(idx)} style={{ color: 'red' }}>✕</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient}>Add Ingredient</button>
          </label>
          <label>
            Instructions:
            <textarea name="instructions" value={form.instructions} onChange={handleChange} required />
          </label>
          <label>
            Prep Time (minutes):
            <input type="number" name="prep_time" value={form.prep_time} onChange={handleChange} min="0" />
          </label>
          <label>
            Cook Time (minutes):
            <input type="number" name="cook_time" value={form.cook_time} onChange={handleChange} min="0" />
          </label>
          <label>
            Servings:
            <input type="number" name="servings" value={form.servings} onChange={handleChange} min="1" />
          </label>
          <label>
            Cuisine:
            <input type="text" name="cuisine" value={form.cuisine} onChange={handleChange} />
          </label>
          <label>
            Tags:
            <input type="text" name="tags" value={form.tags} onChange={handleChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="image_url" value={form.image_url} onChange={handleChange} />
          </label>
          <button type="submit">Add Recipe</button>
        </form>
        <div className="add-recipe-close">
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;