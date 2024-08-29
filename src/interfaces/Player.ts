import { Skater, SkaterInfo } from "./Skater";
import { Goalie, GoalieInfo } from "./Goalie";

interface SeasonField {
  selectedSeason: string;
}

type Goalies = Goalie | GoalieInfo | null;
type Skaters = Skater | SkaterInfo | null;
type PlayerInfo = GoalieInfo | SkaterInfo | SeasonField | null;
type AllPlayers = Goalies | Skaters | SeasonField | null;

export type {
  AllPlayers,
  Goalie,
  Goalies,
  GoalieInfo,
  PlayerInfo,
  Skater,
  Skaters,
  SkaterInfo,
};
