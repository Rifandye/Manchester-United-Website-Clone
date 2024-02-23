import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // const [registerData, setRegisterData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   phoneNumber: "",
  //   password: "",
  // });

  // function handleInputLoginForm(event) {
  //   const { name, value } = event.target;
  //   setRegisterData({
  //     ...registerData,
  //     [name]: value,
  //   });
  // }

  // const handleRegisterSubmit = async (response) => {
  //   try {
  //     const { data } = await axios({
  //       method: "POST",
  //       url: "http://localhost:3000/register",
  //     });

  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="bg-black">
      <form action="#" method="post"></form>

      <section className="overflow-hidden bs-section-dragged">
        <div className="flex flex-wrap -m-8">
          <div className="w-full md:w-1/2 p-8">
            <div className="px-4 pt-10 md:pb-40 max-w-lg mx-auto">
              <div className="flex flex-wrap items-center justify-between mb-36 -m-2">
                <div className="w-auto p-2">
                  <a className="inline-block" href="#">
                    <img
                      src="/mulogo.png"
                      alt=""
                      className="w-20 h-auto flex justify-center"
                    />
                  </a>
                </div>
              </div>
              <div className="text-center mx-auto">
                <h3 className="mb-5 text-5xl text-white tracking-5xl">
                  Let's Register
                </h3>
                <p className="mb-10 text-gray-300">Good to meet you, Reds!</p>
                <div className="mb-2 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                  <input
                    className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="mb-2 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                  <input
                    className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
                <div className="mb-2 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                  <input
                    className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2 border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                  <input
                    className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                    type="text"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="mb-6 relative border border-gray-900 focus-within:border-white overflow-hidden rounded-3xl">
                  <img
                    className="absolute right-7 top-1/2 transform -translate-y-1/2"
                    src=""
                    alt=""
                  />
                  <input
                    className="pl-6 pr-16 py-4 text-gray-300 w-full placeholder-gray-300 outline-none bg-transparent"
                    type="password"
                    placeholder="Password"
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
                <a
                  className="block mb-10 px-14 py-4 text-center font-medium tracking-2xl border-2 border-green-400 bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300"
                  href="#"
                >
                  Sign up
                </a>
                <div className="flex flex-wrap items-center mb-8">
                  <div className="flex-1 bg-gray-900">
                    <div className="h-px"></div>
                  </div>
                  <div className="px-5 text-xs text-gray-300 font-medium">
                    or sign up with email
                  </div>
                  <div className="flex-1 bg-gray-900">
                    <div className="h-px"></div>
                  </div>
                </div>
                <div className="flex flex-wrap -1 mb-7">
                  <div className="w-full p-1">
                    <a className="p-5 flex flex-wrap justify-center bg-gray-900 hover:bg-gray-900 bg-opacity-30 hover:bg-opacity-10 rounded-full transition duration-300">
                      <div className="mr-4 inline-block">
                        <img
                          src="nightsable-assets/images/sign-in/google.svg"
                          alt=""
                        />
                      </div>
                      <span className="text-sm text-white font-medium">
                        Sign up with Google
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
                className="h-full mx-auto md:mr-0 object-cover rounded-lg max-w-full w-90"
                src="/bglogin.jpeg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
