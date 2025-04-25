import { createFileRoute } from "@tanstack/react-router";
import { FetchPlayerBio } from "../queries/playerBio";
import "./player.css";
export const Route = createFileRoute("/player")({
  component: Player,
});

function Player() {
  const { data, isPending } = useFetchPlayerBio("2544");

  if (isPending) {
    return <>Loading Bio...</>;
  }
  return (
    <div className="profile">
      <div className="containers">
        <div className="containers__bio">
          <p>{data.data[0][3]}</p>
          <p>{`${data.data[0][14]} | ${
            data.data[0][22] || "Free Agent"
          } ${data.data[0][19]} | ${data.data[0][15]}`}</p>
        </div>
        <div className="container"></div>
        <div className="container"></div>
      </div>
    </div>
  );
}
