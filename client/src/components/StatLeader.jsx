import { useQuery } from "@tanstack/react-query";
import { Separator, Skeleton, SegmentedControl } from "@radix-ui/themes";
import "./StatLeader.css";
export default function StatLeader({ sorter, handleClick }) {
  const fetchStats = useQuery({
    queryKey: [`stats${sorter}`],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/dailystats${sorter}`);
      return await res.json();
    },
  });
  const { data, isPending } = fetchStats;

  if (isPending) {
    return <Skeleton height="150px"></Skeleton>;
  }

  function renderLeaderType(player) {
    switch (sorter) {
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

  return (
    <div>
      <div className="leaders-list">
        <Separator size="4" />
        {data.data.slice(0, 5).map((player) => {
          return (
            <>
              <p
                className="leaders-p"
                onClick={() => handleClick(player[2], player[1])}
              >
                {player[2]}
                {renderLeaderType(player)}
              </p>
            </>
          );
        })}
      </div>
      <Separator size="4" />
    </div>
  );
}
