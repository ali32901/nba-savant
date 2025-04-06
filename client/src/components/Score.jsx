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
            </div>
          </div>
        );
      })}
    </div>
  );
}
