import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      
            <h1 className="navbar-title"><img src="logo.ico" alt="FoodJoy Logo" className="navbar-logo" style={{ width: '30px', marginRight: '15px'  }} />FoodJoy</h1>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link className="link" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/products">
            Products
          </Link>
        </li>
        <li>
          <Link className="link" to="/cart">
            Crat
          </Link>
        </li>
        <li>
          <Link className="link" to="/trackorder">
          TrackOrder
          </Link>
        </li>
        <li>
          <Link className="link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="link" to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
