import React from 'react';
import { Player, Goalie, Skater } from '../interfaces/Player';

interface PlayerTombstoneInterface {
  player: Player;
}

const deadPersonStyle: React.CSSProperties = {
  borderRadius: "50px",
  backgroundColor: "#5F5F5F",
  width: "50px",
  height: "50px"
}

const tombstoneStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

function isSkater(player: Goalie | Skater | null): player is Skater {
  return player != null && player.type === 'Skater';
}
function isGoalie(player: Goalie | Skater | null): player is Goalie {
  return player != null && player.type === 'Goalie';
}

const PlayerTombstoneHandler = (fullName: string, lastName: string) => {
  const firstName = fullName.replace(lastName, "");
  const dispayName = `${lastName}. ${firstName.slice(0,1)}`;

  return(
    <div style={tombstoneStyle}>
      <div style={deadPersonStyle}></div>
      <div>{dispayName}</div>
      <div>2023-2024</div>
    </div>
  )
}

const PlayerTombstone = ({ player }: PlayerTombstoneInterface) => {
  if (isSkater(player)) {
    return PlayerTombstoneHandler(player.skaterFullName, player.lastName);
  } else if (isGoalie(player)) {
    return <div>Goalie</div>;
  }
  return <div>Player Not Identified</div>;
};

export default PlayerTombstone;
