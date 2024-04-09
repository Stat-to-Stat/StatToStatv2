import { Skater, SkaterInfo } from "./Skater";
import { Goalie, GoalieInfo } from "./Goalie";

type Goalies = Goalie | GoalieInfo | null;
type Skaters = Skater | SkaterInfo | null;
type PlayerInfo = GoalieInfo | SkaterInfo | null;
type AllPlayers = Goalies | Skaters | null;

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
