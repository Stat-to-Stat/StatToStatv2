import { useState, useEffect } from 'react';

import PlayerTombstone from './components/PlayerTombstone';
import FilterModal from './components/FilterModal';
import PlayerModal from './components/PlayerModal';
import PlayerTable from './components/PlayerTable';
import { Player, Goalie, Skater } from './interfaces/Player';
import SkaterInfo from './interfaces/SkaterInfo';
import { getAllPlayers, getPlayer } from './api/nhlApi';
import './App.css';

const tombStoneSeperator: React.CSSProperties = {
  backgroundColor: 'rgb(46 55 95)',
  width: '2px',
  height: '100%',
};

function App() {
  // For player drop down
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [currentPlayers, setCurrentPlayers] = useState<SkaterInfo[]>([]);

  // Get players
  useEffect(() => {
    const fetchData = async () => {
      try {
        const players = await getAllPlayers();
        setPlayerList(players);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  function isSkater(
    player: Goalie | Skater | SkaterInfo | null
  ): player is Skater {
    return player != null && player.type === 'Skater';
  }

  // function isGoalie(player: Goalie | Skater | null): player is Goalie {
  //   return player != null && player.type === 'Goalie';
  // }

  const addPlayer = (player: Player) => {
    if (isSkater(player)) {
      getPlayer(player.playerId).then((currPlayer: SkaterInfo) => {
        setCurrentPlayers((prevPlayers) => [...prevPlayers, currPlayer]);
      });
    }
  };

  return (
    <div className='page-container'>
      <div className='comparison-container gap-sm'>
        <div className='row gap-sm'>
          <h2>Player Comparison</h2>
          <h2>Team Comparison</h2>
        </div>
        <div className='graveyard'>
          {currentPlayers.map((player, index) => {
            return (
              <>
                <PlayerTombstone
                  player={player}
                  key={player.playerId + index}
                />

                {/* {index + 1 < currentPlayers.length ? (
                  <div style={tombStoneSeperator} key={index}></div>
                ) : (
                  ''
                )} */}
              </>
            );
          })}
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
        <PlayerTable players={currentPlayers} />
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
