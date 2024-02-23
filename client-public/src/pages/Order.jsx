import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { tambah } from "../store/counterSlice";

function Order() {
  const dispatch = useDispatch();

  const [merchandiseData, setMerchandiseData] = useState([]);
  async function fethData() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/pub/merchandises",
      });

      console.log(response.data);
      setMerchandiseData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  const handleAddToCart = () => {
    dispatch(tambah());
  };

  return (
    <section className="pt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-6 mb-16 px-4"></div>
        <div className="flex flex-wrap -m-4">
          {merchandiseData.map((item, index) => (
            <div className="w-full lg:w-1/2 p-4" key={index}>
              <div className="flex flex-wrap gap-4">
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl h-72 w-72">
                    <a href="#">
                      <img
                        className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                    </a>
                    <div className="absolute top-2 left-3"></div>
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex items-center flex-wrap gap-1 mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_249_3699)">
                        <path
                          d="M7.99999 12.6733L3.29799 15.3053L4.34799 10.02L0.391327 6.36131L5.74266 5.72665L7.99999 0.833313L10.2573 5.72665L15.6087 6.36131L11.652 10.02L12.702 15.3053L7.99999 12.6733Z"
                          fill="#FFA800"
                        ></path>
                      </g>
                      <defs>
                        <clipPath>
                          <rect
                            width="16"
                            height="16"
                            fill="white"
                            transform="translate(0 0.5)"
                          ></rect>
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-gray-500 text-sm font-semibold">
                      {item.name}
                    </span>
                  </div>
                  <p>{item.description}</p>
                  <h3 className="font-heading uppercase text-3xl"></h3>
                  <h2 className="text-red-700 font-heading text-5xl"></h2>
                  <h4 className="text-gray-500 text-lg font-semibold line-through mb-10"></h4>
                  <a
                    href="#"
                    className="bg-gray-900 rounded-full hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 text-white text-xs font-semibold px-4 h-8 inline-flex items-center transition duration-200"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Order;
