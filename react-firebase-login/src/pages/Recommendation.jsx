import React from "react";
import Rec from "../components/rec/Rec";

function Recommendation(props) {
  return (
    <div>
      <h1>RECOMMENDATION PAGE</h1>
      <Rec recPage={props.recPage} />
    </div>
  )
}

export default Recommendation;