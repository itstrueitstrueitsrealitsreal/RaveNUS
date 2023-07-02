import React from 'react';
import Navbar from '../components/Navbar';

function Leaderboard() {
  console.log('Leaderboard Page called');

  const cont = <div><h1>LEADERBOARD PAGE</h1></div>;

  return <Navbar content={cont} />;
}

export default Leaderboard;
