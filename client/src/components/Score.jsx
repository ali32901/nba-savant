import { FetchBoxscores } from "../queries/scoresQuery";

export default function score() {
  const { data, isPending } = FetchBoxscores();

  if (isPending) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <div className="boxscores-container">
      {data.map((game) => {
        return (
          <div>
            <div className="boxscore">
              <div className="team-score">
                <div className="away">
                  <h2>{game.awayTeam.teamName}</h2>
                  <p>{game.awayTeam.score}</p>
                </div>
                <p className="record">
                  ({game.awayTeam.wins}-{game.awayTeam.losses})
                </p>
              </div>
              <div className="team-score">
                <div className="home">
                  <h2>{game.homeTeam.teamName}</h2>
                  <p>{game.homeTeam.score}</p>
                </div>
                <p className="record">
                  ({game.homeTeam.wins}-{game.homeTeam.losses})
                </p>
              </div>
              {/* <div className="game-status">
                  <div className="game-clock">
                    <p>{game.gameStatusText}</p>
                  </div>
                  <div className="periods-container">
                    <div className="periods">
                      <p>{game.awayTeam.teamTricode}</p>
                      {game.awayTeam.periods.map((period) => {
                        return <p>{period.score}</p>;
                      })}
                    </div>
                    <div className="periods">
                      <p>{game.homeTeam.teamTricode}</p>
                      {game.homeTeam.periods.map((period) => {
                        return <p>{period.score}</p>;
                      })}
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
