import { useState } from "react";
import Button from "@mui/material/Button";
import ModalTemplate from "./ModalTemplate";
import { HeaderInterface, ModalInterface } from "../interfaces/ModalInterface";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Switch,
  Grid,
  Typography,
} from "@mui/material";

const FilterModal = ({
  modalName,
  currentSkaterHeaders: skaterHeaders,
  setCurrentSkaterHeaders: setSkaterHeaders,
}: ModalInterface) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  skaterHeaders = skaterHeaders == null ? [] : skaterHeaders;

  const skaterStatHeaders: HeaderInterface[] = [
    {
      header: "First Name",
      isNumeric: false,
      keys: ["firstName", "default"],
      category: "Player Info",
    },
    {
      header: "Last Name",
      isNumeric: false,
      keys: ["lasttName", "default"],
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
      header: "Career Goals (Reg)",
      isNumeric: true,
      keys: ["careerTotals", "regularSeason", "goals"],
      category: "Skater Stats",
    },
    {
      header: "Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "goals"],
      category: "Skater Stats",
    },
    {
      header: "Assists",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "assists"],
      category: "Skater Stats",
    },
    {
      header: "Points",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "points"],
      category: "Skater Stats",
    },
    {
      header: "Penalty Minutes",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "penaltyMins"],
      category: "Skater Stats",
    },
    {
      header: "Game Winning Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "gameWinningGoals"],
      category: "Skater Stats",
    },
    {
      header: "Shots",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shots"],
      category: "Skater Stats",
    },
    {
      header: "Shooting %",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shootingPctg"],
      category: "Skater Stats",
    },
    {
      header: "PP Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "powerPlayGoals"],
      category: "Skater Stats",
    },
    {
      header: "PP Points",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "powerPlayPoints"],
      category: "Skater Stats",
    },
    {
      header: "SH Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shortHandedGoals"],
      category: "Skater Stats",
    },
    {
      header: "SH Points",
      isNumeric: true,
      keys: [
        "featuredStats",
        "regularSeason",
        "subSeason",
        "shortHandedPoints",
      ],
      category: "Skater Stats",
    },
    {
      header: "+/-",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "plusMinus"],
      category: "Skater Stats",
    },
    {
      header: "Wins",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "wins"],
      category: "Goalie Stats",
    },
    {
      header: "Wins (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "wins"],
      category: "Goalie Stats",
    },
    {
      header: "Losses",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "losses"],
      category: "Goalie Stats",
    },
    {
      header: "Losses (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "losses"],
      category: "Goalie Stats",
    },
    {
      header: "Shutouts",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shutouts"],
      category: "Goalie Stats",
    },
    {
      header: "Goals Against Average",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "goalsAgainstAvg"],
      category: "Goalie Stats",
    },
    {
      header: "Goals Against Average (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "goalsAgainstAvg"],
      category: "Goalie Stats",
    },
    {
      header: "Save %",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "savePctg"],
      category: "Goalie Stats",
    },
    {
      header: "Save % (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "savePctg"],
      category: "Goalie Stats",
    },
  ];

  const manageSkaterStatHeader = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    const header = event.target.name;
    const currentlyContains = !!skaterHeaders.find((x) => x.header === header);
    const headerInfo = skaterStatHeaders.find((x) => x.header === header);

    if (!headerInfo) {
      return;
    }

    if (!checked && currentlyContains) {
      setSkaterHeaders(
        skaterHeaders.filter((x) => x.header !== headerInfo.header)
      );
    }

    if (checked && !currentlyContains) {
      setSkaterHeaders([...skaterHeaders, headerInfo]);
    }
  };

  const groupedHeaders = skaterStatHeaders.reduce((acc, header) => {
    if (!acc[header.category]) {
      acc[header.category] = [];
    }
    acc[header.category].push(header);
    return acc;
  }, {} as Record<string, HeaderInterface[]>);

  return (
    <div>
      <Button onClick={handleOpen} className="btn-primary" variant="contained">
        {modalName}
      </Button>
      <ModalTemplate
        isOpen={open}
        handleOpen={handleOpen}
        handleClose={handleClose}>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Choose Stats</FormLabel>

          {/* Player Info Section */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Player Info
          </Typography>
          <Grid container spacing={3}>
            {groupedHeaders["Player Info"]?.map((skaterStatHeader) => (
              <Grid item xs={12} sm={6} md={3} key={skaterStatHeader.header}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={manageSkaterStatHeader}
                      name={skaterStatHeader.header}
                      value={skaterStatHeader.keys}
                      checked={
                        !!skaterHeaders.find(
                          (x) => x.header === skaterStatHeader.header
                        )
                      }
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
                      {skaterStatHeader.header}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>

          {/* Skater Stats Section */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Skater Stats
          </Typography>
          <Grid container spacing={3}>
            {groupedHeaders["Skater Stats"]?.map((skaterStatHeader) => (
              <Grid item xs={12} sm={6} md={3} key={skaterStatHeader.header}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={manageSkaterStatHeader}
                      name={skaterStatHeader.header}
                      value={skaterStatHeader.keys}
                      checked={
                        !!skaterHeaders.find(
                          (x) => x.header === skaterStatHeader.header
                        )
                      }
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
                      {skaterStatHeader.header}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>

          {/* Goalie Stats Section */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Goalie Stats
          </Typography>
          <Grid container spacing={3}>
            {groupedHeaders["Goalie Stats"]?.map((skaterStatHeader) => (
              <Grid item xs={12} sm={6} md={3} key={skaterStatHeader.header}>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={manageSkaterStatHeader}
                      name={skaterStatHeader.header}
                      value={skaterStatHeader.keys}
                      checked={
                        !!skaterHeaders.find(
                          (x) => x.header === skaterStatHeader.header
                        )
                      }
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
                      {skaterStatHeader.header}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </ModalTemplate>
    </div>
  );
};

export default FilterModal;
