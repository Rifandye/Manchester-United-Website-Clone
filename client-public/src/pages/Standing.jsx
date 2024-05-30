import { useEffect, useState } from "react";
import axios from "axios";

function Standing() {
  const [standingData, setStandingData] = useState([]);
  async function fethData() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/pub/standing/premiereLeague"
      );
      if (Array.isArray(response.data) && response.data.length > 0) {
        const standings = response.data[0];
        const flattenedStandings = standings.reduce(
          (acc, curr) => acc.concat(curr),
          []
        );
        setStandingData(flattenedStandings);
      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fethData();
  }, []);

  return (
    <div className="flex justify-center mt-8 mb-20">
      <div className="w-full lg:w-3/4 xl:w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Premier League Standings
        </h2>
        {standingData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="w-1/12 p-3 border border-gray-300">Rank</th>
                  <th className="w-3/12 p-3 border border-gray-300">Team</th>
                  <th className="w-2/12 p-3 border border-gray-300">Logo</th>
                  <th className="w-1/12 p-3 border border-gray-300">Points</th>
                  <th className="w-1/12 p-3 border border-gray-300">Played</th>
                  <th className="w-1/12 p-3 border border-gray-300">Wins</th>
                  <th className="w-1/12 p-3 border border-gray-300">Draws</th>
                  <th className="w-1/12 p-3 border border-gray-300">Losses</th>
                  <th className="w-1/12 p-3 border border-gray-300">
                    Goals For
                  </th>
                  <th className="w-1/12 p-3 border border-gray-300">
                    Goals Against
                  </th>
                </tr>
              </thead>
              <tbody>
                {standingData.map((standing, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="p-3 border border-gray-300">
                      {standing.rank}
                    </td>
                    <td className="p-3 border border-gray-300">
                      <div className="flex items-center">
                        {standing.team && (
                          <img
                            src={standing.team.logo}
                            alt={standing.team.name}
                            className="w-6 h-6 mr-2 rounded-full"
                          />
                        )}
                        {standing.team && standing.team.name}
                      </div>
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.team && (
                        <img
                          src={standing.team.logo}
                          alt={standing.team.name}
                          className="h-8 rounded-lg"
                        />
                      )}
                    </td>
                    <td className="p-3 border border-gray-300 font-semibold">
                      {standing.points}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.all && standing.all.played}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.all && standing.all.win}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.all && standing.all.draw}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.all && standing.all.lose}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.all &&
                        standing.all.goals &&
                        standing.all.goals.for}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {standing.all &&
                        standing.all.goals &&
                        standing.all.goals.against}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Standing;
