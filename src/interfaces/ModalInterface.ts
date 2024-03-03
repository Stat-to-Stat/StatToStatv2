import { ReactNode } from 'react';
import {Player} from "../interfaces/Player"

interface ModalInterface {
    isOpen?: boolean;
    modalName?: string;
    handleOpen?: () => void;
    handleClose?: () => void;
    children?: ReactNode;
}

interface PlayerModalInterface extends ModalInterface {
    players: Player[];
}

export type { ModalInterface, PlayerModalInterface };