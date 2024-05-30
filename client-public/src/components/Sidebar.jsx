import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSignOutAlt, FaTimes } from "react-icons/fa";
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
        <div>
          <div className="sidebar-header">
            <h2>Menu</h2>
            <button className="close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <ul className="sidebar-menu">
            <li>
              <Link to="/profile" onClick={onClose}>
                <FaUser className="icon" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={onClose}>
                <FaShoppingCart className="icon" />
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <button className="sidebar-menu button" onClick={logOut}>
          <FaSignOutAlt className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
