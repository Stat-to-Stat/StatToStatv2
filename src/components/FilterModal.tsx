import { useState } from "react";
import Button from "@mui/material/Button";
import ModalTemplate from "./ModalTemplate";

import { HeaderInterface, ModalInterface } from "../interfaces/ModalInterface";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
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
    },
    {
      header: "Last Name",
      isNumeric: false,
      keys: ["lasttName", "default"],
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
    {
      header: "Career Goals (Reg)",
      isNumeric: true,
      keys: ["careerTotals", "regularSeason", "goals"],
    },
    {
      header: "Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "goals"],
    },
    {
      header: "Assists",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "assists"],
    },
    {
      header: "Points",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "points"],
    },
    {
      header: "Penalty Minutes",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "penaltyMins"],
    },
    {
      header: "Game Winning Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "gameWinningGoals"],
    },
    {
      header: "Shots",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shots"],
    },
    {
      header: "Shooting %",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shootingPctg"],
    },
    {
      header: "PP Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "powerPlayGoals"],
    },
    {
      header: "PP Points",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "powerPlayPoints"],
    },
    {
      header: "SH Goals",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shortHandedGoals"],
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
    },
    {
      header: "+/-",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "plusMinus"],
    },
    {
      header: "Wins",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "wins"],
    },
    {
      header: "Wins (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "wins"],
    },
    {
      header: "Losses",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "losses"],
    },
    {
      header: "Losses (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "losses"],
    },
    {
      header: "Shutouts",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "shutouts"],
    },
    {
      header: "Goals Against Average",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "goalsAgainstAvg"],
    },
    {
      header: "Goals Against Average (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "goalsAgainstAvg"],
    },
    {
      header: "Save %",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "subSeason", "savePctg"],
    },
    {
      header: "Save % (Career)",
      isNumeric: true,
      keys: ["featuredStats", "regularSeason", "career", "savePctg"],
    },
  ];

  const manageSkaterStatHeader = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    console.log(event.target.value);

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
          <FormGroup>
            {skaterStatHeaders.map((skaterStatHeader) => {
              return (
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
                  label={skaterStatHeader.header}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </ModalTemplate>
    </div>
  );
};

export default FilterModal;
