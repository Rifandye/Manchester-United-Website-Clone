import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  function handleInputLoginForm(event) {
    const { name, value } = event.target;
    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  }

  async function handleSubmitLogin(event) {
    event.preventDefault();

    const toastId = toast.loading("Logging in", {
      theme: "dark",
    });

    try {
      const response = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/login",
        data: loginInput,
      });

      localStorage.setItem("access_token", response.data.access_token);

      toast.update(toastId, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);

      toast.update(toastId, {
        render: error.response?.data?.message || "Login failed!",
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
          <div className="m-20 h-4/5 grid grid-rows-[1fr_1.5fr]">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-black text-4xl mb-4">
                  Log Into Your Account
                </h1>
                <h2 className="text-black text-2xl mt-4">
                  Good To Have You Back!
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <form onSubmit={handleSubmitLogin}>
                <div>
                  <input
                    className="border border-black focus-within:border-red-800 rounded-3xl text-black w-full placeholder-black outline-none bg-transparent"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={loginInput.email}
                    onChange={handleInputLoginForm}
                  />
                  <input
                    className="border border-black focus-within:border-red-800 rounded-3xl text-black w-full placeholder-black outline-none bg-transparent"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginInput.password}
                    onChange={handleInputLoginForm}
                  />
                </div>
                <p className="text-center text-sm text-black my-4">
                  Don't have an account?
                  <Link to="/register" className="underline">
                    Sign up
                  </Link>
                </p>
                <button
                  className="block mx-auto mt-8 mb-6 px-14 py-3 text-center font-medium tracking-2xl border-2 border-red-800 bg-red-800 hover:bg-red-700 text-black focus:ring-4 focus:ring-red-800 focus:ring-opacity-40 rounded-full transition duration-300"
                  type="submit"
                >
                  Login
                </button>
                <p className="text-center text-sm text-black my-4">
                  Forgot password?
                </p>
              </form>
            </div>
          </div>
        </div>
        <div>
          <img
            className="object-cover h-full"
            src="banner6.jpeg"
            alt="Banner"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
