import { useState, useEffect } from "react";

// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { getAllPlayers } from "./api/nhlApi.js";
import "./App.css";

function App() {

  const [playerList, setPlayerList] = useState<unknown[]>([]);

  // Get players
  useEffect(() => {
    const fetchData = async () => {
      try{
        // const players = await getAllPlayers();
        const players = await getAllPlayers();
        setPlayerList(players);
      }
      catch(err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="page-container">
      <div className="home-page-contaier">
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
        {/* <Card sx={{ minWidth: 275, marginTop: "15px" }}>
          <CardContent className="center-items">
            <h3>Pick a team</h3>
            <Button variant="contained">Yo</Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}

export default App
