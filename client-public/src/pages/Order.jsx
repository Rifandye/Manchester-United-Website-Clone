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

  async function addCart(id) {
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/user/cart`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: {
          MerchandiseId: id,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

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
        <section className="mt-20">
          <div className="grid grid-cols-5 mx-24 gap-5">
            {merchandiseData.map((item) => (
              <div className="bg-red-300 max-h-[500px] grid grid-rows-[5.5fr_1fr_1fr_1fr]">
                <div className="">
                  <img
                    className="object-scale-down"
                    src={item.imageUrl}
                    alt=""
                  />
                </div>
                <div className="bg-red-500 flex items-center p-4">
                  <h1>{item.name}</h1>
                </div>
                <div className="bg-red-600 flex items-center p-4">
                  <p className="text-[12px]">RP.{item.price}</p>
                </div>
                <div className="bg-red-700 flex items-center justify-center">
                  <button className="bg-red-800 p-[10px] w-[200px] rounded-[20px]">
                    Add To Cart
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
