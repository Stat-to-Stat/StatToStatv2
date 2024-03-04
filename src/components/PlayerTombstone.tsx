import { Player, Goalie, Skater } from '../interfaces/Player';

interface PlayerTombstoneInterface {
  player: Player;
}

function isSkater(player: Goalie | Skater | undefined | null): player is Skater {
  return player != undefined && player.type === 'Skater';
}
function isGoalie(player: Goalie | Skater | undefined | null): player is Goalie {
  return player != undefined && player.type === 'Goalie';
}

const PlayerTombstone = ({ player }: PlayerTombstoneInterface) => {
  if (isSkater(player)) {
    return <div>{player.skaterFullName}</div>;
  } else if (isGoalie(player)) {
    return <div>Goalie</div>;
  }
  return <div>Player Not Identified</div>;
};

export default PlayerTombstone;
