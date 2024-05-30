import { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [newsData, setNewsData] = useState([]);

  async function fetchData() {
    try {
      const response = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "/pub/news/premiereLeague",
      });

      console.log(response.data);
      setNewsData(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={news.news_img}
              alt={news.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4">{news.short_desc}</p>
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-500 hover:text-blue-700 font-medium"
              >
                Read more &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
