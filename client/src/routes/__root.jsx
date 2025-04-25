import * as React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "./styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="header">
        <h1>nba savant</h1>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/player">Player</Link>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
