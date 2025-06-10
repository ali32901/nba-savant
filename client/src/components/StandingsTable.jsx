import { FetchStandings } from "../queries/standingsQuery";
import "./StandingsTable.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

export default function StandingsTable(props) {
  const { data, status } = FetchStandings();

  return (
    <div className="standings-table">
      {status === "pending" ? (
        <>Loading standings...</>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{props.conference}</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>W-L</TableCell>
                <TableCell>GB</TableCell>
                <TableCell>Streak</TableCell>
                <TableCell>Last 10</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((team) => {
                if (team[5] === props.conference) {
                  return (
                    <TableRow key={team[7]}>
                      <TableCell>{team[7]}</TableCell>
                      <TableCell>{`${team[3]} ${team[4]}`}</TableCell>
                      <TableCell>{team[16]}</TableCell>
                      <TableCell>{team[37]}</TableCell>
                      <TableCell>
                        <p
                          className={`streak ${
                            team[36].slice(0, 1) === "W" ? " win" : " lose"
                          }`}
                        >
                          {team[36]}
                        </p>
                      </TableCell>
                      <TableCell>{team[19]}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
