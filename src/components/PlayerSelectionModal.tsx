import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  PlayerSearchResult,
  PlayerData,
  SeasonInfo,
  LocalizedString,
} from "../interfaces/Player";
import { getPlayersBySeasonAndType, getPlayerDetail } from "../api/nhlApi";

interface PlayerSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onPlayerSelect: (
    playerData: PlayerData,
    selectedSeason: string,
    playerName: string
  ) => void;
}

const getCurrentSeason = (): string => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const seasonStart = today.getMonth() >= 9 ? currentYear : currentYear - 1;
  return `${seasonStart}-${seasonStart + 1}`;
};

const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({
  open,
  onClose,
  onPlayerSelect,
}) => {
  const [players, setPlayers] = useState<PlayerSearchResult[]>([]);
  const [selectedPlayer, setSelectedPlayer] =
    useState<PlayerSearchResult | null>(null);
  const [playerSeasons, setPlayerSeasons] = useState<string[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const currentSeason = getCurrentSeason();
        console.log("Fetching players for season:", currentSeason);
        const playersData = await getPlayersBySeasonAndType(currentSeason);
        console.log("Received players data:", playersData);
        setPlayers(playersData);
      } catch (error) {
        console.error("Error fetching players:", error);
        setPlayers([]);
      }
      setLoading(false);
    };

    if (open) {
      fetchPlayers();
      setSelectedPlayer(null);
      setPlayerSeasons([]);
      setSelectedSeason("");
      setInputValue("");
    }
  }, [open]);

  const handlePlayerChange = async (player: PlayerSearchResult | null) => {
    console.log("Selected player:", player);
    setLoading(true);
    try {
      setSelectedPlayer(player);

      if (player) {
        console.log("Fetching details for player:", player.playerId);
        const playerDetails = await getPlayerDetail(player.playerId);
        console.log("Received player details:", playerDetails);
        const seasons = playerDetails.seasonStats.map((stat) => stat.season);
        setPlayerSeasons(seasons);
      } else {
        setPlayerSeasons([]);
      }

      setSelectedSeason("");
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (selectedPlayer && selectedSeason) {
      setLoading(true);
      try {
        const playerData = await getPlayerDetail(
          selectedPlayer.playerId,
          selectedSeason
        );
        const playerName = `${selectedPlayer.firstName.default} ${selectedPlayer.lastName.default}`;
        onPlayerSelect(playerData, selectedSeason, playerName);
        onClose();
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
      setLoading(false);
    }
  };

  const getPlayerLabel = (player: PlayerSearchResult): string => {
    const position = player.position;
    const name = `${player.firstName.default} ${player.lastName.default}`;
    const team = player.currentTeamAbbrev;
    return `${name} (${position} - ${team})`;
  };

  // Filter players based on search input
  const getFilteredOptions = (
    players: PlayerSearchResult[],
    inputValue: string
  ) => {
    const searchValue = inputValue.toLowerCase().trim();
    console.log("Searching for:", searchValue);

    if (searchValue.length < 4) {
      return [];
    }

    return players.filter((player) => {
      const firstName = player.firstName?.default?.toLowerCase() || "";
      const lastName = player.lastName?.default?.toLowerCase() || "";
      const fullName = `${firstName} ${lastName}`;
      const matches = fullName.includes(searchValue);
      return matches;
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Player</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}>
          <Autocomplete
            options={players}
            value={selectedPlayer}
            onChange={(event, newValue) => handlePlayerChange(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue || "");
            }}
            getOptionLabel={getPlayerLabel}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Player"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            loading={loading}
            filterOptions={(options, params) => {
              const filtered = getFilteredOptions(options, params.inputValue);
              console.log("Filtered results:", filtered.length);
              return filtered;
            }}
            noOptionsText={
              inputValue.length < 4
                ? "Type at least 4 characters"
                : "No players found"
            }
            isOptionEqualToValue={(option, value) =>
              option.playerId === value.playerId
            }
          />

          {selectedPlayer && playerSeasons.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>Select Season</InputLabel>
              <Select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                label="Select Season"
              >
                {playerSeasons.map((season) => (
                  <MenuItem key={season} value={season}>
                    {season}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAdd}
          disabled={!selectedPlayer || !selectedSeason || loading}
          variant="contained"
        >
          {loading ? <CircularProgress size={24} /> : "Add Player"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlayerSelectionModal;
