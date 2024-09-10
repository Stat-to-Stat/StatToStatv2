import React, { useState, useMemo, useEffect } from "react";
import {
  Paper,
  TableSortLabel,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { GoalieInfo } from "../interfaces/Goalie";
import { SkaterInfo } from "../interfaces/Skater";
import { PlayerInfo, SeasonField } from "../interfaces/Player";

type Order = "asc" | "desc";
type SortableKey = keyof SkaterInfo | keyof GoalieInfo | keyof SeasonField;

interface PlayerTableProps {
  players: PlayerInfo[];
}

interface TableHeaderName {
  key: SortableKey;
  name: string;
  numeric: boolean;
}

interface EnhancedTableHeadProps {
  order: Order;
  orderBy: SortableKey;
  onRequestSort: (property: SortableKey) => void;
  tableHeaders: TableHeaderName[];
}

const isSkaterInfo = (player: PlayerInfo): player is SkaterInfo =>
  player !== null && "seasonTotals" in player && "skaterFullName" in player;

const isGoalieInfo = (player: PlayerInfo): player is GoalieInfo =>
  player !== null && "seasonTotals" in player && "goalieFullName" in player;

const isSeasonField = (player: PlayerInfo): player is SeasonField =>
  player !== null && "selectedSeason" in player;

const descendingComparator = (
  a: PlayerInfo,
  b: PlayerInfo,
  orderBy: SortableKey
): number => {
  if (!a || !b) return 0;
  if (isSeasonField(a) || isSeasonField(b)) return 0;
  if (a[orderBy] < b[orderBy]) return 1;
  if (a[orderBy] > b[orderBy]) return -1;
  return 0;
};

const getComparator = (
  order: Order,
  orderBy: SortableKey
): ((a: PlayerInfo, b: PlayerInfo) => number) =>
  order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

const EnhancedTableHead: React.FC<EnhancedTableHeadProps> = ({
  order,
  orderBy,
  onRequestSort,
  tableHeaders,
}) => (
  <TableHead>
    <TableRow>
      {tableHeaders.map((header) => (
        <TableCell
          key={header.key}
          align={header.numeric ? "right" : "left"}
          sortDirection={orderBy === header.key ? order : false}>
          <TableSortLabel
            active={orderBy === header.key}
            direction={orderBy === header.key ? order : "asc"}
            onClick={() => onRequestSort(header.key)}>
            {header.name}
            {orderBy === header.key && (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            )}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortableKey>("firstName");

  useEffect(() => {
    console.log("Players data:", players);
  }, [players]);

  const handleRequestSort = (property: SortableKey) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = useMemo(
    () => [...players].sort(getComparator(order, orderBy)),
    [order, orderBy, players]
  );

  const tableHeaders: TableHeaderName[] = [
    { key: "firstName", name: "Name", numeric: false },
    { key: "fullTeamName", name: "Team", numeric: false },
    { key: "sweaterNumber", name: "Jersey Number", numeric: true },
    { key: "gamesPlayed", name: "Games Played", numeric: true },
  ];

  const getPlayerName = (player: PlayerInfo) => {
    console.log("Getting name for player:", player);
    if (isSkaterInfo(player)) {
      return player.firstName.default + " " + player.lastName.default || "N/A";
    }
    if (isGoalieInfo(player)) {
      return player.firstName.default + " " + player.lastName.default || "N/A";
    }
    return "N/A";
  };

  const getPlayerTeam = (player: PlayerInfo) => {
    console.log("Getting team for player:", player);
    if (isSkaterInfo(player) || isGoalieInfo(player)) {
      return player.fullTeamName?.default || "N/A";
    }
    return "N/A";
  };

  const getPlayerNumber = (player: PlayerInfo) => {
    console.log("Getting number for player:", player);
    if (isSkaterInfo(player) || isGoalieInfo(player)) {
      return player.sweaterNumber || "N/A";
    }
    return "N/A";
  };

  const getPlayerGamesPlayed = (player: PlayerInfo) => {
    console.log("Getting games played for player:", player);
    if (isSkaterInfo(player) || isGoalieInfo(player)) {
      const stats = player.seasonTotals.find(
        (stats) => stats.season.toString() === player.selectedSeason
      );
      return stats?.gamesPlayed ?? "N/A";
    }
    return "N/A";
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              tableHeaders={tableHeaders}
            />
            <TableBody>
              {sortedRows.map((player, index) => (
                <TableRow hover key={index}>
                  <TableCell>{getPlayerName(player)}</TableCell>
                  <TableCell>{getPlayerTeam(player)}</TableCell>
                  <TableCell>{getPlayerNumber(player)}</TableCell>
                  <TableCell>{getPlayerGamesPlayed(player)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PlayerTable;
