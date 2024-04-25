import React from "react";
import { AllPlayers, GoalieInfo, SkaterInfo } from "../interfaces/Player";

interface PlayerTombstoneInterface {
  player: AllPlayers;
}

const personStyle: React.CSSProperties = {
  borderRadius: "50px",
  backgroundColor: "#5F5F5F",
  width: "50px",
  height: "50px",
};

const tombstoneStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function isSkater(player: AllPlayers): player is SkaterInfo {
  return player !== null && player.type === "SkaterInfo";
}
function isGoalie(player: AllPlayers): player is GoalieInfo {
  return player !== null && player.type === "GoalieInfo";
}

const PlayerTombstoneHandler = (firstName: string, lastName: string) => {
  const dispayName = `${lastName}, ${firstName}`;

  return (
    <div style={tombstoneStyle}>
      <div style={personStyle}></div>
      <div>{dispayName}</div>
      <div>2023-2024</div>
    </div>
  );
};

const PlayerTombstone = ({ player }: PlayerTombstoneInterface) => {
  if (player === null) return;
  if (isSkater(player)) {
    return PlayerTombstoneHandler(
      player.firstName.default,
      player.lastName.default
    );
  }
  if (isGoalie(player)) {
    return PlayerTombstoneHandler(
      player.firstName.default,
      player.lastName.default
    );
  }
};

export default PlayerTombstone;
