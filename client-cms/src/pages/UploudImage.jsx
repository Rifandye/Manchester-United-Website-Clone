import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UploadImage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgFile, setImgFile] = useState();
  const [imageData, setImageData] = useState([]);
  const [imgPreview, setImgPreview] = useState(null);

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
        setImageData(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchMerchById();
  }, [id]);

  function handleFileSubmit(event) {
    const file = event.target.files[0];
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  }

  async function uploadImage(event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", imgFile);

      const response = await axios({
        method: "PATCH",
        url: import.meta.env.VITE_BASE_URL + `/merchandises/${id}/imgUrl`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      navigate("/merchandises");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-20">
      <div className="mb-8">
        {imgPreview && (
          <img
            src={imgPreview}
            alt="Preview"
            className="max-w-xs mx-auto rounded-lg shadow-md"
          />
        )}
        {!imgPreview && (
          <img
            src={imageData.imageUrl}
            alt="Existing Image"
            className="max-w-xs mx-auto rounded-lg shadow-md"
          />
        )}
      </div>
      <div className="mb-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSubmit}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
          Choose File
        </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        onClick={uploadImage}
      >
        Upload Image
      </button>
    </div>
  );
}

export default UploadImage;
