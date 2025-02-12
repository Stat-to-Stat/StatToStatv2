export interface Player {
  playerId: number;
  isActive: boolean;
  currentTeamId: number;
  currentTeamAbbrev: string;
  fullTeamName: LocalizedString;
  teamCommonName: LocalizedString;
  teamPlaceNameWithPreposition: LocalizedString;
  firstName: LocalizedString;
  lastName: LocalizedString;
  badges: Badge[];
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
  birthCity: LocalizedString;
  birthStateProvince: LocalizedString;
  birthCountry: string;
  shootsCatches: string;
  draftDetails: DraftDetails;
  playerSlug: string;
  inTop100AllTime: number;
  inHHOF: number;
  featuredStats: FeaturedStats;
  careerTotals: CareerTotals;
  shopLink: string;
  twitterLink: string;
  watchLink: string;
  last5Games: GameStats[];
  seasonTotals: SeasonStats[];
}

interface LocalizedString {
  default: string;
  [key: string]: string;
}

interface Badge {
  logoUrl: LocalizedString;
  title: LocalizedString;
}

interface DraftDetails {
  year: number;
  teamAbbrev: string;
  round: number;
  pickInRound: number;
  overallPick: number;
}

interface FeaturedStats {
  season: number;
  regularSeason: SubSeasonStats;
}

interface SubSeasonStats {
  subSeason: Stats;
  career: Stats;
}

interface CareerTotals {
  regularSeason: CareerStats;
  playoffs: CareerStats;
}

interface CareerStats extends Stats {
  avgToi?: string;
  faceoffWinningPctg?: number;
}

interface Stats {
  assists: number;
  gameWinningGoals: number;
  gamesPlayed: number;
  goals: number;
  otGoals?: number;
  pim: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  powerPlayPoints?: number;
  shootingPctg?: number;
  shorthandedGoals: number;
  shorthandedPoints?: number;
  shots: number;
}

interface GameStats extends Stats {
  gameDate: string;
  gameId: number;
  gameTypeId: number;
  homeRoadFlag: string;
  opponentAbbrev: string;
  shifts: number;
  teamAbbrev: string;
  toi: string;
}

interface SeasonStats extends Stats {
  gameTypeId: number;
  leagueAbbrev: string;
  season: number;
  sequence: number;
  teamName: LocalizedString;
  teamCommonName?: LocalizedString;
  teamPlaceNameWithPreposition?: LocalizedString;
  avgToi?: string;
  faceoffWinningPctg?: number;
}
