import { createFileRoute } from "@tanstack/react-router";
import { FetchPlayerBio } from "../queries/playerBio";
import { Separator, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import "./player.css";
import { useState } from "react";

export const Route = createFileRoute("/player")({
  component: Player,
});

function Player() {
  const FetchSplits = (id) => {
    return useQuery({
      queryKey: ["splits", id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/playersplits${id}`);
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

  const [id, setId] = useState("201939");
  const { data: splits, status: splitsStatus } = FetchSplits(id);
  const { data: bio, status: bioStatus } = FetchPlayerBio(id);
  const { data: career, status: careerStatus } = FetchPlayerProfile(id);

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
            <Table.Root size="1">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>TEAM</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>YEAR</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>GP</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>GS</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>MIN</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>PTS</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>AST</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>REB</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>BLK</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>STL</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>TO</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>PF</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>FG</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>FG%</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>3PT</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>3P%</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>FT</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>FT%</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {career.data.map((stat, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.RowHeaderCell>{stat[4]}</Table.RowHeaderCell>
                      <Table.Cell>{stat[1]}</Table.Cell>
                      <Table.Cell>{stat[6]}</Table.Cell>
                      <Table.Cell>{stat[7]}</Table.Cell>
                      <Table.Cell>{(stat[8] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[26] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[21] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[20] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[23] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[22] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[24] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>{(stat[25] / stat[6]).toFixed(1)}</Table.Cell>
                      <Table.Cell>
                        {(stat[9] / stat[6]).toFixed(1)}-
                        {(stat[10] / stat[6]).toFixed(1)}
                      </Table.Cell>
                      <Table.Cell>{(stat[11] * 100).toFixed(1)}</Table.Cell>
                      <Table.Cell>
                        {(stat[12] / stat[6]).toFixed(1)}-
                        {(stat[13] / stat[6]).toFixed(1)}
                      </Table.Cell>
                      <Table.Cell>{(stat[14] * 100).toFixed(1)}</Table.Cell>
                      <Table.Cell>
                        {(stat[15] / stat[6]).toFixed(1)}-
                        {(stat[16] / stat[6]).toFixed(1)}
                      </Table.Cell>
                      <Table.Cell>{(stat[17] * 100).toFixed(1)}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          )}
        </div>

        {splitsStatus === "pending" ? (
          <>Loading splits..</>
        ) : (
          <ul className="profile__shotchart">
            <li>
              <h1>Shot Distance (5ft)</h1>
              <Table.Root size="1">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Shot Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGA</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGM</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FG%</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>eFG%</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {splits.resultSets[1].rowSet.map((shot, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>{shot[1]}</Table.RowHeaderCell>
                        <Table.Cell>{shot[2]}</Table.Cell>
                        <Table.Cell>{shot[3]}</Table.Cell>
                        <Table.Cell>{(shot[4] * 100).toFixed(1)}%</Table.Cell>
                        <Table.Cell>{(shot[8] * 100).toFixed(1)}%</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </li>
            <li>
              <h1>Shot Distance (8ft)</h1>
              <Table.Root size="1">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Shot Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGA</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGM</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FG%</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>eFG%</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {splits.resultSets[2].rowSet.map((shot, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>{shot[1]}</Table.RowHeaderCell>
                        <Table.Cell>{shot[2]}</Table.Cell>
                        <Table.Cell>{shot[3]}</Table.Cell>
                        <Table.Cell>{(shot[4] * 100).toFixed(1)}%</Table.Cell>
                        <Table.Cell>{(shot[8] * 100).toFixed(1)}%</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </li>
            <li>
              <h1>Shot Area</h1>
              <Table.Root size="1">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Shot Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGA</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGM</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FG%</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>eFG%</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {splits.resultSets[3].rowSet.map((shot, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>{shot[1]}</Table.RowHeaderCell>
                        <Table.Cell>{shot[2]}</Table.Cell>
                        <Table.Cell>{shot[3]}</Table.Cell>
                        <Table.Cell>{(shot[4] * 100).toFixed(1)}%</Table.Cell>
                        <Table.Cell>{(shot[8] * 100).toFixed(1)}%</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </li>
            <li>
              <h1>Shot Type Detail</h1>
              <Table.Root size="1">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Shot Type</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGA</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FGM</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>FG%</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>eFG%</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {splits.resultSets[5].rowSet.map((shot, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>{shot[1]}</Table.RowHeaderCell>
                        <Table.Cell>{shot[2]}</Table.Cell>
                        <Table.Cell>{shot[3]}</Table.Cell>
                        <Table.Cell>{(shot[4] * 100).toFixed(1)}%</Table.Cell>
                        <Table.Cell>{(shot[8] * 100).toFixed(1)}%</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Root>
            </li>
          </ul>
        )}
        <div className="profile__box"></div>
      </div>
    </div>
  );
}
