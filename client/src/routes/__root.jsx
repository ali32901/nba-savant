import * as React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
