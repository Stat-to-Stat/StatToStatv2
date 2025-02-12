export interface LocalizedString {
  default: string;
  fr?: string;
  [key: string]: string | undefined;
}

export interface PlayerBase {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  firstName: LocalizedString;
  lastName: LocalizedString;
  fullTeamName: LocalizedString;
  teamCommonName: LocalizedString;
  headshot: string;
  position: "G" | "C" | "LW" | "RW" | "D";
  playerSlug: string;
}

// Stats interfaces separated by player type
export interface SkaterStats {
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  powerPlayGoals: number;
  shorthandedGoals: number;
  shots: number;
  shootingPctg?: number;
}

export interface GoalieStats {
  gamesPlayed: number;
  gamesStarted: number;
  wins: number;
  losses: number;
  otLosses: number;
  goalsAgainstAvg: number;
  savePctg: number;
  shutouts: number;
  timeOnIce: string;
}

// Season-specific interfaces
export interface SeasonInfo {
  season: string;
  regularSeason: {
    skater?: SkaterStats;
    goalie?: GoalieStats;
  };
}

// Main interfaces for API responses
export interface PlayerData extends PlayerBase {
  seasonStats: SeasonInfo[];
}

export interface ApiResponse<T> {
  data: T;
}

export type PlayerType = "Skater" | "Goalie";

export interface PlayerSearchResult extends PlayerBase {
  type: PlayerType;
  currentSeasonStats: SeasonInfo;
}
