type Skater = {
  type: "Skater";
  assists: number;
  evGoals: number;
  evPoints: number;
  faceoffWinPct: number;
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  lastName: string;
  otGoals: number;
  penaltyMinutes: number;
  playerId: number;
  plusMinus: number;
  points: number;
  pointsPerGame: number;
  positionCode: string;
  ppGoals: number;
  ppPoints: number;
  seasonId: number;
  shGoals: number;
  shPoints: number;
  shootingPct: number;
  shootsCatches: string;
  shots: number;
  skaterFullName: string;
  teamAbbrevs: string;
  timeOnIcePerGame: number;
};

type SkaterInfo = {
  gamesPlayed: number;
  type: "SkaterInfo";
  playerId: number;
  skaterFullName: string;
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
  birthStateProvince: {
    english: string;
    french: string;
  };
  birthCountry: string;
  shootsCatches: string;
  draftDetails: {
    year: number;
    teamAbbrev: string;
    roundTaken: number;
    pickInRound: number;
    overallPick: number;
  };
  playerSlug: string;
  inTop100AllTime: number;
  inHOF: number;
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
};

type LastGame = {
  assists: number;
  gameDate: string;
  gameId: number;
  gameTypeId: number;
  goals: number;
  homeRoadFlag: string;
  opponentAbbrev: string;
  penaltyMins: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  shifts: number;
  shorthandedGoals: number;
  shots: number;
  teamAbbrev: string;
  toi: string;
};

type FeaturedStats = {
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  penaltyMins: number;
  gameWinningGoals: number;
  otGoals: number;
  shots: number;
  shootingPctg: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  shorthandedGoals: number;
  shorthandedPoints: number;
};

type CareerStats = {
  gamesPlayed: number;
  goals: number;
  assists: number;
  penaltyMins: number;
  points: number;
  plusMinus: number;
  powerPlayGoals: number;
  powerPlayPoints: number;
  shorthandedPoints: number;
  gameWinningGoals: number;
  otGoals: number;
  shots: number;
  shootingPctg: number;
  faceoffWinningPctg: number;
  avgToi: string;
  shorthandedGoals: number;
};

type SeasonTotals = {
  assists: number;
  avgToi?: string;
  faceoffWinningPctg?: number;
  gameTypeId: number;
  gameWinningGoals?: number;
  gamesPlayed: number;
  goals: number;
  leagueAbbrev: string;
  otGoals?: number;
  penaltyMins: number;
  plusMinus?: number;
  points: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  season: number;
  sequence: number;
  shootingPctg?: number;
  shorthandedGoals?: number;
  shorthandedPoints?: number;
  shots?: number;
  teamName: {
    english: string;
    french?: string;
    czech?: string;
    german?: string;
    finnish?: string;
    danish?: string;
    swedish?: string;
  };
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
      goals: number;
      assists: number;
      points: number;
      plusMinus: number;
      hits: number;
      blockedShots: number;
      penaltyMins: number;
    }
  ];
};

export type { Skater, SkaterInfo };
