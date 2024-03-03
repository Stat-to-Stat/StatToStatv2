import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { ModalInterface } from "../interfaces/ModalInterface"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalTemplate = ({isOpen, handleClose, children}: ModalInterface) => {
    const modalVisibility: boolean = isOpen ?? false;

    return(
        <div>
            <Modal
                className="modal-container"
                open={modalVisibility}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                {children}
                </Box>
            </Modal>
        </div>
    )
}

export default ModalTemplate;