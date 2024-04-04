// import jsonp from 'jsonp';
import { Player, Skater, Goalie } from "../interfaces/Player";
import SkaterInfo from "../interfaces/SkaterInfo";

const fetchData = async <T>(url: string): Promise<T | T[] | null> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};

const fetchSingleData = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return <T>{};
  }
};
// Single Player Stats and Bio (Goalies included)

export const getPlayer = async (id: number): Promise<SkaterInfo> => {
  const player = await fetchSingleData<SkaterInfo>(
    `/api-web/v1/player/${id}/landing`
  );
  return player;
};

export const getAllPlayers = async (): Promise<Player[]> => {
  try {
    let players: Player[] = [];
    const skaters = await fetchData<Skater>(
      "/api/stats/rest/en/skater/summary?isAggregate=false&isGame=false&limit=-1&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20232024"
    );
    const goalies = await fetchData<Goalie>(
      "/api/stats/rest/en/goalie/summary?isAggregate=false&isGame=false&limit=-1&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId%3E=20232024"
    );
    const valid = Array.isArray(skaters) && Array.isArray(goalies);
    if (valid) {
      skaters.forEach((skater) => (skater.type = "Skater"));
      goalies.forEach((goalie) => (goalie.type = "Goalie"));
      players = [...(skaters || []), ...(goalies || [])];
    }
    return players;
  } catch (error) {
    console.error("Error fetching player data:", error);
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
