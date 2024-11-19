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
import { HeaderInterface } from "../interfaces/ModalInterface";

type Order = "asc" | "desc";
// type SortableKey = keyof SkaterInfo | keyof GoalieInfo | keyof SeasonField;

interface PlayerTableProps {
  players: PlayerInfo[];
  currentSkaterHeaders: HeaderInterface[];
}

interface TableHeaderName {
  key: string;
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
          align="left"
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

const PlayerTable: React.FC<PlayerTableProps> = ({
  players,
  currentSkaterHeaders: skaterHeaders,
}) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("firstName");

  // useEffect(() => {
  //   console.log("Players data:", players);
  // }, [players]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = useMemo(
    () => [...players].sort(getComparator(order, orderBy)),
    [order, orderBy, players]
  );

  function toCamelCase(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((word, index) => {
        return index === 0
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  }

  const skaterTableHeaders: TableHeaderName[] = skaterHeaders.map(
    (skaterStatHeader) => {
      return {
        key: toCamelCase(skaterStatHeader.header),
        name: skaterStatHeader.header,
        numeric: skaterStatHeader.isNumeric,
      };
    }
  );

  function getPlayerStat(
    player: PlayerInfo,
    statHeader: HeaderInterface
  ): string {
    console.log("hit");
    if (player == null) return "N/A";

    let playerValue: any = player;
    statHeader.keys.forEach((stat) => {
      playerValue = playerValue[stat];
      console.log(playerValue);
    });

    return playerValue;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              tableHeaders={skaterTableHeaders}
            />

            <TableBody>
              {sortedRows.map((player, index) => (
                // if(player is not Skater) return;

                <TableRow hover key={index}>
                  {skaterHeaders.map((statHeader, index) => (
                    <TableCell key={index}>
                      {getPlayerStat(player, statHeader)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>

            {/* Goalie Body */}
            {/* <TableBody>
              {sortedRows.map((player, index) => (
                <TableRow hover key={index}>
                  <TableCell>{getPlayerName(player)}</TableCell>
                  <TableCell>{getPlayerTeam(player)}</TableCell>
                  <TableCell>{getPlayerNumber(player)}</TableCell>
                  <TableCell>{getPlayerGamesPlayed(player)}</TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PlayerTable;
