import React from "react";

function Rec(props) {
  console.log("Rec Component called");

  const stalls = props.stalls;
  const randomIndex = Math.floor(Math.random() * stalls.length);
  const recStall = stalls[randomIndex];

  return <div>
    <h1>Recommendation: {recStall.name}</h1>
    <h2>Average Rating: {recStall.rating}/5</h2>

    <br />
    <br />
    <h2>Not to your liking?</h2>
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button onClick={props.recPage} type="button" className="btn btn-primary btn-lg px-4 gap-3">Generate ANOTHER Recommendation</button>
    </div>
  </div>
}

export default Rec;