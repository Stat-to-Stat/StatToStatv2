import React from "react";
// import { Player, Goalie, Skater } from '../interfaces/Player';
import SkaterInfo from "../interfaces/SkaterInfo";

interface PlayerTombstoneInterface {
  player: SkaterInfo;
}

const deadPersonStyle: React.CSSProperties = {
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

// function isSkater(player: Goalie | Skater | null): player is Skater {
//   return player !== null && player.type === 'Skater';
// }
// function isGoalie(player: Goalie | Skater | null): player is Goalie {
//   return player !== null && player.type === 'Goalie';
// }

const PlayerTombstoneHandler = (firstName: string, lastName: string) => {
  const dispayName = `${lastName}, ${firstName}`;

  return (
    <div style={tombstoneStyle}>
      <div style={deadPersonStyle}></div>
      <div>{dispayName}</div>
      <div>2023-2024</div>
    </div>
  );
};

const PlayerTombstone = ({ player }: PlayerTombstoneInterface) => {
  return PlayerTombstoneHandler(
    player.firstName.default,
    player.lastName.default
  );
};

export default PlayerTombstone;
