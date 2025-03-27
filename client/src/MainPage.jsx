import "./MainPage.css";
import { Badge } from "@radix-ui/themes";
import { FetchScores } from "./queries/scoresQuery";
import { useState } from "react";
import StandingsTable from "./components/standingstable";
import Header from "./components/Header";
import StatLeader from "./components/StatLeader";

function MainPage() {
  const newDate = new Date();
  const [date, setDate] = useState(
    `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${newDate.getDate()}`
  );
  const { data, isPending } = FetchScores();

  if (isPending) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  console.log(date);

  return (
    <div>
      <header className="boxscores-container">
        {data &&
          data.map((game) => {
            return (
              <div key={game.gameId}>
                <div className="boxscore">
                  <Badge color="green">{game.gameStatusText}</Badge>
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
      <div className="main-page-body">
        <div className="standings-container">
          <StandingsTable conference={"East"} />
          <StandingsTable conference={"West"} />
        </div>
        <div className="leaders-container">
          <h1>Leaders</h1>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></input>
          <div className="stat-tables">
            <StatLeader sorter="PTS" category="Points" date={date} />
            <StatLeader sorter="REB" category="Rebounds" date={date} />
            <StatLeader sorter="AST" category="Assists" date={date} />
            <StatLeader sorter="STL" category="Steals" date={date} />
            <StatLeader sorter="BLK" category="Blocks" date={date} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
