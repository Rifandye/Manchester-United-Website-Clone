import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditMerchandise() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editInput, setEditInput] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  useEffect(() => {
    async function fetchMerchById() {
      try {
        const response = await axios({
          method: "GET",
          url: import.meta.env.VITE_BASE_URL + `/merchandises/${id}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });

        const { name, description, imageUrl, price } = response.data;
        setEditInput({ name, description, imageUrl, price });
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchMerchById();
  }, [id]);

  function handleInputDataForm(event) {
    const { name, value } = event.target;
    setEditInput({
      ...editInput,
      [name]: value,
    });
  }

  async function editData(event) {
    event.preventDefault();

    try {
      const response = await axios({
        method: "PUT",
        url: import.meta.env.VITE_BASE_URL + `/merchandises/${id}`,
        data: editInput,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(response.data);
      navigate("/merchandises");
    } catch (error) {
      toast.error("Invalid input");
    }
  }

  function handleButton() {
    navigate(`/merchandises/${id}/imgUrl`);
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-center text-2xl font-bold mb-6 mt-6">
        Edit Merchandise
      </h2>
      <form onSubmit={editData}>
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
            value={editInput.name}
            onChange={handleInputDataForm}
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
            value={editInput.description}
            onChange={handleInputDataForm}
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
            value={editInput.imageUrl}
            onChange={handleInputDataForm}
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
            value={editInput.price}
            onChange={handleInputDataForm}
          />
        </div>
        <div className="mb-4 flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              handleButton(editInput.id);
            }}
          >
            Upload Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMerchandise;
