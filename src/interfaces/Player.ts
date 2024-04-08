import Skater from "./Skater";
import Goalie from "./Goalie";
import GoalieInfo from "./GoalieInfo";
import SkaterInfo from "./SkaterInfo";

type Goalies = Goalie | GoalieInfo | null;
type Skaters = Skater | SkaterInfo | null;

type AllPlayers = Goalies | Skaters;

export type {
  AllPlayers,
  Goalie,
  Goalies,
  GoalieInfo,
  Skater,
  Skaters,
  SkaterInfo,
};
