import React, {useState} from 'react';

export default function CenteredHero(props) {
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);
  setInterval(updateTime, 1000);

  function updateTime() {
    setTime(new Date().toLocaleTimeString());
  }
  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">{time}</h1>
        <h1 className="display-5 fw-bold text-body-emphasis">"Hunger knows no friend but its feeder."</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">-Aristophenes</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button onClick={props.recPage} type="button" className="btn btn-primary btn-lg px-4 gap-3">Generate Recommendation</button>
          </div>
        </div>
      </div>
    </div>
  );
}