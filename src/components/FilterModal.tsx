import { useState } from "react";
import Button from "@mui/material/Button";
import ModalTemplate from "./ModalTemplate";

import { HeaderInterface, ModalInterface } from "../interfaces/ModalInterface";
import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch } from "@mui/material";

const FilterModal = ({ modalName }: ModalInterface) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const skaterStatHeaders: HeaderInterface[] = [ 
    {
      header: "First Name",
      isNumeric: false,
      keys: ["firstName","default"]
    },
    {
      header: "Team Name",
      isNumeric: false,
      keys: ["fullTeamName","default"]
    },
    {
      header: "Jersey",
      isNumeric: true,
      keys: ["sweaterNumber"]
    }
  ];

  const addSkaterStatHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    console.log(event.target.name);
    console.log(event.target.value);
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
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            {skaterStatHeaders.map(skaterStatHeader => {
              return(
                <FormControlLabel
                control={
                  <Switch onChange={addSkaterStatHeader} name={skaterStatHeader.header} value={skaterStatHeader.keys} />
                }
                label={skaterStatHeader.header}
                />
              )
            })}
          </FormGroup>
        </FormControl>
      </ModalTemplate>
    </div>
  );
};

export default FilterModal;
