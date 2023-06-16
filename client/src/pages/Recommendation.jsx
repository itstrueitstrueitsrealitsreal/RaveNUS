import React from "react";
import Rec from "../components/rec/Rec";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Recommendation(props) {
  console.log("Recommendation Page called");

  const navigate = useNavigate();

  const navigateToNewRec = () => {
      navigate('/recommendation');
  }

  const cont = (
    <div>
      <h1>RECOMMENDATION PAGE</h1>
      <Rec recPage={navigateToNewRec}/>
    </div> )

  return <Navbar content={cont} />
}

export default Recommendation;