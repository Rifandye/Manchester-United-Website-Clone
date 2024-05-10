import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleCredentialResponse = async (response) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/google-login",
        headers: {
          "google-token": response.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);

      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "569645514479-mmmij55tojuknn5nl4h239spdte9qr9s.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    //ini button
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      { theme: "outline", size: "large" } // customization attributes
    );
    //ini one tap
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);

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
        url: import.meta.env.VITE_BASE_URL + "/login",
        data: loginInput,
      });

      const { access_token, role } = response.data;

      localStorage.setItem("access_token", response.data.access_token);

      navigate("/");
      console.log("Redirecting to homepage...");
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  }

  return (
    <div className="outer-container login-background">
      <div className="grid-container">
        <div className="login-container">
          <div className="login-holder">
            <div className="flex-form flex flex-wrap  justify-center">
              <div className="w-full md:w-1/2">
                <div className="px-4 max-w-lg mx-auto">
                  <div className="flex flex-wrap items-center justify-between mb-40"></div>
                  <div className="text-center mx-auto">
                    <h3 className="mb-4 text-3xl text-black tracking-5xl">
                      Log in to your account
                    </h3>
                    <p className="mb-10 text-black">Good to have you back!</p>
                    <form onSubmit={handleSubmitLogin}>
                      <div className="mb-2 border border-black focus-within:border-red-800 overflow-hidden rounded-3xl">
                        <input
                          className="pl-6 pr-16 py-4 text-black w-full placeholder-black outline-none bg-transparent"
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={loginInput.email}
                          onChange={handleInputLoginForm}
                        />
                      </div>
                      <div className="mb-6 relative border border-black focus-within:border-red-800 overflow-hidden rounded-3xl">
                        <img
                          className="absolute right-7 top-1/2 transform -translate-y-1/2"
                          src="nightsable-assets/images/sign-in/eyeslash.svg"
                          alt=""
                        />
                        <input
                          className="pl-6 pr-16 py-4 text-black w-full placeholder-black outline-none bg-transparent"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={loginInput.password}
                          onChange={handleInputLoginForm}
                        />
                      </div>
                      <div className="w-auto p-2">
                        <p className="text-sm text-black">
                          <span>Dont have an account?</span>
                          <Link to="/register" className="underline">
                            Sign up
                          </Link>
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="block mx-auto mt-8 mb-6 px-14 py-3 text-center font-medium tracking-2xl border-2 bg-red-800 hover:bg-red-700 text-black focus:ring-4 focus:ring-red-800 focus:ring-opacity-40 rounded-full transition duration-300"
                      >
                        Log in
                      </button>
                    </form>
                    <a
                      className="mb-10 inline-block text-sm text-black underline"
                      href="#"
                    >
                      Forgot password?
                    </a>
                    <div className="flex flex-wrap items-center mb-8">
                      <div className="flex-1 bg-black">
                        <div className="h-px"></div>
                      </div>
                      <div className="px-5 text-xs text-black font-medium">
                        or sign in with email
                      </div>
                      <div className="flex-1 bg-black">
                        <div className="h-px"></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="w-full">
                        <button
                          id="google-button"
                          className="text-sm text-black font-medium"
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
            <img src="/banner6.jpeg" alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
