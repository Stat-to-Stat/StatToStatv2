import axios from 'axios';

// Single Player Stats and Bio (Goalies included)

export const singlePlayer = async (id) => {
  let player = null;
  await axios
    .get(`https://api-web.nhle.com/v1/player/${id}/landing`)
    .then((res) => {
      player = res;
    });

  return { player };
};

// All Team Stats

export const teamStats = async () => {
  let teams = null;
  await axios
    .get('https://api.nhle.com/stats/rest/en/team/summary?')
    .then((res) => {
      teams = res.data;
    });
  return { teams };
};
