import { Table } from "@radix-ui/themes";
import { FetchStandings } from "../queries/standingsQuery";
import "./StandingsTable.css";

export default function StandingsTable(props) {
  const { data, isPending } = FetchStandings();
  if (isPending) {
    return (
      <div className="standings-table">
        <div className="skeleton-standing"></div>;
      </div>
    );
  }

  let seed = 1;

  return (
    <div className="standings-table">
      <Table.Root size="1" variant="ghost">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>{props.conference}</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="200px">Team</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>W-L</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>GB</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Streak</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last 10</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.data.map((team) => {
            if (team[5] === props.conference) {
              return (
                <Table.Row key={team[3]}>
                  <Table.Cell>{seed++}</Table.Cell>
                  <Table.Cell>{`${team[3]} ${team[4]}`}</Table.Cell>
                  <Table.Cell>{team[16]}</Table.Cell>
                  <Table.Cell>{team[37]}</Table.Cell>
                  <Table.Cell>
                    <p
                      className={`streak ${
                        team[36].slice(0, 1) === "W" ? " win" : " lose"
                      }`}
                    >
                      {team[36]}
                    </p>
                  </Table.Cell>
                  <Table.Cell>{team[19]}</Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
