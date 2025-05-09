import "./styles.css";
import React from "react";
import { Badge, HoverCard } from "@radix-ui/themes";
import { FetchScores } from "../queries/scoresQuery";
import StandingsTable from "../components/standingstable";
import StatLeader from "../components/StatLeader";
import PlayoffPicture from "../components/PlayoffPicture";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // const [playerId, setPlayerId] = React.useState(
  //   localStorage.getItem("playerId") || 2544
  // );

  return (
    <div className="body">
      <div className="league">
        <StandingsTable conference={"East"} />
        <StandingsTable conference={"West"} />
        <StatLeader />
        <div className="playoff">
          <PlayoffPicture />
        </div>
      </div>
    </div>
  );
}

export default Index;
