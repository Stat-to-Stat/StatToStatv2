import {Player, Goalie, Skater} from "../interfaces/Player";

interface PlayerTombstoneInterface {
    player: Player
}

function isSkater(player: Goalie | Skater): player is Skater {
    return player.type === "Skater";
}
function isGoalie(player: Goalie | Skater): player is Goalie {
    return player.type === "Goalie";
}

const PlayerTombstone = ({player}: PlayerTombstoneInterface) => {
    if(isSkater(player)){
        return(
            <div>Skater</div>
        )
    }
    else if(isGoalie(player)){
        return(
            <div>Goalie</div>
        )
    }
    return(
        <div>Player Not Identified</div>
    )

}

export default PlayerTombstone;