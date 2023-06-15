import React from "react";
// import HeroImage from "../components/HeroImage";
import CenteredHero from "../components/CenteredHero";

function Home(props) {
  console.log("Home Page called");

  return (
    <div>
      {/* <HeroImage /> */}
      <CenteredHero recPage={props.recPage} />
    </div>
  );
}

export default Home;