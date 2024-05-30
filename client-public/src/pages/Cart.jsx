import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  async function removeData(id) {
    try {
      const response = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_BASE_URL + `/user/remove/cart/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(response);

      if (response.status === 200) {
        fethData();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fethData() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/user/cart",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(response.data);
      const pendingItems = response.data.filter(
        (item) => item.paidStatus === "Pending"
      );
      setCartData(pendingItems);

      const total = pendingItems.reduce(
        (acc, curr) => acc + curr.Merchandise.price,
        0
      );

      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  const handlePayment = async () => {
    const { data } = await axios.get(
      import.meta.env.VITE_BASE_URL + "/user/midtrans/payment",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    console.log(data.orderId, "<<< Order");

    window.snap.pay(data.transaction.token, {
      onSuccess: async function (result) {
        try {
          console.log(result);
          const response = await axios({
            method: "PATCH",
            url: import.meta.env.VITE_BASE_URL + "/user/buy",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
            data: {
              orderId: data.orderId,
            },
          });

          console.log(response.data);
          navigate("/profile");
        } catch (error) {
          console.log(error);
        }
      },
      onPending: function (result) {
        alert("wating your payment!");
        console.log(result);
      },
      onError: function (result) {
        alert("payment failed!");
        console.log(result);
      },
      onClose: function () {
        alert("you closed the popup without finishing the payment");
      },
    });
  };

  console.log(cartData);

  return (
    <>
      <section className="py-8 text-center mt-20">
        <h2 className="text-2xl font-bold border-b-4 border-[#1B1D22] text-[#1B1D22] inline-block py-2">
          Shopping Cart
        </h2>
      </section>
      <section className="container mx-auto px-4 py-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            {cartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-200 py-4"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.Merchandise.imageUrl}
                    alt={item.Merchandise.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </div>
                <div className="ml-4">
                  <div className="font-semibold">{item.Merchandise.name}</div>
                  <div className="text-gray-500">
                    {item.Merchandise.description}
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => removeData(item.id)}
                      className="text-red-500 hover:text-red-700 mr-2"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div className="ml-auto font-semibold">
                  RP.{item.Merchandise.price}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md overflow-y-auto h-[200px] grid grid-flow-row">
            <div className="text-xl font-semibold mb-4">Summary</div>
            <div className="">
              <div className="text-lg font-semibold text-gray-800 mb-5">
                Total Price: RP.{totalPrice}
              </div>
            </div>
            <button
              onClick={handlePayment}
              className="bg-[#1B1D22] text-white px-6 py-3 rounded-md hover:bg-[#141518] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
