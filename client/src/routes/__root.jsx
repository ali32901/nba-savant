import * as React from "react";
import {
  Outlet,
  createRootRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FetchScores } from "../queries/scoresQuery";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, TextField } from "@mui/material";
import "./__root.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const FetchActivePlayers = () => {
    return useQuery({
      queryKey: ["active-players"],
      queryFn: async () => {
        const res = await fetch(`http://localhost:8080/activeplayers`);
        return await res.json();
      },
    });
  };

  const { data, status } = FetchScores();
  const { data: activePlayers, status: activePlayersStatus } =
    FetchActivePlayers();

  const date = new Date();
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header__links">
        <Link to="/">
          <h1>nba savant</h1>
        </Link>
        <div className="nav">
          {activePlayersStatus === "pending" ? (
            <></>
          ) : (
            <Autocomplete
              className="header__autocomplete"
              onChange={(event, newValue) =>
                navigate({ to: `/player/${newValue.id}` })
              }
              options={activePlayers.data.map((player) => ({
                label: player[1],
                id: player[0],
              }))}
              renderInput={(params) => (
                <TextField {...params} label="View Player Profile" />
              )}
            />
          )}
        </div>
      </div>
      <div className="games">
        <div className="games__date">
          {date.getMonth() + 1}/{date.getDate()}
        </div>
        {status === "pending" ? (
          <>Loading...</>
        ) : (
          data.map((game) => {
            return (
              <div key={game.gameId}>
                <div className="games__item">
                  {game.gameStatusText.includes("Final") ? (
                    <div>{game.gameStatusText}</div>
                  ) : (
                    <div>
                      {game.period > 0
                        ? game.gameStatusText
                        : new Date(game.gameTimeUTC)
                            .toLocaleTimeString([], {
                              hour12: true,
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace(/^0(?:0:0?)?/, "")}
                    </div>
                  )}
                  <div className="games__team">
                    <p>
                      {game.awayTeam.teamName}{" "}
                      <span className="games__record">
                        ({game.awayTeam.wins}-{game.awayTeam.losses})
                      </span>
                    </p>
                    <p>{game.awayTeam.score}</p>
                  </div>
                  <div className="games__team">
                    <p>
                      {game.homeTeam.teamName}{" "}
                      <span className="games__record">
                        ({game.homeTeam.wins}-{game.homeTeam.losses})
                      </span>
                    </p>
                    <p>{game.homeTeam.score}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
