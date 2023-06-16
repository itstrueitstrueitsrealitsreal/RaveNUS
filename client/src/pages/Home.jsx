import React from "react";
// import HeroImage from "../components/HeroImage";
import CenteredHero from "../components/CenteredHero";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home(props) {
  console.log("Home Page called");

  const navigate = useNavigate();

  const navigateToNewRec = () => {
      navigate('/recommendation');
  }

  const cont = 
      <div>
        {/* <HeroImage /> */}
        <CenteredHero recPage={navigateToNewRec} />
      </div>;

  return <Navbar content={cont} />
}

export default Home;