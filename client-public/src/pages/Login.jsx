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
    } catch (error) {
      toast.error("Invalid credentials!");
    }
  }

  return (
    <div className="outer-container">
      <div className="grid-container">
        <div className="login-container">
          <div className="login-holder">
            <div className="grid-form">
              <form>
                <h1>Log in to your account</h1>
                <h2>Email</h2>
                <input type="text" name="" id="" />
                <h2>Password</h2>
                <h2>Nanti lanjutkan lagi </h2>
                <input type="text" name="" id="" />
                <button>Login</button>
              </form>
            </div>
          </div>
        </div>
        <div className="image-container">
          <div className="image-holder">
            <img src="/casemiro.jpeg" alt="casemiro photo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
