import React, { useState, useEffect } from 'react';
import '../App.css';
import './css/Recipes.css';
import AddRecipe from '../components/addRecipe.js';

function Recipes({ user }) {
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user || !(user.id || user._id)) {
        setRecipes([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const userId = user.id || user._id;
        const response = await fetch(`http://localhost:8000/recipes/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setRecipes([]);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, [showAddRecipe, user]);

  return (
    <>
      <div className="add-recipe-button" style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 900, margin: '32px auto 0 auto' }}>
        <button onClick={() => setShowAddRecipe(true)}>Add Recipe</button>
      </div>
      {showAddRecipe && (
        <AddRecipe onClose={() => setShowAddRecipe(false)} user={user} />
      )}
      <div className="container">
        <div className='recipePage-container'>
          <div className="recipes">
            <h1>Your Recipes</h1>
            <p>These are recipes you have added.</p>
            <div className="recipe-list">
              {loading ? (
                <div>Loading recipes...</div>
              ) : recipes.length === 0 ? (
                <div>No recipes found.</div>
              ) : (
                recipes.map((recipe, idx) => (
                  <div className="recipe-card" key={recipe._id || recipe.id || idx}>
                    <h2>{recipe.recipe_name}</h2>
                    <div style={{ margin: "10px 0" }}>
                      {recipe.cuisine && (
                        <span className="recipe-badge">{recipe.cuisine}</span>
                      )}
                      {recipe.tags && (
                        <span className="recipe-badge" style={{ marginLeft: 8 }}>{recipe.tags}</span>
                      )}
                    </div>
                    <div className="recipe-details-row">
                      {recipe.prep_time && (
                        <span>
                          <strong>Prep:</strong> {recipe.prep_time} min
                        </span>
                      )}
                      {recipe.cook_time && (
                        <span>
                          <strong>Cook:</strong> {recipe.cook_time} min
                        </span>
                      )}
                      {recipe.servings && (
                        <span>
                          <strong>Servings:</strong> {recipe.servings}
                        </span>
                      )}
                    </div>
                    {recipe.image_url && (
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="recipe-card-image"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipes;