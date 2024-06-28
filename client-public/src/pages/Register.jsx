import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleInputRegisterForm(event) {
    const { name, value } = event.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault();

    const toastId = toast.loading("Registering...", {
      theme: "dark",
    });

    try {
      await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/register",
        data: registerData,
      });

      toast.update(toastId, {
        render: "Register Successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      navigate("/login");
    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Register Failed!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  }

  return (
    <div className="h-screen">
      <div className="grid grid-cols-[1.5fr_0.5fr] h-full">
        <div className="">
          <div className="m-20 h-4/5 grid grid-rows-[0.5fr_1.5fr]">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-black text-3xl mb-4">
                  Join the Red Devils!
                </h1>
                <h2 className="text-black text-1xl mt-4">
                  Become Part of Manchester United's Legacy
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <form onSubmit={handleRegisterSubmit}>
                <div className="w-[400px]">
                  <input
                    className="border border-black focus-within:border-red-800 rounded-3xl text-black placeholder-black outline-none bg-transparent"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={registerData.firstName}
                    onChange={handleInputRegisterForm}
                  />
                  <input
                    className="border border-black focus-within:border-red-800 rounded-3xl text-black placeholder-black outline-none bg-transparent"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={registerData.lastName}
                    onChange={handleInputRegisterForm}
                  />
                  <input
                    className="border border-black focus-within:border-red-800 rounded-3xl text-black placeholder-black outline-none bg-transparent"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleInputRegisterForm}
                  />
                  <input
                    className="border border-black focus-within:border-red-800 rounded-3xl text-black placeholder-black outline-none bg-transparent"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={handleInputRegisterForm}
                  />
                </div>
                <p className="text-center text-sm text-black my-4">
                  Already have an account?
                  <Link
                    to="/login"
                    className="underline text-red-800 hover:text-red-700"
                  >
                    Sign In
                  </Link>
                </p>
                <button
                  className="block mx-auto mt-8 mb-6 px-14 py-3 text-center font-medium tracking-2xl border-2 border-red-800 bg-red-800 hover:bg-red-700 text-black focus:ring-4 focus:ring-red-800 focus:ring-opacity-40 rounded-full transition duration-300"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img
            className="object-cover h-full"
            src="banner3.jpeg"
            alt="Banner"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
