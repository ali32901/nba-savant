import "./MainPage.css";
import React from "react";
import {
  Badge,
  HoverCard,
  Separator,
  SegmentedControl,
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
        const res = await fetch(`http://localhost:8080/api/playerbio/${id}`);
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

  const { data: playerData, isPending: playerPending } =
    FetchPlayerProfile(playerId);

  const { data: playerBio, isPending: playerBioPending } =
    useFetchPlayerBio(playerId);

  if (isPending) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  function handleClick(name, id) {
    console.log(name + " " + id);
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
                    <Badge color="red">{game.gameStatusText}</Badge>
                  ) : (
                    <Badge color="green">
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

          {(playerPending || playerBioPending) && (
            <h2 className="player-bio">...</h2>
          )}
          {playerData && playerBio && (
            <div className="player-profile-container">
              <div className={`player-bio ${playerBio.data[0][19]}`}>
                <h2>{playerName || ""}</h2>
                <p>{`${playerBio.data[0][14]} | ${playerBio.data[0][22]} ${playerBio.data[0][19]} | ${playerBio.data[0][15]}`}</p>
              </div>
              <Separator size="4" />
              <div className="player-profile-stats">
                <p>
                  PPG{" "}
                  <span>
                    {(playerData.data[0][26] / playerData.data[0][2]).toFixed(
                      1
                    )}
                  </span>
                </p>
                <p>
                  APG{" "}
                  <span>
                    {" "}
                    {(playerData.data[0][19] / playerData.data[0][2]).toFixed(
                      1
                    )}
                  </span>
                </p>
                <p>
                  RPG{" "}
                  <span>
                    {" "}
                    {(playerData.data[0][18] / playerData.data[0][2]).toFixed(
                      1
                    )}
                  </span>
                </p>
                <p>
                  FG% <span>{(playerData.data[0][9] * 100).toFixed(1)}</span>
                </p>
                <p>
                  3P% <span>{(playerData.data[0][12] * 100).toFixed(1)}</span>
                </p>
                <p>
                  FT% <span>{(playerData.data[0][15] * 100).toFixed(1)}</span>
                </p>
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
