import { useEffect, useState } from "react";
import axios from "axios";

function Standing() {
  const [standingData, setStandingData] = useState([]);
  async function fethData() {
    try {
      const response = await axios.get("http://localhost:3000/pub/standings");
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
    <div className="flex justify-center mt-8">
      <div className="w-full lg:w-3/4 xl:w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Premier League Standings
        </h2>
        {standingData.length > 0 ? (
          <table className="w-full border-collapse border border-gray-400 mb-8">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">Rank</th>
                <th className="border border-gray-400 px-4 py-2">Team</th>
                <th className="border border-gray-400 px-4 py-2">Logo</th>
                <th className="border border-gray-400 px-4 py-2">Points</th>
                <th className="border border-gray-400 px-4 py-2">Played</th>
                <th className="border border-gray-400 px-4 py-2">Wins</th>
                <th className="border border-gray-400 px-4 py-2">Draws</th>
                <th className="border border-gray-400 px-4 py-2">Losses</th>
                <th className="border border-gray-400 px-4 py-2">Goals For</th>
                <th className="border border-gray-400 px-4 py-2">
                  Goals Against
                </th>
              </tr>
            </thead>
            <tbody>
              {standingData.map((standing, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.rank}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <div className="flex items-center">
                      {standing.team && (
                        <img
                          src={standing.team.logo}
                          alt={standing.team.name}
                          className="w-6 h-6 mr-2"
                        />
                      )}
                      {standing.team && standing.team.name}
                    </div>
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.team && (
                      <img
                        src={standing.team.logo}
                        alt={standing.team.name}
                        className="w-8 h-8"
                      />
                    )}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.points}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.all && standing.all.played}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.all && standing.all.win}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.all && standing.all.draw}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.all && standing.all.lose}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.all &&
                      standing.all.goals &&
                      standing.all.goals.for}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {standing.all &&
                      standing.all.goals &&
                      standing.all.goals.against}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Standing;
