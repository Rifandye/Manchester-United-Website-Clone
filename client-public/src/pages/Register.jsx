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
    <div className="outer-container register-background">
      <div className="grid-container">
        <div className="register-container">
          <div className="register-holder">
            <div className="flex-form flex flex-wrap  justify-center">
              <div className="w-full md:w-1/2">
                <div className="px-4 max-w-lg mx-auto">
                  <div className="flex flex-wrap items-center justify-between mb-40"></div>
                  <div className="text-center mx-auto">
                    <h3 className="mb-4 text-3xl text-black tracking-5xl">
                      Let's Register
                    </h3>
                    <p className="mb-10 text-black">Good to meet you, Reds!</p>
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="mb-2 border border-black focus-within:border-red-800 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-black w-full placeholder-black outline-none bg-transparent"
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={registerData.firstName}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-2 border border-black focus-within:border-red-800 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-black w-full placeholder-black outline-none bg-transparent"
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={registerData.lastName}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-2 border border-black focus-within:border-red-800 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-black w-full placeholder-black outline-none bg-transparent"
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={registerData.email}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="mb-6 relative border border-black focus-within:border-red-800 overflow-hidden rounded-3xl flex items-center">
                        <input
                          className="pl-2 pr-16 py-4 text-black w-full placeholder-black outline-none bg-transparent"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={registerData.password}
                          onChange={handleInputRegisterForm}
                        />
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-sm text-black">
                          <span>Already have an account?</span>
                          <Link to="/login" className="underline">
                            Sign in
                          </Link>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="block mx-auto mt-8 mb-6 px-14 py-3 text-center font-medium tracking-2xl border-2 border-red-800 bg-red-800 hover:bg-red-700 text-black focus:ring-4 focus:ring-red-800 focus:ring-opacity-40 rounded-full transition duration-300"
                      >
                        Register
                      </button>
                    </form>
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
