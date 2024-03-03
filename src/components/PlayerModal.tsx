import * as React from 'react';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import ModalTemplate from './ModalTemplate';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { PlayerModalInterface } from "../interfaces/ModalInterface"

const PlayerModal = ({modalName, players}: PlayerModalInterface) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
    return(
      <div>
        <Button onClick={handleOpen} className="btn-primary" variant="contained">{modalName}</Button>
        <ModalTemplate isOpen={open} handleOpen={handleOpen} handleClose={handleClose} >
          <Typography id="modal-title" variant="h6" component="h2">
            {modalName}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <div>Season</div>
            <div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={players}
                getOptionLabel={(option) => {
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
            </div>
            <div>
              <Button className="btn-success" variant="contained">Add</Button>
              <Button className="btn-failure" variant="contained">Cancel</Button>
            </div>
          </Typography>
        </ModalTemplate>
      </div>
    )
}

export default PlayerModal;