import { createFileRoute } from "@tanstack/react-router";
import { FetchPlayerBio } from "../queries/playerBio";
import { useQuery } from "@tanstack/react-query";
import "./player.css";

export const Route = createFileRoute("/player/$playerId")({
  component: Player,
});

function Player() {
  const FetchSplits = (playerId) => {
    return useQuery({
      queryKey: ["splits", playerId],
      queryFn: async () => {
        const res = await fetch(
          `http://localhost:8080/playersplits${playerId}`
        );
        return await res.json();
      },
      enabled: !!playerId,
    });
  };

  const FetchPlayerProfile = (playerId) => {
    return useQuery({
      queryKey: ["career-stats", playerId],
      queryFn: async () => {
        const res = await fetch(
          `http://localhost:8080/careerstats/${playerId}`
        );
        return await res.json();
      },
      enabled: !!playerId,
    });
  };

  const { playerId } = Route.useParams();
  console.log(playerId);
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
            <div className={`profile__bio ${bio.data[0][19]}`}>
              <h1>{bio.data[0][3]}</h1>
              <p>{`${bio.data[0][14]} | ${
                bio.data[0][22] || "Free Agent"
              } ${bio.data[0][19]} | ${bio.data[0][15]}`}</p>
              <p>
                {bio.data[0][8]} | {bio.data[0][9]}
              </p>
              <p>
                {bio.data[0][11]} | {bio.data[0][12]}lb | {bio.data[0][13]}{" "}
                Years
              </p>
            </div>
          )}
          {careerStatus === "pending" ? (
            <>Loading career...</>
          ) : (
            <table size="1" className="">
              <thead>
                <tr>
                  <th>TEAM</th>
                  <th>YEAR</th>
                  <th>GP</th>
                  <th>GS</th>
                  <th>MIN</th>
                  <th>PTS</th>
                  <th>AST</th>
                  <th>REB</th>
                  <th>BLK</th>
                  <th>STL</th>
                  <th>TO</th>
                  <th>PF</th>
                  <th>FG</th>
                  <th>FG%</th>
                  <th>3PT</th>
                  <th>3P%</th>
                  <th>FT</th>
                  <th>FT%</th>
                </tr>
              </thead>
              <tbody>
                {career.data.map((stat, index) => {
                  return (
                    <tr key={index}>
                      <td>{stat[4]}</td>
                      <td>{stat[1]}</td>
                      <td>{stat[6]}</td>
                      <td>{stat[7]}</td>
                      <td>{(stat[8] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[26] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[21] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[20] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[23] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[22] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[24] / stat[6]).toFixed(1)}</td>
                      <td>{(stat[25] / stat[6]).toFixed(1)}</td>
                      <td>
                        {(stat[9] / stat[6]).toFixed(1)}-
                        {(stat[10] / stat[6]).toFixed(1)}
                      </td>
                      <td>{(stat[11] * 100).toFixed(1)}</td>
                      <td>
                        {(stat[12] / stat[6]).toFixed(1)}-
                        {(stat[13] / stat[6]).toFixed(1)}
                      </td>
                      <td>{(stat[14] * 100).toFixed(1)}</td>
                      <td>
                        {(stat[15] / stat[6]).toFixed(1)}-
                        {(stat[16] / stat[6]).toFixed(1)}
                      </td>
                      <td>{(stat[17] * 100).toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {splitsStatus === "pending" ? (
          <>Loading splits..</>
        ) : (
          <ul className="profile__shotchart">
            <li>
              <h1>Shot Distance (5ft)</h1>
              <h2>{splits.parameters.Season}</h2>
              <table size="1">
                <thead>
                  <tr>
                    <th>Shot Type</th>
                    <th>FGA</th>
                    <th>FGM</th>
                    <th>FG%</th>
                    <th>eFG%</th>
                  </tr>
                </thead>
                <tbody>
                  {splits.resultSets[1].rowSet.map((shot, index) => {
                    return (
                      <tr key={index}>
                        <td>{shot[1]}</td>
                        <td>{shot[2]}</td>
                        <td>{shot[3]}</td>
                        <td>{(shot[4] * 100).toFixed(1)}%</td>
                        <td>{(shot[8] * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
            <li>
              <h1>Shot Distance (8ft)</h1>
              <h2>{splits.parameters.Season}</h2>
              <table size="1">
                <thead>
                  <tr>
                    <th>Shot Type</th>
                    <th>FGA</th>
                    <th>FGM</th>
                    <th>FG%</th>
                    <th>eFG%</th>
                  </tr>
                </thead>
                <tbody>
                  {splits.resultSets[2].rowSet.map((shot, index) => {
                    return (
                      <tr key={index}>
                        <td>{shot[1]}</td>
                        <td>{shot[2]}</td>
                        <td>{shot[3]}</td>
                        <td>{(shot[4] * 100).toFixed(1)}%</td>
                        <td>{(shot[8] * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
            <li>
              <h1>Shot Area</h1>
              <h2>{splits.parameters.Season}</h2>
              <table size="1">
                <thead>
                  <tr>
                    <th>Shot Type</th>
                    <th>FGA</th>
                    <th>FGM</th>
                    <th>FG%</th>
                    <th>eFG%</th>
                  </tr>
                </thead>
                <tbody>
                  {splits.resultSets[3].rowSet.map((shot, index) => {
                    return (
                      <tr key={index}>
                        <td>{shot[1]}</td>
                        <td>{shot[2]}</td>
                        <td>{shot[3]}</td>
                        <td>{(shot[4] * 100).toFixed(1)}%</td>
                        <td>{(shot[8] * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
            <li>
              <h1>Shot Type Detail</h1>
              <h2>{splits.parameters.Season}</h2>
              <table size="1">
                <thead>
                  <tr>
                    <th>Shot Type</th>
                    <th>FGA</th>
                    <th>FGM</th>
                    <th>FG%</th>
                    <th>eFG%</th>
                  </tr>
                </thead>
                <tbody>
                  {splits.resultSets[5].rowSet.map((shot, index) => {
                    return (
                      <tr key={index}>
                        <td>{shot[1]}</td>
                        <td>{shot[2]}</td>
                        <td>{shot[3]}</td>
                        <td>{(shot[4] * 100).toFixed(1)}%</td>
                        <td>{(shot[8] * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </li>
          </ul>
        )}
        <div className="profile__box"></div>
      </div>
    </div>
  );
}
