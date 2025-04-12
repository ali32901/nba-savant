import "./MainPage.css";
import React from "react";
import {
  Badge,
  Separator,
  SegmentedControl,
  Skeleton,
  Table,
  HoverCard,
  Select,
} from "@radix-ui/themes";
import { FetchScores } from "./queries/scoresQuery";
import { FetchPlayerProfile } from "./queries/playerQuery";
import StandingsTable from "./components/standingstable";
import StatLeader from "./components/StatLeader";
import { useQuery } from "@tanstack/react-query";

function MainPage() {
  const useFetchPlayerBio = (id) => {
    return useQuery({
      queryKey: ["player-bio", id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/playerbio/${id}`);
        return await res.json();
      },
    });
  };

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
  const [stat, setStat] = React.useState("PTS");

  const { data, isPending } = FetchScores();

  const { data: playerData, isPending: playerDataPending } =
    FetchPlayerProfile(playerId);

  const { data: playerBio, isPending: playerBioPending } =
    useFetchPlayerBio(playerId);

  const { data: activePlayers, isPending: activePlayersPending } =
    useFetchActivePlayers();

  // if (isPending) {
  //   return <></>;
  // }

  function handleClick(name, id) {
    localStorage.setItem("playerId", id);
    setPlayerId(id);
  }

  return (
    <div className="main-page-body">
      <header className="scores-header">
        {data &&
          data.map((game) => {
            return (
              <HoverCard.Root key={game.gameId}>
                <HoverCard.Trigger>
                  <div>
                    <div className="scores">
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
                      <div className="team-score">
                        <div className="away">
                          <p>{game.awayTeam.teamName}</p>
                          <p>{game.awayTeam.score}</p>
                        </div>
                        <p className="record">
                          ({game.awayTeam.wins}-{game.awayTeam.losses})
                        </p>
                      </div>
                      <div className="team-score">
                        <div className="home">
                          <p>{game.homeTeam.teamName}</p>
                          <p>{game.homeTeam.score}</p>
                        </div>
                        <p className="record">
                          ({game.homeTeam.wins}-{game.homeTeam.losses})
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Content>
                  <div className="score-hover">
                    <div className="game-leaders">
                      <div className="game-leaders-name">
                        <p>{game.gameLeaders.awayLeaders.name}</p>
                        <p>{game.gameLeaders.awayLeaders.teamTricode}</p>
                      </div>
                      <Separator size="4" />
                      <div className="game-leaders-stat">
                        <p>PTS: {game.gameLeaders.awayLeaders.points}</p>
                        <Separator orientation="vertical" />
                        <p>AST: {game.gameLeaders.awayLeaders.assists}</p>
                        <Separator orientation="vertical" />
                        <p>REB: {game.gameLeaders.awayLeaders.rebounds}</p>
                      </div>
                      <div className="game-leaders-name">
                        <p>{game.gameLeaders.homeLeaders.name}</p>
                        <p>{game.gameLeaders.homeLeaders.teamTricode}</p>
                      </div>
                      <Separator size="4" />
                      <div className="game-leaders-stat">
                        <p>PTS: {game.gameLeaders.homeLeaders.points}</p>
                        <Separator orientation="vertical" />
                        <p>AST: {game.gameLeaders.homeLeaders.assists}</p>
                        <Separator orientation="vertical" />
                        <p>REB: {game.gameLeaders.homeLeaders.rebounds}</p>
                      </div>
                    </div>
                  </div>
                </HoverCard.Content>
              </HoverCard.Root>
            );
          })}
      </header>
      <div className="content-container">
        <div className="standings-container">
          <StandingsTable conference={"East"} />
          <StandingsTable conference={"West"} />
        </div>
        <div className="leaders-container">
          <SegmentedControl.Root
            defaultValue="PTS"
            onValueChange={(value) => setStat(value)}
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
          <div className="stat-tables">
            <StatLeader sorter={stat} handleClick={handleClick} />
          </div>

          {playerDataPending || playerBioPending || activePlayersPending ? (
            <Skeleton>
              <div className="player-profile-container">
                <h2 className="player-bio"></h2>
                <div className="player-profile-stats"></div>
              </div>
            </Skeleton>
          ) : (
            <div className="player-profile-container">
              <div className={`player-bio ${playerBio.data[0][19]}`}>
                <Select.Root
                  size="3"
                  value={playerId}
                  onValueChange={(value) => {
                    localStorage.setItem("playerId", value.id);
                    setPlayerId(value.id);
                  }}
                >
                  <Select.Trigger variant="ghost" className="select-trigger">
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

                <p>{`${playerBio.data[0][14]} | ${playerBio.data[0][22]} ${playerBio.data[0][19]} | ${playerBio.data[0][15]}`}</p>
              </div>
              <Separator size="4" />
              <div className="player-careerstats">
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
                    {playerData.data.map((stat) => {
                      return (
                        <Table.Row key={stat[1]}>
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
          <Separator size="4" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
