import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/leaguestats/$year")({
  component: LeagueStats,
});

function LeagueStats() {
  const [sortedData, setSortedData] = React.useState(null);
  const [orderBy, setOrderBy] = React.useState("desc");

  const { year } = Route.useParams();
  const [oldYear, setOldYear] = React.useState(year);

  let rank = 1;

  const FetchLeagueStats = (year) => {
    return useQuery({
      queryKey: ["league-stats", year],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/leaguestats/${year}`);
        return await res.json();
      },
      enabled: !!year,
    });
  };

  const { data, status } = FetchLeagueStats(year);

  if (status === "pending") return <>Loading..</>;

  if (oldYear !== year) {
    const newArr = data.data.slice();
    setSortedData(newArr);
    setOldYear(year);
  }

  function handleSort(statId) {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
    const newArr = data.data.slice().sort(function (a, b) {
      if (a[statId] < b[statId]) {
        return 1;
      } else {
        return -1;
      }
    });
    setSortedData(newArr);
  }

  //console.table(data.data);

  return (
    <div>
      <TableContainer>
        <Table className="league_leader_table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Player</TableCell>
              <TableCell onClick={() => handleSort(5)}>GP</TableCell>
              <TableCell onClick={() => handleSort(23)}>PTS</TableCell>
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
                  <TableCell>{player[23]}</TableCell>
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
