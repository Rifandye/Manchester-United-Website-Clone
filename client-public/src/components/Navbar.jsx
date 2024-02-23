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
    <>
      <>
        <div>
          <nav className="relative bg-red-800 py-3 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link to="/" className="inline-block mr-10">
                    <img className="h-auto lg:h-10" src="/mulogo.png" alt="" />
                  </Link>
                  <ul className="lg:flex items-center gap-10 text-white">
                    <li>
                      <Link to="/" className="text-sm font-medium">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/order" className="text-sm font-medium">
                        Shop
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="text-sm font-medium">
                        My United
                      </a>
                    </li>
                    <li>
                      <Link to="/standing" className="text-sm font-medium">
                        League Standing
                      </Link>
                    </li>
                    <li>
                      <Link to="/news" className="text-sm font-medium">
                        News
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="lg:flex gap-10 items-center">
                  <a href="#" className="group">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm font-medium">
                        Cart({cartCount})
                      </span>
                    </div>
                  </a>
                  <a href="#" className="group">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="text-sm font-medium">Account</span>
                    </div>
                  </a>
                  <button
                    onClick={logOut}
                    className="text-white text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </>
    </>
  );
}

export default Navbar;
