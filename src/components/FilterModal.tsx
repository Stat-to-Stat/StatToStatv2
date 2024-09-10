import { useState } from "react";
import Button from "@mui/material/Button";
import ModalTemplate from "./ModalTemplate";
import Typography from "@mui/material/Typography";

import { ModalInterface } from "../interfaces/ModalInterface";

const FilterModal = ({ modalName }: ModalInterface) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          Text in a modal
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </ModalTemplate>
    </div>
  );
};

export default FilterModal;
