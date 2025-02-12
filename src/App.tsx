import React, { useState } from "react";
import { Container, Box, Button, Typography, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PlayerData, SkaterStats, GoalieStats } from "./interfaces/Player";
import StatsTable from "./components/StatsTable";
import PlayerSelectionModal from "./components/PlayerSelectionModal";

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [playerStats, setPlayerStats] = useState<(SkaterStats | GoalieStats)[]>(
    []
  );
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerTypes, setPlayerTypes] = useState<("Skater" | "Goalie")[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handlePlayerSelect = (
    playerData: PlayerData,
    selectedSeason: string,
    playerName: string
  ) => {
    const seasonData = playerData.seasonStats.find(
      (season) => season.season === selectedSeason
    );

    if (!seasonData) {
      setError("No stats available for selected season");
      return;
    }

    const newStats =
      seasonData.regularSeason.skater || seasonData.regularSeason.goalie;
    if (!newStats) {
      setError("No stats available for this player");
      return;
    }

    const playerType = "goals" in newStats ? "Skater" : "Goalie";

    if (playerStats.length > 0 && playerTypes[0] !== playerType) {
      setError("Cannot mix skater and goalie stats in the same table");
      return;
    }

    setPlayerStats([...playerStats, newStats]);
    setPlayerNames([...playerNames, playerName]);
    setPlayerTypes([...playerTypes, playerType]);
    setSeasons([...seasons, selectedSeason]);
    setError("");
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" component="h1">
            Player Statistics
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            Add Player
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {playerStats.length > 0 ? (
          <StatsTable
            stats={playerStats}
            playerNames={playerNames}
            playerType={playerTypes}
            seasons={seasons}
          />
        ) : (
          <Alert severity="info">
            Click "Add Player" to start building your comparison table
          </Alert>
        )}

        <PlayerSelectionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onPlayerSelect={handlePlayerSelect}
        />
      </Box>
    </Container>
  );
};

export default App;
