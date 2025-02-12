export interface Goalie {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: {
    default: string;
    fr?: string;
  };
  teamCommonName: {
    default: string;
  };
  teamPlaceNameWithPreposition: {
    default: string;
    fr?: string;
  };
  firstName: {
    default: string;
  };
  lastName: {
    default: string;
  };
  badges: string[];
  teamLogo: string;
  sweaterNumber: number;
  position: "G";
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
  birthStateProvince?: {
    default: string;
  };
  birthCountry: string;
  shootsCatches: string;
  draftDetails?: {
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
      subSeason: {
        gamesPlayed: number;
        goalsAgainstAvg: number;
        losses: number;
        otLosses: number;
        savePctg: number;
        shutouts: number;
        wins: number;
      };
      career: {
        gamesPlayed: number;
        goalsAgainstAvg: number;
        losses: number;
        otLosses: number;
        savePctg: number;
        shutouts: number;
        wins: number;
      };
    };
  };
  careerTotals: {
    regularSeason: {
      assists: number;
      gamesPlayed: number;
      gamesStarted: number;
      goals: number;
      goalsAgainst: number;
      goalsAgainstAvg: number;
      losses: number;
      otLosses: number;
      pim: number;
      savePctg: number;
      shotsAgainst: number;
      shutouts: number;
      timeOnIce: string;
      wins: number;
    };
  };
  shopLink: string;
  twitterLink: string;
  watchLink: string;
  last5Games: {
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
    toi: string;
  }[];
  seasonTotals: {
    gameTypeId: number;
    gamesPlayed: number;
    goalsAgainst: number;
    goalsAgainstAvg: number;
    leagueAbbrev: string;
    losses: number;
    season: number;
    sequence: number;
    shutouts: number;
    teamName: {
      default: string;
    };
    ties?: number;
    timeOnIce: string;
    wins: number;
    otLosses?: number;
    savePctg?: number;
    shotsAgainst?: number;
    teamCommonName?: {
      default: string;
      [key: string]: string;
    };
  }[];
}
