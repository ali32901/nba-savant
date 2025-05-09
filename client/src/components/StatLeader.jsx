import { useQuery } from "@tanstack/react-query";
import "./StatLeader.css";
import { useState } from "react";

export default function StatLeader() {
  const [sort, setSort] = useState("PTS");
  const [seasonType, setSeasonType] = useState("Regular Season");

  const fetchStats = useQuery({
    queryKey: [`stats`, seasonType],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/leaders${seasonType}`);
      return await res.json();
    },
  });
  const { data, isPending } = fetchStats;

  if (isPending) {
    return <p>Loading leaders..</p>;
  }

  function renderLeaderType(player) {
    switch (sort) {
      case "PTS":
        return <span>{player[28]}</span>;
      case "REB":
        return <span>{player[22]}</span>;
      case "AST":
        return <span>{player[23]}</span>;
      case "STL":
        return <span>{player[24]}</span>;
      case "BLK":
        return <span>{player[25]}</span>;
      case "FG3M":
        return <span>{player[14]}</span>;
    }
  }

  function sortData(sorter) {
    switch (sorter) {
      case "PTS":
        dataCopy.sort((a, b) => b[28] - a[28]);
        break;
      case "REB":
        dataCopy.sort((a, b) => b[22] - a[22]);
        break;
      case "AST":
        dataCopy.sort((a, b) => b[23] - a[23]);
        break;
      case "STL":
        dataCopy.sort((a, b) => b[24] - a[24]);
        break;
      case "BLK":
        dataCopy.sort((a, b) => b[25] - a[25]);
        break;
      case "FG3M":
        dataCopy.sort((a, b) => b[14] - a[14]);
        break;
    }
  }

  let dataCopy = structuredClone(data.data);
  sortData(sort);
  return (
    <div className="leaders">
      <h1 className="leaders__header">Season Game Highs</h1>
      <div>
        <button onClick={() => setSeasonType("Regular Season")}>
          Regular Season
        </button>
        <button onClick={() => setSeasonType("Playoffs")}>Playoffs</button>
      </div>
      <div>
        <button onClick={() => setSort("PTS")}>Points</button>
        <button onClick={() => setSort("AST")}>Assists</button>
        <button onClick={() => setSort("REB")}>Rebounds</button>
        <button onClick={() => setSort("STL")}>Steals</button>
        <button onClick={() => setSort("BLK")}>Blocks</button>
        <button onClick={() => setSort("FG3M")}>Threes</button>
      </div>
      <ol>
        {dataCopy.slice(0, 10).map((player, index) => {
          return (
            <li key={index}>
              <span className="leaders__player">
                {player[2]}
                {renderLeaderType(player)}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
