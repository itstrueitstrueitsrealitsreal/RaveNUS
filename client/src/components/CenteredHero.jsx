import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CenteredHero(props) {
  console.log('CenteredHero Component called');

  // page navigation
  const navigate = useNavigate();

  // Current Time
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
            <Button className="btn btn-light" onClick={() => {navigate(props.recPage)}}>Generate Recommendation</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
