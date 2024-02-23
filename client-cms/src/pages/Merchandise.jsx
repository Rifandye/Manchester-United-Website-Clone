import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Merchandise() {
  const [merchandiseData, setMerchandiseData] = useState([]);

  async function fethData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/merchandises",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(data);
      setMerchandiseData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  async function deleteDataById(id) {
    try {
      const response = await axios({
        method: "DELETE",
        url: import.meta.env.VITE_BASE_URL + `/merchandises/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setMerchandiseData((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const navigate = useNavigate();

  function handleButton(id) {
    navigate(`/merchandises/${id}`);
  }

  return (
    <div className="flex flex-col items-center">
      <Link
        to="/add-merchandise"
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mb-10 mt-6"
      >
        Add Merchandise
      </Link>
      <div className="max-w-7xl  mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 w-100">
        {merchandiseData.map((item) => (
          <div
            key={item.id}
            className="bg-white overflow-hidden shadow-md rounded-lg text-center max-w-xs p-6 relative"
          >
            <img
              className="w-full h-40 object-contain"
              src={item.imageUrl}
              alt=""
            />
            <div className="px-4 py-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-700 text-base mb-3">{item.description}</p>
              <p className="mt-2 mb-12 text-gray-900">Price:{item.price}</p>
            </div>
            <div className="absolute bottom-0 left-0 w-full flex justify-center mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={() => {
                  handleButton(item.id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  deleteDataById(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Merchandise;
