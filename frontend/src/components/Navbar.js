// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaUser, FaBoxOpen, FaHeart, FaCog, FaSignOutAlt, FaSign } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="navbar">
      <div className="title-logo-container">
        <h1 className="shop-title">Perfume Shop</h1>
        <img src={logo} alt="Shop Logo" className="shop-logo" />
      </div>

      <div className="navbar-buttons">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/offers" className="nav-button">Offers</Link>
        <Link to="/collections" className="nav-button">Collection</Link>
        <Link to="/about" className="nav-button">About</Link>

        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search perfumes..." />
          <button className="search-button">Search</button>
        </div>

        <button className="login-button" onClick={handleSidebarToggle}>Login</button>
      </div>

      {/* Sidebar for Dropdown Menu */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <ul className="dropdown-menu">
          <li>
            <FaSign className="icon" />
            <p>New Customer?</p> <Link to="/signup">Sign Up</Link> {/* Updated link */}
          </li>
          <li>
            <FaUser className="icon" />
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <FaBoxOpen className="icon" />
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <FaHeart className="icon" />
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <FaCog className="icon" />
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <FaSignOutAlt className="icon" />
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && <div className="overlay" onClick={handleSidebarToggle}></div>}
    </div>
  );
};

export default Navbar;
