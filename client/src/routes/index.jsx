import "./styles.css";
import React from "react";
import {
  Badge,
  Separator,
  Skeleton,
  Table,
  HoverCard,
  Select,
} from "@radix-ui/themes";
import { FetchScores } from "../queries/scoresQuery";
import { FetchPlayerProfile } from "../queries/playerQuery";
import { FetchPlayerBio } from "../queries/playerBio";
import StandingsTable from "../components/standingstable";
import StatLeader from "../components/StatLeader";
import PlayoffPicture from "../components/PlayoffPicture";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const useFetchActivePlayers = () => {
    return useQuery({
      queryKey: ["active-players"],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/players`);
        return await res.json();
      },
    });
  };

  const [playerId, setPlayerId] = React.useState(
    localStorage.getItem("playerId") || 2544
  );

  const { data, isPending } = FetchScores();

  const { data: playerData, isPending: playerDataPending } =
    FetchPlayerProfile(playerId);

  const { data: playerBio, isPending: playerBioPending } =
    FetchPlayerBio(playerId);

  const { data: activePlayers, isPending: activePlayersPending } =
    useFetchActivePlayers();

  if (isPending) {
    return <>Loading scores...</>;
  }

  function handleClick(id) {
    localStorage.setItem("playerId", id);
    setPlayerId(id);
  }

  return (
    <div className="body">
      <div className="games">
        {data &&
          data.map((game) => {
            return (
              <HoverCard.Root key={game.gameId}>
                <HoverCard.Trigger>
                  <div className="games__item">
                    {game.gameStatusText.includes("Final") ? (
                      <Badge color="red" radius="none">
                        {game.gameStatusText}
                      </Badge>
                    ) : (
                      <Badge color="green" radius="none">
                        {game.period > 0
                          ? game.gameStatusText
                          : new Date(game.gameTimeUTC)
                              .toLocaleTimeString([], {
                                hour12: true,
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                              .replace(/^0(?:0:0?)?/, "")}
                      </Badge>
                    )}
                    <div className="games__team">
                      <div className="games__score">
                        <p>{game.awayTeam.teamName}</p>
                        <p>{game.awayTeam.score}</p>
                      </div>
                      <p className="games__record">
                        ({game.awayTeam.wins}-{game.awayTeam.losses})
                      </p>
                    </div>
                    <div className="games__team">
                      <div className="games__score">
                        <p>{game.homeTeam.teamName}</p>
                        <p>{game.homeTeam.score}</p>
                      </div>
                      <p className="games__record">
                        ({game.homeTeam.wins}-{game.homeTeam.losses})
                      </p>
                    </div>
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Content>
                  <div>
                    <p>{game.gameLeaders.awayLeaders.name}</p>
                    <p>{game.gameLeaders.awayLeaders.teamTricode}</p>
                  </div>
                  <div>
                    <p>PTS: {game.gameLeaders.awayLeaders.points}</p>
                    <p>AST: {game.gameLeaders.awayLeaders.assists}</p>
                    <p>REB: {game.gameLeaders.awayLeaders.rebounds}</p>
                  </div>
                </HoverCard.Content>
              </HoverCard.Root>
            );
          })}
      </div>
      <div className="league">
        <div>
          <StandingsTable conference={"East"} />
        </div>
        <div>
          <StandingsTable conference={"West"} />
        </div>
        {playerDataPending || playerBioPending || activePlayersPending ? (
          <Skeleton>
            <div className="player"></div>
          </Skeleton>
        ) : (
          <div className="player">
            <div
              className={`player__bio player__bio--${
                playerBio.data[0][19] || "freeAgent"
              }`}
            >
              <Select.Root
                size="3"
                value={playerId}
                onValueChange={(value) => {
                  localStorage.setItem("playerId", value.id);
                  setPlayerId(value.id);
                }}
              >
                <Select.Trigger variant="ghost" className="player__select">
                  <h2>{playerBio.data[0][3]}</h2>
                </Select.Trigger>
                <Select.Content>
                  {activePlayers.data.map((player) => {
                    return (
                      <Select.Item
                        value={{ id: player[0], name: player[2] }}
                        key={player[0]}
                      >
                        <h2>{player[2]}</h2>
                      </Select.Item>
                    );
                  })}
                </Select.Content>
              </Select.Root>

              <p>{`${playerBio.data[0][14]} | ${
                playerBio.data[0][22] || "Free Agent"
              } ${playerBio.data[0][19]} | ${playerBio.data[0][15]}`}</p>
            </div>
            <Separator size="4" />
            <div>
              <Table.Root size="1" className="player__table">
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
                  {playerData.data.map((stat, index) => {
                    return (
                      <Table.Row key={index}>
                        <Table.RowHeaderCell>{stat[4]}</Table.RowHeaderCell>
                        <Table.Cell>{stat[1]}</Table.Cell>
                        <Table.Cell>{stat[6]}</Table.Cell>
                        <Table.Cell>{stat[7]}</Table.Cell>
                        <Table.Cell>
                          {(stat[8] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[26] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[21] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[20] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[23] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[22] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[24] / stat[6]).toFixed(1)}
                        </Table.Cell>
                        <Table.Cell>
                          {(stat[25] / stat[6]).toFixed(1)}
                        </Table.Cell>
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
            </div>
          </div>
        )}
        <StatLeader handleClick={handleClick} />
        <div className="playoff">
          <PlayoffPicture />
        </div>
      </div>
    </div>
  );
}

export default Index;
