import { useState, useEffect } from "react";

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
  const [currentSkaters, setCurrentSkaters] = useState<Skater[]>([]);
  const [currentGoalies, setCurrentGoalies] = useState<Goalie[]>([]);

  const [currentSkaterHeaders, setCurrentSkaterHeaders] = useState<
    HeaderInterface[]
  >([
    {
      header: "First Name",
      isNumeric: false,
      keys: ["firstName", "default"],
    },
    {
      header: "Last Name",
      isNumeric: false,
      keys: ["lastName", "default"],
    },
    {
      header: "Team",
      isNumeric: false,
      keys: ["fullTeamName", "default"],
    },
    {
      header: "Number",
      isNumeric: true,
      keys: ["sweaterNumber"],
    },
  ]);

  const addSkater = (skater: Skater, season: string | null) => {
      getPlayer(skater.playerId, season).then((currPlayer: Skater) => {
        if (!currPlayer){
          return;
        } 
        setCurrentSkaters((prevPlayers: Skater[]) => [...prevPlayers, currPlayer]);
      });
  };

  const addGoalie = (goalie: Goalie, season: string | null) => {
    getPlayer(goalie.playerId, season).then((currPlayer: Goalie) => {
      if (!currPlayer){
        return;
      } 
      setCurrentGoalies((prevPlayers: Goalie[]) => [...prevPlayers, currPlayer]);
  });
  }

  return (
    <div className="page-container">
      <div className="comparison-container gap-sm">
        <div className="row gap-sm">
          <h2>Player Comparison</h2>
          <h2>Team Comparison</h2>
        </div>
        <div className="graveyard">
          {currentSkaters !== null
            ? currentSkaters.map((player, index) => {
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
            currentSkaterHeaders={currentSkaterHeaders}
            addSkater={addSkater}
            addGoalie={addGoalie}
            setCurrentSkaterHeaders={setCurrentSkaterHeaders}
          />
        </div>
        {/* Will need to pass in selected players, or an array of players to display their data */}
        <PlayerTable
          players={currentSkaters}
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
