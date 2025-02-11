import { Skater } from "./Skater";
import { Goalie } from "./Goalie";

type Goalies = Goalie | null;
type Skaters = Skater | null;
type AllPlayers = Goalies & Skaters;

export type { AllPlayers, Goalie, Goalies, Skater, Skaters };
