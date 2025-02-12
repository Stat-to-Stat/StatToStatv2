import {
  ApiResponse,
  PlayerData,
  PlayerSearchResult,
  PlayerType,
} from "../interfaces/Player";

const BASE_URL = "/api/stats/rest/en";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API request failed: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

export function formatSeason(season: string): string {
  return season.replace(/-/g, "");
}

export async function getPlayersBySeasonAndType(
  season: string,
  type?: PlayerType
): Promise<PlayerSearchResult[]> {
  const formattedSeason = formatSeason(season);
  const queryParams = `isAggregate=false&isGame=false&limit=-1&factCayenneExp=gamesPlayed%3E=1&cayenneExp=gameTypeId=2%20and%20seasonId=${formattedSeason}`;

  try {
    if (type === "Goalie") {
      const response = await fetchApi<ApiResponse<PlayerSearchResult[]>>(
        `${BASE_URL}/goalie/summary?${queryParams}`
      );
      return response.data.map((player) => ({ ...player, type: "Goalie" }));
    }

    if (type === "Skater") {
      const response = await fetchApi<ApiResponse<PlayerSearchResult[]>>(
        `${BASE_URL}/skater/summary?${queryParams}`
      );
      return response.data.map((player) => ({ ...player, type: "Skater" }));
    }

    // If no type specified, fetch both
    const [skaters, goalies] = await Promise.all([
      fetchApi<ApiResponse<PlayerSearchResult[]>>(
        `${BASE_URL}/skater/summary?${queryParams}`
      ),
      fetchApi<ApiResponse<PlayerSearchResult[]>>(
        `${BASE_URL}/goalie/summary?${queryParams}`
      ),
    ]);

    return [
      ...skaters.data.map((player) => ({ ...player, type: "Skater" as const })),
      ...goalies.data.map((player) => ({ ...player, type: "Goalie" as const })),
    ];
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
}

export async function getPlayerDetail(
  playerId: number,
  season?: string
): Promise<PlayerData> {
  const seasonParam = season
    ? formatSeason(season)
    : formatSeason(
        `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
      );

  try {
    const response = await fetchApi<ApiResponse<PlayerData>>(
      `/api-web/v1/player/${playerId}/landing?seasonId=${seasonParam}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching player ${playerId}:`, error);
    throw error;
  }
}
