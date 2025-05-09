import { FetchStandings } from "../queries/standingsQuery";
import "./StandingsTable.css";

export default function StandingsTable(props) {
  const { data, status } = FetchStandings();

  return (
    <div className="standings-table">
      {status === "pending" ? (
        <>Loading standings...</>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{props.conference}</th>
              <th>Team</th>
              <th>W-L</th>
              <th>GB</th>
              <th>Streak</th>
              <th>Last 10</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((team) => {
              if (team[5] === props.conference) {
                return (
                  <tr key={team[7]}>
                    <td>{team[7]}</td>
                    <td>{`${team[3]} ${team[4]}`}</td>
                    <td>{team[16]}</td>
                    <td>{team[37]}</td>
                    <td>
                      <p
                        className={`streak ${
                          team[36].slice(0, 1) === "W" ? " win" : " lose"
                        }`}
                      >
                        {team[36]}
                      </p>
                    </td>
                    <td>{team[19]}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
