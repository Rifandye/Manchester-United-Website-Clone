import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Category() {
  const [categoryData, setCategoryData] = useState([]);

  async function fethData() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/categories",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });

      console.log(data);
      setCategoryData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  return (
    <div className="flex justify-center">
      <table className="table-auto mt-8">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((category) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/categories/${category.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  See Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
