import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import ModalTemplate from "./ModalTemplate";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  // AllPlayers,
  Goalie,
  // GoalieInfo,
  Skater,
  AllPlayers,
  // SkaterInfo,
} from "../interfaces/Player";
import { PlayerModalInterface } from "../interfaces/ModalInterface";

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

function isSkater(player: AllPlayers): player is Skater {
  return player !== null && player.type === "Skater";
}

function isGoalie(goalie: AllPlayers): goalie is Goalie {
  return goalie !== null && goalie.type === "Goalie";
}

const PlayerModal = ({
  modalName,
  players,
  // goalies,
  addPlayer,
}: // addGoalie,
PlayerModalInterface) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedPlayer, setSelectedPlayer] = useState<AllPlayers>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>("");

  const seasons: SeasonType[] = [];
  for (let i = 0; i < 50; i++) {
    const currentYear = new Date().getFullYear() - i;
    const previousYear = currentYear - 1;

    seasons.push({ label: `${previousYear}-${currentYear}` });
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
            <Autocomplete
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
            />
          </div>
          <div>
            <Autocomplete
              onChange={(
                _e: React.SyntheticEvent<Element, Event>,
                // Needs to be able to handle both Skaters and Goalies
                newPlayer: AllPlayers
              ) => {
                setSelectedPlayer(newPlayer);
              }}
              disablePortal
              id="combo-box-demo"
              options={players}
              getOptionLabel={(option) => {
                if (option === null) {
                  return "Unknown";
                }

                if (isSkater(option)) {
                  if (option.skaterFullName) {
                    return `${option.skaterFullName} (${option.teamAbbrevs})`;
                  }
                }

                if (isGoalie(option)) {
                  if (option.goalieFullName) {
                    return `${option.goalieFullName} (${option.teamAbbrevs})`;
                  }
                }

                return "Unknown";
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Player" />}
            />
          </div>
          <div style={buttonsContainer}>
            <Button
              className="btn-success"
              variant="contained"
              onClick={
                () => addPlayer(selectedPlayer, selectedSeason)
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
            </Button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default PlayerModal;
