import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

function NavBar({ user }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item">{user && <Link to="/calendar">Calendar</Link>} </li>
        <li className="navbar-item">{user && <Link to="/recipes">Recipes</Link>} </li>
        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
        <li className="navbar-item">{!user && <Link to="/login">Login</Link>} </li>
        <li className="navbar-item">{!user && <Link to="/register">Register</Link>} </li>
      </ul>
    </nav>
  );
}

export default NavBar;