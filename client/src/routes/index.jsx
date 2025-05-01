import "./styles.css";
import React from "react";
import {
  Badge,
  Separator,
  Skeleton,
  HoverCard,
  Select,
} from "@radix-ui/themes";
import { FetchScores } from "../queries/scoresQuery";
import { FetchPlayerBio } from "../queries/playerBio";
import StandingsTable from "../components/standingstable";
import StatLeader from "../components/StatLeader";
import PlayoffPicture from "../components/PlayoffPicture";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [playerId, setPlayerId] = React.useState(
    localStorage.getItem("playerId") || 2544
  );

  const { data, isPending } = FetchScores();

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
        <StandingsTable conference={"East"} />
        <StandingsTable conference={"West"} />
        <StatLeader handleClick={handleClick} />
        <div className="playoff">
          <PlayoffPicture />
        </div>
      </div>
    </div>
  );
}

export default Index;
