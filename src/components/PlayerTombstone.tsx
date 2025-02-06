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

const SkaterTombstoneHandler = (player: SkaterInfo) => {
  const dispayName = `${player.lastName.default}, ${player.firstName.default}`;
  console.log(player.headshot);

  return (
    <div style={tombstoneStyle}>
      <div>
        <img src={player.headshot} style={personStyle} />
      </div>
      <div>{dispayName}</div>
      <div>
        {player.selectedSeason.slice(0, 4) +
          "-" +
          player.selectedSeason.slice(4)}
      </div>
    </div>
  );
};

const GoalieTombstoneHandler = (player: GoalieInfo) => {
  const dispayName = `${player.lastName.default}, ${player.firstName.default}`;
  console.log(player.headshot);

  return (
    <div style={tombstoneStyle}>
      <div>
        <img src={player.headshot} style={personStyle} />
      </div>
      <div>{dispayName}</div>
      <div>Put Season Here</div>
    </div>
  );
};

const PlayerTombstone = ({ player }: PlayerTombstoneInterface) => {
  if (player === null) return;
  if (isSkater(player)) {
    return SkaterTombstoneHandler(player);
  }
  if (isGoalie(player)) {
    return GoalieTombstoneHandler(player);
  }
};

export default PlayerTombstone;
