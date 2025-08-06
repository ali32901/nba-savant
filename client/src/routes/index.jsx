import "./styles.css";
import React from "react";
import StandingsTable from "../components/standingstable";
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
      </div>
    </div>
  );
}

export default Index;
