import React from 'react';
import { Modal, Backdrop, styled, Box } from '@mui/material';
import { ModalInterface } from "../interfaces/ModalInterface"

const BlurredBackdrop = styled(Backdrop)({
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  });

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
                slots={{ backdrop: BlurredBackdrop }}
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export default ModalTemplate;