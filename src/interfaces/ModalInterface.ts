import { ReactNode } from "react";
import { Goalie, Skater } from "../interfaces/Player";

interface ModalInterface {
  isOpen?: boolean;
  modalName?: string;
  handleOpen?: () => void;
  handleClose?: () => void;
  children?: ReactNode;
}

interface PlayerModalInterface extends ModalInterface {
  players: Skater[];
  addPlayer: (skater: Skater) => void;
  goalies: Goalie[];
  addGoalie: (goalie: Goalie) => void;
}

export type { ModalInterface, PlayerModalInterface };
