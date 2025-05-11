import React from 'react';
import './css/Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to GitCookin!</h1>
      <p>Your one-stop destination for delicious recipes and cooking inspiration.</p>
      <button className="explore-button">Explore Recipes</button>
    </div>
  );
}

export default Home;