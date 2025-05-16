import React from 'react';
import '../styles/Navbar.css';
import LogoutButton from './LogoutButton';
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">JobTracker 🚀</div>
      <div className="navbar-actions">
        <Link to="/dashboard" className="nav-link" >Dashboard</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <LogoutButton />
        
      </div>
    </nav>
  );
};

export default Navbar;
