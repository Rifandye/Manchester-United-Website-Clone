import { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [newsData, setNewsData] = useState([]);
  async function fethData() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/pub/news",
      });

      //   console.log(response.data);
      setNewsData(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={news.news_img}
              alt={news.title}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
              <p className="text-gray-600">{news.short_desc}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
