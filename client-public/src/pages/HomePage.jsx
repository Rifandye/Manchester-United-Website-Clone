import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./HomePage.css";

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
    <main className="flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="grid grid-cols-2  bg-[#1B1D22] w-[1120px] h-[588px] mt-[125px] mb-[95px] rounded-[20px]">
        <div className="flex flex-col">
          <div className="w-[462px] h-[183] leading-[60.51px] font-inter text-white text-[50px] font-[600px] mt-[47px] ml-[61px] mb-[45px]">
            Embrace <br />
            The Spirit of <br />
            Manchester United
          </div>
          <div className="font-inter leading-[24.2px] w-[481px] h-[48px] text-white text-[20px] font-[600px] ml-[61px]">
            Step into Legacy: A Journey Through the Glorious <br />
            and Unmatched Passion of the Red Devils
          </div>
          <div className="ml-[61px]">
            <button className="bg-white px-[15px] py-[20px] rounded-[20px] font-inter text-[20px] font-[600px] mt-[155px]">
              Explore More
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <div className="w-[434px] h-[495px] rounded-[20px] bg-red-400">
            <img src="Banner.svg" alt="" />
          </div>
        </div>
      </section>

      {/* Featured Secttion */}
      <section className="flex flex-col justify-center items-center w-[1120px] mb-[185px]">
        <div className="flex flex-col justify-center items-center rounded-[20px] w-[323px] h-[122px] mb-[43px]">
          <div className="font-[600px] text-[50px] leading-[60.51px] text-center">
            NEW <span className="text-red-800">RED</span> <br /> COLLECTION
          </div>
        </div>
        <div className="h-[570px] w-[1120px] grid grid-cols-4 gap-5">
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle2.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle3.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle4.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle5.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle6.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle7.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle8.svg" alt="" />
          </div>
          <div className="w-[265px] h-[265px] rounded-[20px]">
            <img src="Rectangle9.svg" alt="" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
