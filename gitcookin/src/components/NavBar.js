import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/calender">Calender</Link></li>
        <li className="navbar-item"><Link to="/recipes">Recipes</Link></li>
        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;