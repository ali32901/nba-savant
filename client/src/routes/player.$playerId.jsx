import { createFileRoute } from "@tanstack/react-router";
import { FetchPlayerBio } from "../queries/playerBio";
import { useQuery } from "@tanstack/react-query";
import "./player.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

export const Route = createFileRoute("/player/$playerId")({
  component: Player,
});

function Player() {
  const { playerId } = Route.useParams();

  const FetchSplits = (id) => {
    return useQuery({
      queryKey: ["splits", id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/playersplits/${id}`);
        return await res.json();
      },
      enabled: !!id,
    });
  };

  const FetchPlayerProfile = (id) => {
    return useQuery({
      queryKey: ["career-stats", id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/careerstats/${id}`);
        return await res.json();
      },
      enabled: !!id,
    });
  };

  const { data: splits, status: splitsStatus } = FetchSplits(playerId);
  const { data: bio, status: bioStatus } = FetchPlayerBio(playerId);
  const { data: career, status: careerStatus } = FetchPlayerProfile(playerId);

  return (
    <div className="profile">
      <div className="profile__grid">
        <div className="profile__career">
          {bioStatus === "pending" ? (
            <>Loading Bio...</>
          ) : (
            <div className={`profile__bio`}>
              <div className={`profile__border  ${bio.data[0][19]}`}></div>
              <h1>{bio.data[0][3]}</h1>
              <p>{`${bio.data[0][14]} | ${
                bio.data[0][22] || "Free Agent"
              } ${bio.data[0][19]} | ${bio.data[0][15]}`}</p>
              <p>
                {bio.data[0][11]} | {bio.data[0][12]}lb
              </p>
              <div className={`profile__border  ${bio.data[0][19]}`}></div>
            </div>
          )}
          {careerStatus === "pending" ? (
            <>Loading career...</>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell>YEAR</TableCell>
                    <TableCell>GP</TableCell>
                    <TableCell>GS</TableCell>
                    <TableCell>MIN</TableCell>
                    <TableCell>PTS</TableCell>
                    <TableCell>AST</TableCell>
                    <TableCell>REB</TableCell>
                    <TableCell>BLK</TableCell>
                    <TableCell>STL</TableCell>
                    <TableCell>TO</TableCell>
                    <TableCell>PF</TableCell>
                    <TableCell>FG</TableCell>
                    <TableCell>FG%</TableCell>
                    <TableCell>3PT</TableCell>
                    <TableCell>3P%</TableCell>
                    <TableCell>FT</TableCell>
                    <TableCell>FT%</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {career.data.map((stat, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{stat[4]}</TableCell>
                        <TableCell>{stat[1]}</TableCell>
                        <TableCell>{stat[6]}</TableCell>
                        <TableCell>{stat[7]}</TableCell>
                        <TableCell>{(stat[8] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[26] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[21] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[20] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[23] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[22] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[24] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>{(stat[25] / stat[6]).toFixed(1)}</TableCell>
                        <TableCell>
                          {(stat[9] / stat[6]).toFixed(1)}-
                          {(stat[10] / stat[6]).toFixed(1)}
                        </TableCell>
                        <TableCell>{(stat[11] * 100).toFixed(1)}</TableCell>
                        <TableCell>
                          {(stat[12] / stat[6]).toFixed(1)}-
                          {(stat[13] / stat[6]).toFixed(1)}
                        </TableCell>
                        <TableCell>{(stat[14] * 100).toFixed(1)}</TableCell>
                        <TableCell>
                          {(stat[15] / stat[6]).toFixed(1)}-
                          {(stat[16] / stat[6]).toFixed(1)}
                        </TableCell>
                        <TableCell>{(stat[17] * 100).toFixed(1)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>

        {splitsStatus === "pending" ? (
          <>Loading splits..</>
        ) : (
          <ul className="profile__shotchart">
            <li>
              <h1>Shot Distance (5ft)</h1>
              <h2>{splits.parameters.Season}</h2>
              <TableContainer>
                <Table size="1">
                  <TableHead>
                    <TableRow>
                      <TableCell>Shot Type</TableCell>
                      <TableCell>FGA</TableCell>
                      <TableCell>FGM</TableCell>
                      <TableCell>FG%</TableCell>
                      <TableCell>eFG%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {splits.resultSets[1].rowSet.map((shot, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{shot[1]}</TableCell>
                          <TableCell>{shot[2]}</TableCell>
                          <TableCell>{shot[3]}</TableCell>
                          <TableCell>{(shot[4] * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(shot[8] * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </li>
            <li>
              <h1>Shot Distance (8ft)</h1>
              <h2>{splits.parameters.Season}</h2>
              <TableContainer>
                <Table size="1">
                  <TableHead>
                    <TableRow>
                      <TableCell>Shot Type</TableCell>
                      <TableCell>FGA</TableCell>
                      <TableCell>FGM</TableCell>
                      <TableCell>FG%</TableCell>
                      <TableCell>eFG%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {splits.resultSets[2].rowSet.map((shot, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{shot[1]}</TableCell>
                          <TableCell>{shot[2]}</TableCell>
                          <TableCell>{shot[3]}</TableCell>
                          <TableCell>{(shot[4] * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(shot[8] * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </li>
            <li>
              <h1>Shot Area</h1>
              <h2>{splits.parameters.Season}</h2>
              <TableContainer>
                <Table size="1">
                  <TableHead>
                    <TableRow>
                      <TableCell>Shot Type</TableCell>
                      <TableCell>FGA</TableCell>
                      <TableCell>FGM</TableCell>
                      <TableCell>FG%</TableCell>
                      <TableCell>eFG%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {splits.resultSets[3].rowSet.map((shot, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{shot[1]}</TableCell>
                          <TableCell>{shot[2]}</TableCell>
                          <TableCell>{shot[3]}</TableCell>
                          <TableCell>{(shot[4] * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(shot[8] * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </li>
            <li>
              <h1>Shot Type Detail</h1>
              <h2>{splits.parameters.Season}</h2>
              <TableContainer>
                <Table size="1">
                  <TableHead>
                    <TableRow>
                      <TableCell>Shot Type</TableCell>
                      <TableCell>FGA</TableCell>
                      <TableCell>FGM</TableCell>
                      <TableCell>FG%</TableCell>
                      <TableCell>eFG%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {splits.resultSets[5].rowSet.map((shot, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{shot[1]}</TableCell>
                          <TableCell>{shot[2]}</TableCell>
                          <TableCell>{shot[3]}</TableCell>
                          <TableCell>{(shot[4] * 100).toFixed(1)}%</TableCell>
                          <TableCell>{(shot[8] * 100).toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </li>
          </ul>
        )}
        <div className="profile__box"></div>
      </div>
    </div>
  );
}
