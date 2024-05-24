import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/profile" onClick={onClose}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={onClose}>
              Cart
            </Link>
          </li>
          <li>
            <button onClick={logOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
