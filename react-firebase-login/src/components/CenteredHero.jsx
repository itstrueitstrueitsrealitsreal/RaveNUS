import React, {useState} from 'react';

export default function CenteredHero() {
  const [time, setTime] = useState(now);
  setInterval(updateTime, 1000);

  const now = new Date().toLocaleTimeString();

  function updateTime() {
    setTime(new Date().toLocaleTimeString());
  }
  return (
    <div>
      <div class="px-4 py-5 my-5 text-center">
        <h1 class="display-5 fw-bold text-body-emphasis">{time}</h1>
        <h1 class="display-5 fw-bold text-body-emphasis">"Hunger knows no friend but its feeder."</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">-Aristophenes</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Generate Recommendation</button>
          </div>
        </div>
      </div>
    </div>
  );
}