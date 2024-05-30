import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddMerch() {
  const navigate = useNavigate();
  const [merchInput, setMerchInput] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  function handleInputMerch(event) {
    const { name, value } = event.target;
    setMerchInput({
      ...merchInput,
      [name]: value,
    });
  }

  async function handleSubmitMerch(event) {
    event.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/merchandises",
        data: merchInput,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(response);
      navigate("/merchandises");
    } catch (error) {
      toast.error("Invalid Input");
    }
  }

  async function fethData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/categories",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      setCategoryData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6 mt-6">
        Add Merchandise
      </h2>
      <form onSubmit={handleSubmitMerch}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputMerch}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputMerch}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="imageUrl"
          >
            Image URL:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="imageUrl"
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleInputMerch}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleInputMerch}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMerch;
