import React, { useState } from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import ModalTemplate from "./ModalTemplate";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Player, Goalie, Skater } from "../interfaces/Player";

import { PlayerModalInterface } from "../interfaces/ModalInterface";
import { getAllSeasons } from "../api/nhlApi";

const autoCorrectContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const buttonsContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

function isSkater(player: Goalie | Skater | null): player is Skater {
  return player != null && player.type === "Skater";
}

function isGoalie(player: Goalie | Skater | null): player is Goalie {
  return player != null && player.type === "Goalie";
}

const PlayerModal = ({
  modalName,
  players,
  addPlayer,
}: PlayerModalInterface) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(null);

  return (
    <div>
      <Button onClick={handleOpen} className="btn-primary" variant="contained">
        {modalName}
      </Button>
      <ModalTemplate
        isOpen={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {modalName}
        </Typography>
        <div id="modal-description" style={autoCorrectContainer}>
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[{ label: "2023-2024" }]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Season" />}
            />
          </div>
          <div>
            <Autocomplete
              onChange={(
                e: React.SyntheticEvent<Element, Event>,
                newPlayer: Player
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
                    return `${option.goalieFullName} (Team Abbrevs)`;
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
              onClick={() => addPlayer(selectedPlayer)}
            >
              Add
            </Button>
            <Button
              className="btn-failure"
              variant="contained"
              onClick={() => setOpen(!open)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ModalTemplate>
    </div>
  );
};

export default PlayerModal;
