import { useState, useEffect } from 'react';

import PlayerTombstone from './components/PlayerTombstone';
import FilterModal from './components/FilterModal';
import PlayerModal from './components/PlayerModal';
import PlayerTable from './components/PlayerTable';
import { Player, Goalie, Skater } from './interfaces/Player';

import { getAllPlayers } from './api/nhlApi';
import './App.css';

function App() {
  // For player drop down
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);

  // Get players
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const players = await getAllPlayers();
        const players = await getAllPlayers();
        setPlayerList(players);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  // console.log(playerList);

  const addPlayer = (player: Player) => {
    console.log(player);
    setCurrentPlayers((prevPlayers) => [...prevPlayers, player]);
  };
  console.log(currentPlayers);

  return (
    <div className='page-container'>
      <div className='comparison-container gap-sm'>
        <div className='row gap-sm'>
          <h2>Player Comparison</h2>
          <h2>Team Comparison</h2>
        </div>
        <div className='graveyard'>
          {/* <PlayerTombstone player={player1} />
          <PlayerTombstone player={player2} /> */}
        </div>
        <div className='row gap-sm'>
          <FilterModal modalName={'Filter Stats'} />
          <PlayerModal
            modalName={'Add Player'}
            players={playerList}
            addPlayer={addPlayer}
          />
        </div>
        {/* Will need to pass in selected players, or an array of players to display their data */}
        <PlayerTable />
      </div>
    </div>
  );
}

export default App;

// Below is for select player
/*
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="center-items">
            <h3>Pick a player</h3>

          </CardContent>
        </Card>
*/
