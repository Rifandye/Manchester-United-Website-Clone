import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Sidebar from "./Sidebar";

function Navbar() {
  const navigate = useNavigate();

  function handleNavigation(path) {
    navigate(path);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="navbar-gradient h-[100px]">
        <div className="grid grid-cols-[1fr_2fr_1fr] h-full">
          <div className="flex items-center justify-center">
            <button onClick={() => handleNavigation("/")}>
              <img
                src="mulogo.png"
                alt="mu logo"
                className="h-full max-h-[33px] w-auto"
              />
            </button>
          </div>
          <div className="flex justify-center items-center gap-10 text-white">
            <div>
              <button onClick={() => handleNavigation("/order")}>Shop</button>
            </div>
            <div>
              <button onClick={() => handleNavigation("/standing")}>
                League Standing
              </button>
            </div>
            <div>
              <button onClick={() => handleNavigation("/news")}>News</button>
            </div>
            <div>
              <button>About</button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <img src="red-devils1.svg" alt="Red Devils Logo" />
            </button>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}

export default Navbar;
