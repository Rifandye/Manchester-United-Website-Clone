import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/counterSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/PriceConverter";

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.counter.count);

  const [merchandiseData, setMerchandiseData] = useState([]);

  async function addCart(id) {
    try {
      await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/user/cart",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: {
          MerchandiseId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fethData() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/pub/merchandise",
      });

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
        <section className="mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-5 sm:mx-10 md:mx-20 lg:mx-32">
            {merchandiseData.map((item) => (
              <div
                key={item.id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  className="w-full h-70 object-cover"
                  src={item.imageUrl}
                  alt=""
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 h-[80px] mb-2">
                    {item.name}
                  </h3>
                  <div className="text-gray-600 mb-2 h-[35px]">
                    {formatPrice(item.price)}
                  </div>
                  <button
                    onClick={() => [addCart(item.id), handleAddToCart(item.id)]}
                    className="bg-[#1B1D22] text-white px-4 py-2 rounded-full flex items-center justify-center w-full transition-all duration-300 hover:bg-gray-800"
                  >
                    <FaShoppingCart className="mr-2" /> Add To Cart
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
            className="text-3xl text-[#1B1D22] cursor-pointer hover:text-gray-800 transition-colors duration-300"
            onClick={() => handleNavigation("/cart")}
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
