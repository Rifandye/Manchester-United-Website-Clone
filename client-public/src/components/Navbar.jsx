import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
    <nav>
      <div className="flex justify-between items-center h-[100px] bg-red-800 rounded-bl-[20px] rounded-br-[20px]">
        <div>
          <button onClick={() => handleNavigation("/")}>
            <img className="ml-[160px]" src="mulogo1.svg" alt="Mu logo" />
          </button>
        </div>
        <div>
          <ul className="flex justify-between gap-[34px] font-[600] text-white font-inter">
            <li>
              <button onClick={() => handleNavigation("/order")}>Shops</button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/standing")}>
                League Standing
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/news")}>News</button>
            </li>
            <li>
              <button>About</button>
            </li>
          </ul>
        </div>
        <div>
          <img className="mr-[160px]" src="red-devils1.svg" alt="Red Devils" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
