import { FetchPlayoffPicture } from "../queries/playoffPictureQuery";
import "./PlayoffPicture.css";
export default function PlayoffPicture() {
  const { data, isPending } = FetchPlayoffPicture();

  if (isPending) {
    return <p>Loading data...</p>;
  }
  return (
    <div className="rounds">
      <div className="round">
        {data.resultSets[1].rowSet.map((matchup) => {
          return (
            <div className="rounds__matchup">
              <p>{matchup[2]}</p>
              <p>{matchup[5]}</p>
            </div>
          );
        })}
      </div>
      <div className="round"></div>
      <div className="round"></div>
      <div className="round"></div>
      <div className="round"></div>
      <div className="round"></div>
      <div className="round">
        {data.resultSets[0].rowSet.map((matchup) => {
          return (
            <div className="rounds__matchup">
              <p>{matchup[2]}</p>
              <p>{matchup[5]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
