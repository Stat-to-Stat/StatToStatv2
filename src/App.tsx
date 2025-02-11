import { useState } from "react";

import PlayerTombstone from "./components/PlayerTombstone";
import FilterModal from "./components/FilterModal";
import PlayerModal from "./components/PlayerModal";
import PlayerTable from "./components/PlayerTable";
import { AllPlayers } from "./interfaces/Player";
import { Goalie, GoalieInfo } from "./interfaces/Goalie";
import { Skater, SkaterInfo } from "./interfaces/Skater";
import { getAllPlayers, getPlayer } from "./api/nhlApi";
import "./App.css";
import { HeaderInterface } from "./interfaces/ModalInterface";

// const tombStoneSeperator: React.CSSProperties = {
//   backgroundColor: 'rgb(46 55 95)',
//   width: '2px',
//   height: '100%',
// };

function App() {
  // For player drop down
  const [playerList, setPlayerList] = useState<AllPlayers[]>([]);
  const [currentPlayers, setCurrentPlayers] = useState<AllPlayers[]>([]);

  const [currentSkaterHeaders, setCurrentSkaterHeaders] = useState<
    HeaderInterface[]
  >([
    {
      header: "First Name",
      isNumeric: false,
      keys: ["firstName", "default"],
      category: "Player Info",
    },
    {
      header: "Last Name",
      isNumeric: false,
      keys: ["lastName", "default"],
      category: "Player Info",
    },
    {
      header: "Team",
      isNumeric: false,
      keys: ["fullTeamName", "default"],
      category: "Player Info",
    },
    {
      header: "Number",
      isNumeric: true,
      keys: ["sweaterNumber"],
      category: "Player Info",
    },
    {
      header: "Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "goals"],
      category: "Skater Stats",
    },
  ]);

  function isSkater(player: AllPlayers): player is Skater {
    return player != null && player.type === "Skater";
  }

  function isGoalie(player: AllPlayers): player is Goalie {
    return player != null && player.type === "Goalie";
  }

  const addPlayer = (player: AllPlayers, season: string | null) => {
    if (isSkater(player)) {
      getPlayer(player.playerId, season).then((currPlayer: AllPlayers) => {
        if (currPlayer !== null) currPlayer.type = "SkaterInfo";
        setCurrentPlayers((prevPlayers) => [...prevPlayers, currPlayer]);
      });
    } else if (isGoalie(player)) {
      getPlayer(player.playerId, season).then((currPlayer: AllPlayers) => {
        if (currPlayer !== null) currPlayer.type = "GoalieInfo";
        setCurrentPlayers((prevPlayers) => [...prevPlayers, currPlayer]);
      });
    }
  };

  return (
    <div className="page-container">
      <div className="comparison-container gap-sm">
        <div className="row gap-sm">
          <h2>Player Comparison</h2>
          <h2>Team Comparison</h2>
        </div>
        <div className="graveyard">
          {currentPlayers !== null
            ? currentPlayers.map((player, index) => {
                return <PlayerTombstone player={player} key={index} />;
              })
            : null}
        </div>
        <div className="row gap-sm">
          <FilterModal
            modalName={"Filter Stats"}
            currentSkaterHeaders={currentSkaterHeaders}
            setCurrentSkaterHeaders={setCurrentSkaterHeaders}
          />
          <PlayerModal
            modalName={"Add Player"}
            players={playerList}
            currentSkaterHeaders={currentSkaterHeaders}
            addPlayer={addPlayer}
            setCurrentSkaterHeaders={setCurrentSkaterHeaders}
          />
        </div>
        {/* Will need to pass in selected players, or an array of players to display their data */}
        <PlayerTable
          players={currentPlayers}
          currentSkaterHeaders={currentSkaterHeaders}
        />
      </div>
    </div>
  );
}

export default App;

// Below is for select player
/*
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="center-items">
            <h3>Pick a player</h3>

          </CardContent>
        </Card>
*/
