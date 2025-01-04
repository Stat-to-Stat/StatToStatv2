interface Goalie {
  selectedSeason: string;
  type: "Goalie";
  assists: number;
  gamesPlayed: number;
  gamesStarted: number;
  goalieFullName: string;
  goals: number;
  goalsAgainst: number;
  goalsAgainstAverage: number;
  lastName: string;
  losses: number;
  otLosses: number;
  penaltyMinutes: number;
  playerId: number;
  points: number;
  savePct: number;
  saves: number;
  seasonId: number;
  shootsCatches: string;
  shotsAgainst: number;
  shutouts: number;
  teamAbbrevs: string;
  ties: null;
  timeOnIce: number;
  wins: number;
}

interface GoalieInfo {
  selectedSeason: string;
  type: "GoalieInfo";
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: {
    default: string;
    french: string;
  };
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  teamLogo: string;
  sweaterNumber: number;
  position: string;
  headshot: string;
  heroImage: string;
  heightInInches: number;
  heightInCentimeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  birthDate: string;
  birthCity: {
    default: string;
  };
  birthCountry: string;
  shootsCatches: string;
  draftDetails: {
    year: number;
    teamAbbrev: string;
    round: number;
    pickInRound: number;
    overallPick: number;
  };
  playerSlug: string;
  inTop100AllTime: number;
  inHHOF: number;
  featuredStats: {
    season: number;
    regularSeason: {
      subSeason: FeaturedStats;
      career: FeaturedStats;
    };
  };
  careerTotals: {
    regularSeason: CareerStats;
    playoffs: CareerStats;
  };
  last5Games: Array<LastGame>;
  seasonTotals: Array<SeasonTotals>;
  awards: Array<Awards>;
}

type FeaturedStats = {
  gamesPlayed: number;
  wins: number;
  losses: number;
  ties?: number;
  otLosses: number;
  shutouts: number;
  goalsAgainstAvg: number;
  savePctg: number;
};

type CareerStats = {
  gamesPlayed: number;
  goals: number;
  assists: number;
  pim: number;
  gamesStarted: number;
  wins: number;
  losses: number;
  otLosses: number;
  shotsAgainst: number;
  goalsAgainst: number;
  goalsAgainstAvg: number;
  savePctg: number;
  shutouts: number;
  timeOnIce: string;
};

type LastGame = {
  decision: string;
  gameDate: string;
  gameId: number;
  gameTypeId: number;
  gamesStarted: number;
  goalsAgainst: number;
  homeRoadFlag: string;
  opponentAbbrev: string;
  penaltyMins: number;
  savePctg: number;
  shotsAgainst: number;
  teamAbbrev: string;
  toi: number;
};

type SeasonTotals = {
  gameTypeId: number;
  gamesPlayed: number;
  goalsAgainst?: number;
  goalsAgainstAvg?: number;
  leagueAbbrev: string;
  losses?: number;
  otLosses?: number;
  savePctg?: number;
  season: number;
  sequence: number;
  shotsAgainst?: number;
  shutouts?: number;
  teamName: {
    english: string;
    czech?: string;
    german?: string;
    finnish?: string;
    french?: string;
    slovak?: string;
    swedish?: string;
  };
  timeOnIce: string;
  wins: number;
};

type Awards = {
  trophy: {
    english: string;
    french: string;
  };
  seasons: [
    {
      seasonId: number;
      gamesPlayed: number;
      gameTypeId: number;
      wins: number;
      losses: number;
      otLosses: number;
      savePctg: number;
      gaa: number;
    }
  ];
};

export type { Goalie, GoalieInfo };
