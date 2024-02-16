import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SeeDetail() {
  const [categoryData, setCategoryData] = useState([]);
  const { id } = useParams();

  async function fethData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: `http://localhost:3000/categories/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(data);
      const merchandiseData = data.flatMap((category) =>
        category.Merchandise_Categories.map((item) => item.Merchandise)
      );
      setCategoryData(merchandiseData);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fethData();
  }, [id]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-semibold mb-10">
        All Merchandise in this Category
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {categoryData.map((merchandise) => (
          <div
            key={merchandise.id}
            className="bg-white overflow-hidden shadow-md rounded-lg text-center"
          >
            <img
              className="w-full h-40 object-contain rounded-t-lg"
              src={merchandise.imageUrl}
              alt={merchandise.name}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {merchandise.name}
              </h3>
              <p className="text-gray-700 text-base mb-3">
                {merchandise.description}
              </p>
              <p className="mt-2 text-gray-900">Price: ${merchandise.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeeDetail;
