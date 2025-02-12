import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { SkaterStats, GoalieStats } from "../interfaces/Player";

interface StatsTableProps {
  stats: (SkaterStats | GoalieStats)[];
  playerNames: string[];
  playerType: ("Skater" | "Goalie")[];
  seasons: string[];
}

const StatsTable: React.FC<StatsTableProps> = ({
  stats,
  playerNames,
  playerType,
  seasons,
}) => {
  if (stats.length === 0) return null;

  const renderHeader = () => {
    if (playerType[0] === "Skater") {
      return (
        <TableRow>
          <TableCell>Player</TableCell>
          <TableCell>Season</TableCell>
          <TableCell align="right">GP</TableCell>
          <TableCell align="right">G</TableCell>
          <TableCell align="right">A</TableCell>
          <TableCell align="right">P</TableCell>
          <TableCell align="right">+/-</TableCell>
          <TableCell align="right">PIM</TableCell>
          <TableCell align="right">PPG</TableCell>
          <TableCell align="right">SHG</TableCell>
          <TableCell align="right">S</TableCell>
          <TableCell align="right">S%</TableCell>
        </TableRow>
      );
    }
    return (
      <TableRow>
        <TableCell>Player</TableCell>
        <TableCell>Season</TableCell>
        <TableCell align="right">GP</TableCell>
        <TableCell align="right">GS</TableCell>
        <TableCell align="right">W</TableCell>
        <TableCell align="right">L</TableCell>
        <TableCell align="right">OTL</TableCell>
        <TableCell align="right">GAA</TableCell>
        <TableCell align="right">SV%</TableCell>
        <TableCell align="right">SO</TableCell>
        <TableCell align="right">TOI</TableCell>
      </TableRow>
    );
  };

  const renderRow = (stat: SkaterStats | GoalieStats, index: number) => {
    if ("goals" in stat) {
      const skaterStat = stat as SkaterStats;
      return (
        <TableRow key={`${playerNames[index]}-${seasons[index]}`}>
          <TableCell>{playerNames[index]}</TableCell>
          <TableCell>{seasons[index]}</TableCell>
          <TableCell align="right">{skaterStat.gamesPlayed}</TableCell>
          <TableCell align="right">{skaterStat.goals}</TableCell>
          <TableCell align="right">{skaterStat.assists}</TableCell>
          <TableCell align="right">{skaterStat.points}</TableCell>
          <TableCell align="right">{skaterStat.plusMinus}</TableCell>
          <TableCell align="right">{skaterStat.pim}</TableCell>
          <TableCell align="right">{skaterStat.powerPlayGoals}</TableCell>
          <TableCell align="right">{skaterStat.shorthandedGoals}</TableCell>
          <TableCell align="right">{skaterStat.shots}</TableCell>
          <TableCell align="right">
            {skaterStat.shootingPctg?.toFixed(1)}
          </TableCell>
        </TableRow>
      );
    }

    const goalieStat = stat as GoalieStats;
    return (
      <TableRow key={`${playerNames[index]}-${seasons[index]}`}>
        <TableCell>{playerNames[index]}</TableCell>
        <TableCell>{seasons[index]}</TableCell>
        <TableCell align="right">{goalieStat.gamesPlayed}</TableCell>
        <TableCell align="right">{goalieStat.gamesStarted}</TableCell>
        <TableCell align="right">{goalieStat.wins}</TableCell>
        <TableCell align="right">{goalieStat.losses}</TableCell>
        <TableCell align="right">{goalieStat.otLosses}</TableCell>
        <TableCell align="right">
          {goalieStat.goalsAgainstAvg.toFixed(2)}
        </TableCell>
        <TableCell align="right">{goalieStat.savePctg.toFixed(3)}</TableCell>
        <TableCell align="right">{goalieStat.shutouts}</TableCell>
        <TableCell align="right">{goalieStat.timeOnIce}</TableCell>
      </TableRow>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>{renderHeader()}</TableHead>
        <TableBody>
          {stats.map((stat, index) => renderRow(stat, index))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;
