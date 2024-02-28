import { useState, useEffect } from "react";

// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import PlayerTombstone from "./components/PlayerTombstone";
import {Player, Goalie, Skater} from "./interfaces/Player";

import { getAllPlayers } from "./api/nhlApi";
import "./App.css";

function App() {

  // For player drop down
  // const [playerList, setPlayerList] = useState<unknown[]>([]);

  // // Get players
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       // const players = await getAllPlayers();
  //       const players = await getAllPlayers();
  //       setPlayerList(players);
  //     }
  //     catch(err) {
  //       console.error(err);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const player1: Player = {
    type: "Skater",
    skaterFullName: "Billy Bitch Bro"
  };
  const player2: Player = {
    type: "Goalie",
    goalieFullName: "Billy Bitch Bro"
  };

  return (
    <div className="page-container">
      <div className="comparison-container">
        <div className="row gap-sm">
          <h2>Player Comparison</h2>
          <h2>Team Comparison</h2>
        </div>
        <div className="graveyard">
          <PlayerTombstone player={player1} />
          <PlayerTombstone player={player2} />
        </div>
        <div style={{"marginTop": "20px"}}>
          <button>Filter</button>
          <button>Add Player</button>
        </div>
        <div style={{"marginTop": "20px"}}>
          THIS WILL BE THE TABLE
        </div>
      </div>
    </div>
  )
}

export default App


// Below is for select player
/*
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="center-items">
            <h3>Pick a player</h3>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={playerList}
              getOptionLabel={(option) => {
                // e.g. value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                if (option.goalieFullName) {
                  return `${option.goalieFullName} (${option.teamAbbrevs})`;
                }
                if (option.skaterFullName) {
                  return `${option.skaterFullName} (${option.teamAbbrevs})`;
                }

                return "Unknown";
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Player" />}
            />
          </CardContent>
        </Card>
*/