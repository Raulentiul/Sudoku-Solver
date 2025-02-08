import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    setShowLogoutConfirmation(false);
    navigate("/"); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            <span className="star">★</span> Profile
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/solve" className="navbar-link">
            <span className="star">★</span> Solve Sudoku
          </Link>
        </li>
        <li className="navbar-item unlog">
          <span
            className="navbar-link"
            onClick={() => setShowLogoutConfirmation(true)}
          >
            <span className="star">★</span> Unlog
          </span>
        </li>
      </ul>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <div className="logout-overlay">
          <div className="logout-confirmation">
            <p>Are you sure you want to unlog?</p>
            <div className="logout-buttons">
              <button className="logout-button yes" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="logout-button no"
                onClick={() => setShowLogoutConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
