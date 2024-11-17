import { ReactNode } from "react";
import { AllPlayers } from "../interfaces/Player";

interface ModalInterface {
  isOpen?: boolean;
  modalName?: string;
  handleOpen?: () => void;
  handleClose?: () => void;
  children?: ReactNode;
}

interface HeaderInterface {
  header: string;
  isNumeric: boolean;
  keys: string[];
}

interface PlayerModalInterface extends ModalInterface {
  players: AllPlayers[];
  addPlayer: (player: AllPlayers, season: string | null) => void;
}

export type { ModalInterface, PlayerModalInterface, HeaderInterface };
