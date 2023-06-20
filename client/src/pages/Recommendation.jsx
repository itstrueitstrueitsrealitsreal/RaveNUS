import React from "react";
import Rec from "../components/rec/Rec";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";

function Recommendation(props) {
  console.log("Recommendation Page called");

  const navigate = useNavigate();

  const navigateToNewRec = () => {
      navigate('/recommendation');
  }

  const location = {
    address: 'Computing Drive',
    lat: 1.2944816303761464, 
    lng: 103.77255175825597
  }

  const cont = (
    <div>
      <h1>The Deck</h1>
      <MapComponent location={location}/>
      <Rec recPage={navigateToNewRec}/>
    </div> )

  return <Navbar content={cont} />
}

export default Recommendation;