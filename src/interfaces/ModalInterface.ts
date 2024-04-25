import { ReactNode } from "react";
import { AllPlayers } from "../interfaces/Player";

interface ModalInterface {
  isOpen?: boolean;
  modalName?: string;
  handleOpen?: () => void;
  handleClose?: () => void;
  children?: ReactNode;
}

interface PlayerModalInterface extends ModalInterface {
  players: AllPlayers[];
  addPlayer: (player: AllPlayers) => void;
}

export type { ModalInterface, PlayerModalInterface };
