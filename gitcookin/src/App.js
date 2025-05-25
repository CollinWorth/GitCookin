import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/recipes" element={<Recipes user={user} />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
