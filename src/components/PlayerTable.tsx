import React, {useState, useMemo} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';

import { Player, Goalie, Skater } from "../interfaces/Player"

interface PlayerTableInterface {
  players: Player[];
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Skater | keyof Goalie;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected?: number;
  onRequestSort: (event: React.MouseEvent<unknown>, headerId: keyof Skater | keyof Goalie) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  tableHeaders: TableHeaderName[];
}

interface TableHeaderName {
  name: string,
  key: keyof Goalie | keyof Skater,
  numeric: boolean
}

type Order = 'asc' | 'desc';

function isSkater(player: Goalie | Skater | undefined | null): player is Skater {
  return player != undefined && player.type === 'Skater';
}

function isGoalie(player: Goalie | Skater | undefined | null): player is Goalie {
  return player != undefined && player.type === 'Goalie';
}


function descendingComparator(a: Player, b: Player, orderBy: keyof Skater | keyof Goalie): number {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  if ((!isSkater(a) && !isSkater(b)) && (!isGoalie(a) || !isGoalie(b))) {
    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof Skater | keyof Goalie>(
  order: Order,
  orderBy: Key,
): (
  a: Player,
  b: Player,
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, tableHeaders } =
    props;

  const createSortHandler =
    (headerId: keyof Skater | keyof Goalie) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, headerId);
    };

  const headCells: readonly HeadCell[] = tableHeaders.map<HeadCell>((tableHeader) => ({
    id: tableHeader.key,
    numeric: tableHeader.numeric,
    disablePadding: false,
    label: tableHeader.name,
  }))

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function PlayerTable({players}: PlayerTableInterface) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Skater | keyof Goalie>('skaterFullName');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    headerId: keyof Skater | keyof Goalie,
  ) => {
    const isAsc = orderBy === headerId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(headerId);
  };

  const visibleRows: Player[] = useMemo(
    () =>
      stableSort<Player>(players, getComparator(order, orderBy)),
    [order, orderBy, players],
  );

  // Will be needed to be changed dynamicly from table stats state/hook from modal to here
  const tableHeaders: TableHeaderName[] = [
    {key: "skaterFullName", name: "Full Name", numeric: false}, 
    {key: "gamesPlayed", name: "Games Played", numeric: true}
  ];

  // In future maybe make rows for players dynamic aligning with dynamic headers, and handle N/A stats
  /// N/A stat example: Stat for goals, Goalie doesn't have it? Display "N/A" for that stat
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={players.length}
              tableHeaders={tableHeaders}
            />
            <TableBody>
              {visibleRows.map((row: Player) => {

                if(isSkater(row)){
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.playerId}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      {row.skaterFullName}
                    </TableCell>
                    <TableCell align="right">{row.gamesPlayed}</TableCell>
                  </TableRow>
                );
              }
              else if(isGoalie(row)){
                return (
                  <></>
                );
              }else{
                return(
                  <></>
                )
              }

              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}