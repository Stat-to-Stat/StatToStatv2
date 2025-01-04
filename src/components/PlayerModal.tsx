import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import Autocomplete from "@mui/material/Autocomplete";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import ModalTemplate from "./ModalTemplate";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  // AllPlayers,
  Goalie,
  // GoalieInfo,
  Skater,
  // SkaterInfo,
} from "../interfaces/Player";
import { PlayerModalInterface } from "../interfaces/ModalInterface";
import { getAllPlayers } from "../api/nhlApi";

interface SeasonType {
  label: string;
}

const autoCorrectContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const buttonsContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const PlayerModal = ({
  modalName,
  addSkater,
  addGoalie
}:
PlayerModalInterface) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Skater | Goalie>();
  const [selectedSeason, setSelectedSeason] = useState<string | null>("");
  const [playerList, setPlayerList] = useState<Skater[] | Goalie[]>([]);

  const seasons: SeasonType[] = [];
  for (let i = 0; i < 107; i++) {
    const currentYear = new Date().getFullYear() - i;
    const previousYear = currentYear - 1;

    seasons.push({ label: `${previousYear}-${currentYear}` });
  }

  // Get players
  useEffect(() => {
    const fetchData = async () => {
      try {
        let players = await getAllPlayers();

        players = players.map((x, i) => {
          x.id = `${x.playerId} ${i}`
          return x;
        });

        setPlayerList(players);
        console.log(players);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [selectedSeason]);

  const handleOnSelect = (item: Skater | Goalie) => {
    // the item selected
    console.log(item)
  }

  const formatResult = (item: Skater | Goalie) => {
    if ("skaterFullName" in item) {
      return `${item.skaterFullName} (${item.teamAbbrevs})`;
    }
  
    if ("goalieFullName" in item) {
      return `${item.goalieFullName} (${item.teamAbbrevs})`;
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} className="btn-primary" variant="contained">
        {modalName}
      </Button>
      <ModalTemplate
        isOpen={open}
        handleOpen={handleOpen}
        handleClose={handleClose}>
        <Typography id="modal-title" variant="h6" component="h2">
          {modalName}
        </Typography>
        <div id="modal-description" style={autoCorrectContainer}>
          <div>
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={seasons}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Season" />}
              onChange={(
                _e: React.SyntheticEvent<Element, Event>,
                // Needs to be able to handle both Skaters and Goalies
                season: SeasonType | null
              ) => {
                setSelectedSeason(season?.label ?? null);
              }}
            /> */}
          </div>
          <div>
            <div style={{ width: 300 }}>
              <ReactSearchAutocomplete 
                items={playerList}
                className="autocomplete"
                // onSearch={handleOnSearch}
                // onHover={handleOnHover}
                onSelect={handleOnSelect}
                // onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
                fuseOptions={{
                  shouldSort: true,
                  threshold: 0.6,
                  location: 0,
                  distance: 100,
                  minMatchCharLength: 1,
                  keys: [
                    "skaterFullName",
                    "goalieFullName"
                  ]
                }}
                />
            </div>
            {/* <Autocomplete
              disabled={selectedSeason === ""}
              onChange={(
                _e: React.SyntheticEvent<Element, Event>,
                // Needs to be able to handle both Skaters and Goalies
                newPlayer: Skater | Goalie | null
              ) => {
                if(!newPlayer){
                  return;
                }

                setSelectedPlayer(newPlayer);
              }}
              disablePortal
              id="combo-box-demo"
              options={playerList}
              getOptionLabel={(option: Skater | Goalie) => {
                if (option === null) {
                  return "Unknown";
                }

                if (option["skaterFullName"]) {
                  return `${option.skaterFullName} (${option.teamAbbrevs})`;
                }

                if (option["goalieFullName"]) {
                  return `${option.goalieFullName} (${option.teamAbbrevs})`;
                }

                return "Unknown";
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Player" />}
            /> */}
          </div>
          <div style={buttonsContainer}>
            {/* <Button
              className="btn-success"
              variant="contained"
              onClick={
                () => addSkater(selectedPlayer, selectedSeason)
                // selectedPlayer !== null && selectedPlayer.type === "Skater"
                //   ? addPlayer(selectedPlayer)
                //   : // Side effect of the issue on line 76
                //     addGoalie(selectedPlayer)
              }>
              Add
            </Button>
            <Button
              className="btn-failure"
              variant="contained"
              onClick={() => setOpen(!open)}>
              Cancel
            </Button> */}
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default PlayerModal;
