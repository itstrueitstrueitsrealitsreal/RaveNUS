import React from "react";

function Recommendation(props) {
  return (
    <div>
      <h1>Recommendation PAGE</h1>
      <h2>{props.rec}</h2>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button onClick={props.recPage} type="button" class="btn btn-primary btn-lg px-4 gap-3">Generate Recommendation</button>
      </div>
    </div>
  )
}

export default Recommendation;