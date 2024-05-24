import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate("/login");
  }

  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <nav className="navbar-gradient h-[100px] text-[15px] font-inter font-semibold">
      <div className="grid grid-cols-[1fr_2fr_1fr] h-full">
        <div className="flex items-center justify-center">
          <button>
            <img
              src="mulogo.png"
              alt="mu logo"
              className="h-full max-h-[33px] w-auto"
            />
          </button>
        </div>
        <div className="flex justify-center items-center gap-10 text-white">
          <div>
            <button>Shop</button>
          </div>
          <div>
            <button>League Standing</button>
          </div>
          <div>
            <button>News</button>
          </div>
          <div>
            <button>About</button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button>
            <img src="red-devils1.svg" alt="Red Devils Logo" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
