import "./styles.css";
import React from "react";
import StandingsTable from "../components/standingstable";
import StatLeader from "../components/StatLeader";
import PlayoffPicture from "../components/PlayoffPicture";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
