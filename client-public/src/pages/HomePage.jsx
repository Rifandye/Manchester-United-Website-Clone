import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
  }, [location]);

  return (
    <>
      <section className="overflow-hidden">
        <div className="px-6 pt-10">
          <div className="bg-black rounded-2xl py-6 pr-6 pl-6 lg:pl-24">
            <div className="flex flex-wrap -m-4">
              <div className="w-full lg:w-7/12 p-4">
                <div className="py-18">
                  <div className="flex items-center flex-wrap gap-6 mb-4">
                    <div className="w-16 h-px bg-white"></div>
                    <a href="#">
                      <img
                        className="h-6"
                        src="shopky-assets/logos/instagram-logo-white.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        className="h-6"
                        src="shopky-assets/logos/facebook-logo-white.svg"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        className="h-6"
                        src="shopky-assets/logos/twitter-logo-white.svg"
                        alt=""
                      />
                    </a>
                  </div>
                  <h1 className="font-heading uppercase text-8xl max-w-lg mb-6 text-white">
                    Glory Glory Man United
                  </h1>
                  <p className="text-white text-lg font-semibold mb-12 max-w-lg">
                    Explore a various of features, including live scores, squad
                    information, and an online shop, on Manchester United's
                    journey to glory.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="bg-white rounded-full hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                    >
                      Shop Now
                    </a>
                    <Link
                      to="/news"
                      className="bg-black rounded-full border border-gray-200 focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold px-8 h-12 inline-flex items-center transition duration-200"
                    >
                      Explore More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-5/12 p-4">
                <a href="#" className="group">
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{ height: "670px" }}
                  >
                    <img
                      className="absolute inset-0 rounded-2xl w-full h-full object-cover transform transition duration-200"
                      src="/banner4.jpeg"
                      alt="banner"
                    />
                    <div className="absolute bottom-8 left-8">
                      <h2 className="font-heading text-white text-6xl uppercase max-w-sm mb-2">
                        We are the Red Devils
                      </h2>
                      <p className="text-white text-lg font-semibold max-w-md">
                        The King of England
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center p-10 -m-4">
          <div className="w-1/2 md:w-1/3 lg:w-1/6 p-4"></div>
          <div className="w-1/2 md:w-1/3 lg:w-1/6 p-4"></div>
          <div className="w-1/2 md:w-1/3 lg:w-1/6 p-4"></div>
          <div className="w-1/2 md:w-1/3 lg:w-1/6 p-4"></div>
          <div className="w-1/2 md:w-1/3 lg:w-1/6 p-4"></div>
          <div className="w-1/2 md:w-1/3 lg:w-1/6 p-4"></div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h1 className="font-heading uppercase text-center text-7xl md:text-9xl mb-14">
            new united collection
          </h1>
          <div className="flex flex-wrap -m-4">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <a href="#" className="group">
                <div
                  className="overflow-hidden rounded-2xl mb-4"
                  style={{ height: "480px" }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/1.jpeg"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <a href="#" className="group">
                <div
                  className="overflow-hidden rounded-2xl mb-4"
                  style={{ height: "480px" }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/6.jpeg"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <a href="#" className="group">
                <div
                  className="overflow-hidden rounded-2xl mb-4"
                  style={{ height: "480px" }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/2.jpeg"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <a href="#" className="group">
                <div
                  className="overflow-hidden rounded-2xl mb-4"
                  style={{ height: "480px" }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/3.jpeg"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <a href="#" className="group">
                <div
                  className="overflow-hidden rounded-2xl mb-4"
                  style={{ height: "480px" }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/4.jpeg"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <a href="#" className="group">
                <div
                  className="overflow-hidden rounded-2xl mb-4"
                  style={{ height: "480px" }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/5.jpeg"
                    alt=""
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
