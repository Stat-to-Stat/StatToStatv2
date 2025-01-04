import { ReactNode } from "react";

interface ModalInterface {
  isOpen?: boolean;
  modalName?: string;
  handleOpen?: () => void;
  handleClose?: () => void;
  children?: ReactNode;
  currentSkaterHeaders?: HeaderInterface[];
  setCurrentSkaterHeaders: (headers: HeaderInterface[]) => void;
}

interface HeaderInterface {
  header: string;
  isNumeric: boolean;
  keys: string[];
}

interface PlayerModalInterface extends ModalInterface {
  addSkater: (player: Skater, season: string | null) => void;
  addGoalie: (player: Goalie, season: string | null) => void;
}

export type { ModalInterface, PlayerModalInterface, HeaderInterface };
