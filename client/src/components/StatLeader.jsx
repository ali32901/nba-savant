import { useQuery } from "@tanstack/react-query";
import { SegmentedControl } from "@radix-ui/themes";
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

      <SegmentedControl.Root
        defaultValue={seasonType}
        size="1"
        radius="none"
        onValueChange={(value) => setSeasonType(value)}
      >
        <SegmentedControl.Item value="Regular Season">
          Regular Season
        </SegmentedControl.Item>
        <SegmentedControl.Item value="Playoffs">Playoffs</SegmentedControl.Item>
      </SegmentedControl.Root>

      <SegmentedControl.Root
        defaultValue="PTS"
        onValueChange={(value) => setSort(value)}
        size="1"
        radius="none"
      >
        <SegmentedControl.Item value="PTS">Points</SegmentedControl.Item>
        <SegmentedControl.Item value="AST">Assists</SegmentedControl.Item>
        <SegmentedControl.Item value="REB">Rebounds</SegmentedControl.Item>
        <SegmentedControl.Item value="STL">Steals</SegmentedControl.Item>
        <SegmentedControl.Item value="BLK">Blocks</SegmentedControl.Item>
        <SegmentedControl.Item value="FG3M">Threes</SegmentedControl.Item>
      </SegmentedControl.Root>
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
