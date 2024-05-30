import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/counterSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.counter.count);

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
    dispatch(increment());
  };

  function handleNavigation(path) {
    navigate(path);
  }

  return (
    <>
      <section>
        <div className="h-[1000px] relative rounded-bl-2xl rounded-br-2xl">
          <img
            src="bannershop.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-bl-2xl rounded-br-2xl"
          />
        </div>
        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-24">
            {merchandiseData.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-200 pb-7 rounded-[20px] border border-black"
              >
                <div className="h-[340px] w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
                  <img
                    src={item.imageUrl || "default-image.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-[20px] ml-[20px] text-[#1B1D22] font-inter font-semibold">
                  <div className="text-[15px] h-10 ">{item.name}</div>
                  <div className="font-semibold text-lg mt-2">
                    RP.{item.price}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-3 mt-5">
                  <button
                    className="bg-[#1B1D22] text-white px-4 py-2 rounded-full flex items-center gap-2"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    <FaShoppingCart /> Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <div className="fixed bottom-8 right-8">
        <div className="relative">
          <FaShoppingCart
            className="text-3xl text-[#1B1D22] cursor-pointer"
            onClick={() => handleNavigation("/cart")}
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
