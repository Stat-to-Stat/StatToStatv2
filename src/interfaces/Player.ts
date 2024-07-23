import { Skater, SkaterInfo } from "./Skater";
import { Goalie, GoalieInfo } from "./Goalie";

type SeasonField = { selectedSeason: string };

type Goalies = Goalie | GoalieInfo | null;
type Skaters = Skater | SkaterInfo | null;
type PlayerInfo = (GoalieInfo | SkaterInfo | null) & SeasonField;
type AllPlayers = (Goalies | Skaters | null) & SeasonField;

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
