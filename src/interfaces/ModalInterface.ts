import { ReactNode } from "react";
import { AllPlayers, GoalieInfo, SkaterInfo } from "../interfaces/Player";

interface ModalInterface {
  isOpen?: boolean;
  modalName?: string;
  handleOpen?: () => void;
  handleClose?: () => void;
  children?: ReactNode;
  currentSkaterHeaders?: HeaderInterface[];
  setCurrentSkaterHeaders: (headers: HeaderInterface[]) => void;
}

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Extract<NestedKeys<T[K]>, string>}`
          : `${K}`
        : K;
    }[keyof T]
  : keyof T;

interface HeaderInterface {
  header: string;
  isNumeric: boolean;
  keys: NestedKeys<SkaterInfo | GoalieInfo>;
}

interface PlayerModalInterface extends ModalInterface {
  players: AllPlayers[];
  addPlayer: (player: AllPlayers, season: string | null) => void;
}

export type { ModalInterface, PlayerModalInterface, HeaderInterface };
