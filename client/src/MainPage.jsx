import "./MainPage.css";
import { FetchScores } from "./queries/scoresQuery";
import StandingsTable from "./components/standingstable";
import Header from "./components/Header";
import StatLeader from "./components/StatLeader";

function MainPage() {
  const { data, isPending } = FetchScores();

  if (isPending) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  return (
    <div>
      <header className="boxscores-container">
        {/* <h1>Placeholder</h1> */}
        {data &&
          data.map((game) => {
            return (
              <div key={game.gameId}>
                <div className="boxscore">
                  <p className="game-status">{game.gameStatusText}</p>
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
          <h1>Today's Leaders</h1>
          <div className="stat-tables">
            <StatLeader id="1" statType="Points" />
            <StatLeader id="2" statType="Rebounds" />
            <StatLeader id="3" statType="Assists" />
            <StatLeader id="4" statType="Steals" />
            <StatLeader id="8" statType="Blocks" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
