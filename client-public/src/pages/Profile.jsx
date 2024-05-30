import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [userData, setUserdata] = useState([]);
  const [paidTransactions, setPaidTransactions] = useState({});

  async function fetchUserData() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/user/profile",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(response.data);

      setUserdata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/user/cart", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        const paidData = response.data.filter(
          (item) => item.paidStatus === "Paid"
        );

        const groupedPaidTransactions = paidData.reduce((acc, curr) => {
          const paidDate = curr.paidDate;
          if (!acc[paidDate]) {
            acc[paidDate] = [curr];
          } else {
            acc[paidDate].push(curr);
          }
          return acc;
        }, {});

        console.log(groupedPaidTransactions);

        setPaidTransactions(groupedPaidTransactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="text-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile"
                  className="h-24 w-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
                />
                <h2 className="text-3xl font-semibold text-gray-800">
                  {`${userData.firstName} ${userData.lastName}`}
                </h2>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  About Me
                </h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam commodo nisi vitae felis congue posuere. Vivamus sem
                  libero, dignissim non risus eu, pharetra commodo justo.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Shipping Information
                </h3>
                <ul className="mt-2 text-sm text-gray-600">
                  <li>
                    <span className="font-semibold">Address:</span> 123 Main
                    Street, Cityville, ABC
                  </li>
                  <li>
                    <span className="font-semibold">Phone:</span> +123 456 7890
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Paid Transactions
              </h2>
              {Object.keys(paidTransactions).map((paidDate) => (
                <details key={paidDate} className="mb-4 border-b pb-2">
                  <summary className="cursor-pointer list-none">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {new Date(paidDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                  </summary>
                  <div className="mt-2 pl-4">
                    {paidTransactions[paidDate].map((transaction, index) => (
                      <div
                        key={index}
                        className="mb-2 p-4 rounded-lg border bg-gray-50"
                      >
                        <div className="flex items-center mb-2">
                          <img
                            src={transaction.Merchandise.imageUrl}
                            alt={transaction.Merchandise.name}
                            className="h-16 w-16 rounded mr-4"
                          />
                          <div>
                            <div className="font-semibold text-lg text-gray-800">
                              {transaction.Merchandise.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              {transaction.Merchandise.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">Price:</span> $
                          {transaction.Merchandise.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
