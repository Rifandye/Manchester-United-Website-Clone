import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: loginInput,
      });

      navigate("/merchandises");
    } catch (error) {}
  }

  return (
    <div className="bg-black">
      <section className="overflow-hidden">
        <div className="flex flex-wrap -m-8">
          <div className="w-full md:w-1/2 p-8">
            <div className="px-4 pt-10 md:pb-40 max-w-lg mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-32 -m-2">
                <div className="w-auto p-2">
                  <a className="inline-block" href="">
                    <img
                      src="/mulogo.png"
                      alt=""
                      className="w-20 h-auto flex justify-center"
                    />
                  </a>
                </div>
              </div>
              <div className="text-center mx-auto">
                <h3 className="mb-4 text-5xl text-white tracking-5xl">
                  Log in to your account
                </h3>
                <p className="mb-10 text-gray-300">Good to have you back!</p>
                <form onSubmit={handleSubmitLogin}>
                  <div className="mb-2 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                    <input
                      className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      value={loginInput.email}
                      onChange={handleInputLoginForm}
                    />
                  </div>
                  <div className="mb-6 relative border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                    <img
                      className="absolute right-7 top-1/2 transform -translate-y-1/2"
                      src="nightsable-assets/images/sign-in/eyeslash.svg"
                      alt=""
                    />
                    <input
                      className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginInput.password}
                      onChange={handleInputLoginForm}
                    />
                  </div>
                  <div className="w-auto p-2">
                    <p className="text-sm text-gray-300">
                      <span>Dont have an account?</span>
                      <Link to="/register">
                        <a className="underline">Sign up</a>
                      </Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="block mx-auto mt-8 mb-6 px-14 py-3 text-center font-medium tracking-2xl border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300"
                  >
                    Log in
                  </button>
                </form>
                <a
                  className="mb-10 inline-block text-sm text-gray-300 underline"
                  href="#"
                >
                  Forgot password?
                </a>
                <div className="flex flex-wrap items-center mb-8">
                  <div className="flex-1 bg-gray-900">
                    <div className="h-px"></div>
                  </div>
                  <div className="px-5 text-xs text-gray-300 font-medium">
                    or sign in with email
                  </div>
                  <div className="flex-1 bg-gray-900">
                    <div className="h-px"></div>
                  </div>
                </div>
                <div className="flex flex-wrap -1 mb-7">
                  <div className="w-full p-1">
                    <a
                      className="p-5 flex flex-wrap justify-center bg-gray-900 hover:bg-gray-900 bg-opacity-30 hover:bg-opacity-10 rounded-full transition duration-300"
                      href="#"
                    >
                      <div className="mr-4 inline-block">
                        <img
                          src="nightsable-assets/images/sign-in/google.svg"
                          alt=""
                        />
                      </div>
                      <span className="text-sm text-white font-medium">
                        Sign in with Google
                      </span>
                    </a>
                  </div>
                  <div className="w-full p-1">
                    <a
                      className="p-5 flex flex-wrap justify-center bg-gray-900 hover:bg-gray-900 bg-opacity-30 hover:bg-opacity-10 rounded-full transition duration-300"
                      href="#"
                    >
                      <div className="mr-4 inline-block">
                        <img
                          src="nightsable-assets/images/sign-in/apple-logo.svg"
                          alt=""
                        />
                      </div>
                      <span className="text-sm text-white font-medium">
                        Sign in with Apple
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <div className="p-5 h-full">
              <img
                className="mx-auto md:mr-0 object-cover rounded-lg"
                src="/casemiro.jpeg"
                alt=""
                style={{ width: "900px", height: "1000px" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
