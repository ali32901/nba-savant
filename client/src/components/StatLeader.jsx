import { useQuery } from "@tanstack/react-query";
import { Separator } from "@radix-ui/themes";
import "./StatLeader.css";
export default function StatLeader({ sorter, category, date }) {
  const fetchStats = useQuery({
    queryKey: [`stats${sorter}`, date],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:8080/api/dailystats${sorter}/${date}`
      );
      return await res.json();
    },
  });
  const { data, isPending } = fetchStats;

  if (isPending) {
    return <h2>Loading..</h2>;
  }

  function renderLeaderSwitch(player) {
    switch (category) {
      case "Points":
        return <span>{player[28]}</span>;
      case "Rebounds":
        return <span>{player[22]}</span>;
      case "Assists":
        return <span>{player[23]}</span>;
      case "Steals":
        return <span>{player[24]}</span>;
      case "Blocks":
        return <span>{player[25]}</span>;
    }
  }

  return (
    <div className="leaders-list">
      <h2>{category}</h2>
      <Separator size="4" />
      {data.data.slice(0, 5).map((player) => {
        return (
          <>
            <p className="leaders-p">
              {player[2]}
              {/* <span>{player[28]}</span> */}
              {renderLeaderSwitch(player)}
            </p>
            <Separator size="4" />
          </>
        );
      })}
    </div>
  );
}
