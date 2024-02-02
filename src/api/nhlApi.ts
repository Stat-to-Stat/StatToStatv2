import axios, { AxiosResponse } from 'axios';

// Single Player Stats and Bio (Goalies included)

// export const getPlayer = async (id) => {
//   let player = null;
//   await axios
//     .get(`https://api-web.nhle.com/v1/player/${id}/landing`)
//     .then((res) => {
//       player = res;
//     });

//   return player;
// };

// Implement Player type! :)
// interface Player {
//   name: string;
//   position: string;
//   // Add other properties as needed
// }

export const getAllPlayers = async (): Promise<unknown[]> => {
  
  try {
    let skaters: AxiosResponse<unknown[]> | null = null;
    skaters = await axios.get(`https://api-web.nhle.com/v1/skater-stats-leaders/20232024/2?limit=-1`);

    let goalies: AxiosResponse<unknown[]> | null = null;
    goalies = await axios.get(`https://api-web.nhle.com/v1/goalie-stats-leaders/20232024/2?limit=-1`);
    
    const players: unknown[] | null = [...(skaters?.data || []), ...(goalies?.data || [])];
    return players;
  } 
  catch (error) {
    console.error('Error fetching goalie data:', error);
    return [];
  }
  };

// // Player Stat Leaders

// export const getPlayerStatLeaders = async (
//   season = 'current',
//   stat,
//   gameType,
//   limit = 10
// ) => {
//   let playerStats = null;
//   await axios
//     .get(
//       `https://api-web.nhle.com/v1/skater-stats-leaders/${season}/${gameType}?categories=${stat}&limit=${limit}`
//     )
//     .then((res) => {
//       playerStats = res;
//     });
//   return playerStats;
// };

// // Goalie Stat Leaders

// export const getGoalieStatLeaders = async (
//   season = 'current',
//   stat,
//   limit = 10
// ) => {
//   let goalieStats = null;
//   await axios
//     .get(
//       `https://api-web.nhle.com/v1/goalie-stats-leaders/${season}?categories=${stat}&limit=${limit}`
//     )
//     .then((res) => {
//       goalieStats = res;
//     });
//   return goalieStats;
// };

// // All Team Stats (Current stats are sorted based on specific stat. Order can be used to determine current league ranking in specific stats)

// export const getTeamStats = async (stat, season = 20232024, gameType = 2) => {
//   let teamStats = null;
//   await axios
//     .get(
//       `https://api.nhle.com/stats/rest/en/team/summary?sort=${stat}&cayenneExp=seasonId=${season}%20and%20gameTypeId=${gameType}`
//     )
//     .then((res) => {
//       teamStats = res.data;
//     });
//   return teamStats;
// };

// // Team List (both active and inactive teams)

// export const getTeamList = async () => {
//   let teams = null;
//   await axios.get('https://api.nhle.com/stats/rest/en/team').then((res) => {
//     teams = res.data;
//   });
//   return teams;
// };

// // Single Team Roster

// export const getTeamRoster = async (TEAM_ABBR, season = 20232024) => {
//   let roster = null;
//   await axios
//     .get(`https://api-web.nhle.com/v1/roster/${TEAM_ABBR}/${season}`)
//     .then((res) => {
//       roster = res;
//     });
//   return roster;
// };

// // Team Seasons (All seasons specific team has participated in)

// export const getTeamSeasons = async (TEAM_ABBR) => {
//   let seasons = null;
//   await axios
//     .get(`https://api-web.nhle.com/v1/roster-season/${TEAM_ABBR}`)
//     .then((res) => {
//       seasons = res;
//     });
//   return seasons;
// };
