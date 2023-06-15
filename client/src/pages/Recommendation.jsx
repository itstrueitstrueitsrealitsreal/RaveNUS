import React from "react";
import Rec from "../components/rec/Rec";

function Recommendation(props) {
  console.log("Recommendation Page called");

  return (
    <div>
      <h1>RECOMMENDATION PAGE</h1>
      <Rec recPage={props.recPage} />
    </div>
  )
}

export default Recommendation;