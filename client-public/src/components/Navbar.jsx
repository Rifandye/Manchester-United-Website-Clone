import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const cartCount = useSelector((state) => state.counter.count);
  function logOut() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <nav>
      <div className="flex justify-between items-center h-[100px] bg-red-800 rounded-bl-[20px] rounded-br-[20px]">
        <div>
          <img className="ml-[160px]" src="mulogo1.svg" alt="Mu logo" />
        </div>
        <div>
          <ul className="flex justify-between gap-[34px] font-[600] text-white font-inter">
            <li>Shops</li>
            <li>League Standing</li>
            <li>News</li>
            <li>About</li>
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
