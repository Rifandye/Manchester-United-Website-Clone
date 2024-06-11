import "./HomePage.css";

function Home() {
  return (
    <>
      <section className="font-inter" aria-label="Hero Section">
        <div className="hero h-[700px] text-white grid grid-cols-[1fr_1fr] rounded-bl-2xl rounded-br-2xl">
          <div className="flex flex-col gap-10">
            <div className="ml-[78px] mt-[56px] text-[50px] font-semibold whitespace-pre-line">
              Embrace
              <br />
              The Spirit of
              <br />
              Manchester United
            </div>
            <div className="ml-[78px] text-[20px] font-semibold whitespace-pre-line">
              Step into Legacy: A Journey Through the Glorious
              <br />
              and Unmatched Passion of the Red Devils
            </div>
            <div className="ml-[78px]">
              <button className="bg-[#D99A20] h-[50px] w-[200px] rounded-[20px] text-[#1B1D22] font-semibold">
                Explore More
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center h-[560px] w-[560px]">
              <img src="herobanner.svg" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="h-[738px] mt-[104px] mb-7 grid grid-rows-[auto_1fr]">
          <div className="flex justify-center items-center">
            <div className="text-[#1B1D22] text-[50px] font-semibold text-center w-[357.61px] h-[138.43px]">
              NEW <span className="text-[#991B1B]">RED</span>
              <br />
              COLLECTION
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="w-[1240px] h-[600px] relative">
              <img
                className="w-[610px] h-[600px] left-0 top-0 absolute"
                src="collection1.svg"
              />
              <img
                className="w-[610px] h-[290px] left-[630px] top-0 absolute"
                src="collection2.svg"
              />
              <img
                className="w-[610px] h-[290px] left-[630px] top-[310px] absolute"
                src="collection3.svg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
