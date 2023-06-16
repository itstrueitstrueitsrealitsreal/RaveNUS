import React from "react";
import Navbar from "../components/Navbar";

function Settings() {
  console.log("Settings Page called");

  const cont = <div><h1>SETTINGS PAGE</h1></div>;
  
  return <Navbar content={cont} />
}

export default Settings;