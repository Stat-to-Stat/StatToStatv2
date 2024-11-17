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

const FilterModal = ({ modalName, currentSkaterHeaders: skaterHeaders, setCurrentSkaterHeaders: setSkaterHeaders }: ModalInterface) => {
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
      header: "Team Name",
      isNumeric: false,
      keys: ["fullTeamName", "default"],
    },
    {
      header: "Jersey",
      isNumeric: true,
      keys: ["sweaterNumber"],
    },
    {
      header: "Regular Season Career Goals",
      isNumeric: true,
      keys: ["careerTotals","regularSeason","goals"]
    }
  ];

  const manageSkaterStatHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    console.log(event.target.value);

    const checked = event.target.checked;
    const header = event.target.name;
    const currentlyContains = !!skaterHeaders.find(x => x.header === header)
    const headerInfo = skaterStatHeaders.find(x => x.header === header);

    if(!headerInfo){
      return;
    }

    if(!checked && currentlyContains){
      setSkaterHeaders(skaterHeaders.filter(x => x.header !== headerInfo.header));
    }

    if(checked && !currentlyContains){
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
          <FormLabel component="legend">Display</FormLabel>
          <FormGroup>
            {skaterStatHeaders.map((skaterStatHeader) => {
              return (
                <FormControlLabel
                  control={
                    <Switch
                      onChange={manageSkaterStatHeader}
                      name={skaterStatHeader.header}
                      value={skaterStatHeader.keys}
                      checked={!!skaterHeaders.find(x => x.header === skaterStatHeader.header)}
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
