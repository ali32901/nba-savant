import "./MainPage.css";
import React from "react";
import {
  Badge,
  Separator,
  SegmentedControl,
  Skeleton,
  Table,
} from "@radix-ui/themes";
import { FetchScores } from "./queries/scoresQuery";
import { FetchPlayerProfile } from "./queries/playerQuery";
import StandingsTable from "./components/standingstable";
import StatLeader from "./components/StatLeader";
import { useQuery } from "@tanstack/react-query";

function MainPage() {
  const useFetchPlayerBio = (id) => {
    return useQuery({
      queryKey: ["playerbio", id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/playerbio/${id}`);
        return await res.json();
      },
    });
  };

  const [playerName, setPlayerName] = React.useState(
    localStorage.getItem("player") || "LeBron James"
  );
  const [playerId, setPlayerId] = React.useState(
    localStorage.getItem("playerId") || 2544
  );
  const [stat, setStat] = React.useState("PTS");

  const { data, isPending } = FetchScores();

  const { data: playerData, isPending: playerDataPending } =
    FetchPlayerProfile(playerId);

  const { data: playerBio, isPending: playerBioPending } =
    useFetchPlayerBio(playerId);

  if (isPending) {
    return <></>;
  }

  function handleClick(name, id) {
    localStorage.setItem("player", name);
    localStorage.setItem("playerId", id);
    setPlayerName(name);
    setPlayerId(id);
  }

  return (
    <div className="main-page-body">
      <header className="boxscores-container">
        {data &&
          data.map((game) => {
            return (
              <div key={game.gameId}>
                <div className="boxscore">
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

          {playerDataPending || playerBioPending ? (
            <Skeleton>
              <div className="player-profile-container">
                <h2 className="player-bio"></h2>
                <div className="player-profile-stats"></div>
              </div>
            </Skeleton>
          ) : (
            <div className="player-profile-container">
              <div className={`player-bio ${playerBio.data[0][19]}`}>
                <h2>{playerName || ""}</h2>
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
                        <Table.Row>
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
