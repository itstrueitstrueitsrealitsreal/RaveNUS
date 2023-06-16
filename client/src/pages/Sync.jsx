import React from "react";
import Navbar from "../components/Navbar";

function Sync() {
  console.log("Sync Page called");

  const cont = <div><h1>SYNC PAGE</h1></div>;

  return <Navbar content={cont} />
}

export default Sync;