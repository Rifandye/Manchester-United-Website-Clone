import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  async function fethData() {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/user/cart",
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
      "http://localhost:3000/user/midtrans/payment",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );

    console.log(data);

    window.snap.pay(data.transaction.token, {
      onSuccess: async function (result) {
        console.log(result);
        await axios.patch(
          "http://localhost:3000/user/buy",
          {
            orderId: data.orderId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        navigate("/");
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

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartData.map((item) => (
        <div key={item.id} className="border p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-black font-semibold">
              {item.Merchandise.name}
            </h3>
            <span className="text-black">
              Price: RP.{item.Merchandise.price}
            </span>
          </div>
          <p className="mt-2 text-black">{item.Merchandise.description}</p>
        </div>
      ))}
      <div className="text-xl font-bold text-black">
        Total Price: RP.{totalPrice}
      </div>
      <button
        onClick={handlePayment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Pay
      </button>
    </section>
  );
}

export default Cart;
