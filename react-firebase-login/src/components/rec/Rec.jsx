import React from "react";

function Rec(props) {
  return <div>
    <h1>Recommendation: {Math.floor(Math.random()*10)}</h1>
    <h2>Not to your liking?</h2>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button onClick={props.recPage} type="button" class="btn btn-primary btn-lg px-4 gap-3">Generate ANOTHER Recommendation</button>
    </div>
  </div>
}

export default Rec;