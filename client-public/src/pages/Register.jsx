import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineLock,
} from "react-icons/ai";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
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

    try {
      const response = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/add-user",
        data: registerData,
      });

      navigate("/login");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="outer-container register-background">
      <div className="grid-container">
        <div className="register-container">
          <div className="register-holder">
            <div className="flex-form flex flex-wrap  justify-center">
              <div className="w-full md:w-1/2">
                <div className="px-4 max-w-lg mx-auto">
                  <div className="flex flex-wrap items-center justify-between mb-20"></div>
                  <div className="text-center mx-auto">
                    <h3 className="mb-4 text-3xl text-white tracking-5xl">
                      Let's Register
                    </h3>
                    <p className="mb-10 text-gray-300">
                      Good to meet you, Reds!
                    </p>
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="mb-2 border border-white focus-within:border-green-400 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                          value={registerData.firstname}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-2 border border-white focus-within:border-green-400 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                          type="text"
                          name="lastname"
                          placeholder="Last Name"
                          value={registerData.lastname}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-2 border border-white focus-within:border-green-400 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={registerData.email}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-2 border border-white focus-within:border-green-400 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={registerData.phoneNumber}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-6 relative border border-white focus-within:border-green-400 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={registerData.password}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-sm text-gray-300">
                          <span>Already have an account?</span>
                          <Link to="/login" className="underline">
                            Sign in
                          </Link>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="block mx-auto mt-8 mb-6 px-14 py-3 text-center font-medium tracking-2xl border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300"
                      >
                        Register
                      </button>
                    </form>
                    <a
                      className="mb-10 inline-block text-sm text-gray-300 underline"
                      href="#"
                    >
                      Forgot password?
                    </a>
                    <div className="flex flex-wrap items-center mb-8">
                      <div className="flex-1 bg-white">
                        <div className="h-px"></div>
                      </div>
                      <div className="px-5 text-xs text-gray-300 font-medium">
                        or sign in with email
                      </div>
                      <div className="flex-1 bg-white">
                        <div className="h-px"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-0">
                      <div className="w-full">
                        <button
                          id="google-button"
                          className="text-sm text-white font-medium"
                        >
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="image-container">
          <div className="image-holder">
            <img src="/banner3.jpeg" alt="banner photo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
