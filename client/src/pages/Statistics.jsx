import React from 'react';
import Navbar from '../components/Navbar';

function Statistics() {
  console.log('Statistics Page called');

  const cont = <div><h1>STATISTICS PAGE</h1></div>;

  return <Navbar content={cont} />;
}

export default Statistics;
