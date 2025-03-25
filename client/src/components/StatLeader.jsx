import { useQuery } from "@tanstack/react-query";
import { Separator } from "@radix-ui/themes";
import "./StatLeader.css";
export default function StatLeader({ id, statType }) {
  const fetchStats = useQuery({
    queryKey: [`stats${id}`],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/api/dailystats${id}`);
      return await res.json();
    },
  });
  const { data, isPending } = fetchStats;

  if (isPending) {
    return <h2>Loading..</h2>;
  }

  console.log(data);

  return (
    <div className="leaders-list">
      <h2>{statType}</h2>
      <Separator size="4" />
      {data.data.map((player) => {
        return (
          <>
            <p className="leaders-p">
              <span>{player[2]}</span>
              <span>{player[8]}</span>
            </p>
            <Separator size="4" />
          </>
        );
      })}
    </div>
  );
}
