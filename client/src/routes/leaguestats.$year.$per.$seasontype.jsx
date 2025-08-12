import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import "./leaguestats.css";

export const Route = createFileRoute("/leaguestats/$year/$per/$seasontype")({
  component: LeagueStats,
});

function LeagueStats() {
  const navigate = useNavigate();

  const [sortedData, setSortedData] = React.useState(null);
  const [orderBy, setOrderBy] = React.useState("desc");
  const params = Route.useParams();

  let rank = 1;
  const FetchLeagueStats = (year, per, seasontype) => {
    return useQuery({
      queryKey: ["league-stats", year, per, seasontype],
      queryFn: async () => {
        const res = await fetch(
          `http://localhost:8080/leaguestats/${year}/${per}/${seasontype}`
        );
        return await res.json();
      },
      enabled: !!year,
    });
  };

  const { data, status } = FetchLeagueStats(
    params.year,
    params.per,
    params.seasontype
  );

  //Make sure data is fetched
  if (status === "pending") return <></>;

  function handleSort(statId) {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
    const newArr = data.data.slice().sort(function (a, b) {
      if (orderBy === "desc" ? a[statId] < b[statId] : a[statId] > b[statId]) {
        return 1;
      } else {
        return -1;
      }
    });
    setSortedData(newArr);
  }

  function optionYears() {
    const optionYearsArr = [];
    for (let i = 2025; i > 1946; i--) {
      optionYearsArr.push(
        <option value={`${i - 1}-${String(i).slice(2)}`}>
          {i - 1}-{i}
        </option>
      );
    }

    return optionYearsArr;
  }

  // console.table(data.data);

  return (
    <div>
      <div className="selects">
        <select
          name="years"
          id="selects__years"
          onChange={(e) =>
            navigate({
              to: `/leaguestats/${e.target.value}/${params.per}/${params.seasontype}`,
            })
          }
          defaultValue={params.year}
        >
          {optionYears()}
        </select>

        <select
          name="per"
          id="selects__per"
          onChange={(e) =>
            navigate({
              to: `/leaguestats/${params.year}/${e.target.value}/${params.seasontype}`,
            })
          }
          defaultValue={params.per}
        >
          <option value="Totals">Totals</option>
          <option value="PerGame">Per Game</option>
          <option value="Per48">Per 48</option>
        </select>

        <select
          name="seasontype"
          id="selects__seasontype"
          onChange={(e) =>
            navigate({
              to: `/leaguestats/${params.year}/${params.per}/${e.target.value}`,
            })
          }
          defaultValue={params.seasontype}
        >
          <option value="Regular Season">Regular Season</option>
          <option value="Playoffs">Playoffs</option>
          <option value="Pre Season">Pre Season</option>
        </select>
      </div>
      <TableContainer>
        <Table className="league_leader_table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Player</TableCell>
              <TableCell onClick={() => handleSort(5)}>GP</TableCell>
              <TableCell
                onClick={() => handleSort(params.per === "PerGame" ? 23 : 24)}
              >
                PTS
              </TableCell>
              <TableCell onClick={() => handleSort(19)}>AST</TableCell>
              <TableCell onClick={() => handleSort(18)}>REB</TableCell>
              <TableCell onClick={() => handleSort(21)}>BLK</TableCell>
              <TableCell onClick={() => handleSort(20)}>STL</TableCell>
              <TableCell onClick={() => handleSort(22)}>TO</TableCell>
              <TableCell onClick={() => handleSort(7)}>FGM</TableCell>
              <TableCell onClick={() => handleSort(8)}>FGA</TableCell>
              <TableCell onClick={() => handleSort(9)}>FG%</TableCell>
              <TableCell onClick={() => handleSort(10)}>3PM</TableCell>
              <TableCell onClick={() => handleSort(11)}>3PA</TableCell>
              <TableCell onClick={() => handleSort(12)}>3P%</TableCell>
              <TableCell onClick={() => handleSort(13)}>FTA</TableCell>
              <TableCell onClick={() => handleSort(14)}>FTM</TableCell>
              <TableCell onClick={() => handleSort(15)}>FT%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(sortedData ? sortedData : data.data).map((player) => {
              return (
                <TableRow>
                  <TableCell>{rank++}</TableCell>
                  <TableCell>{player[2]}</TableCell>
                  <TableCell>{player[5]}</TableCell>
                  <TableCell>
                    {params.per === "PerGame" ? player[23] : player[24]}
                  </TableCell>
                  <TableCell>{player[19]}</TableCell>
                  <TableCell>{player[18]}</TableCell>
                  <TableCell>{player[21]}</TableCell>
                  <TableCell>{player[20]}</TableCell>
                  <TableCell>{player[22]}</TableCell>
                  <TableCell>{player[7]}</TableCell>
                  <TableCell>{player[8]}</TableCell>
                  <TableCell>{(player[9] * 100).toFixed(1)}</TableCell>
                  <TableCell>{player[10]}</TableCell>
                  <TableCell>{player[11]}</TableCell>
                  <TableCell>{(player[12] * 100).toFixed(1)}</TableCell>
                  <TableCell>{player[13]}</TableCell>
                  <TableCell>{player[14]}</TableCell>
                  <TableCell>{(player[15] * 100).toFixed(1)}</TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
