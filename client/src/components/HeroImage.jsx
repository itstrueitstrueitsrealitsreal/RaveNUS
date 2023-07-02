import React, { useState } from 'react';

export default function HeroImage() {
  console.log('HeroImage Component called');

  setInterval(updateTime, 1000);

  const now = new Date().toLocaleTimeString();

  const [time, setTime] = useState(now);

  function updateTime() {
    setTime(new Date().toLocaleTimeString());
  }
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className="p-5 text-center bg-image"
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: 400 }}
      >
        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">{time}</h1>
              <h1 className="mb-3">"Hunger knows no friend but its feeder."</h1>
              <h4 className="mb-3">Aristophones</h4>
              <a className="btn btn-outline-light btn-lg" href="#!" role="button">
                Generate Recommendation
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
