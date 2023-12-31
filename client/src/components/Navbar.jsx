import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
  console.log('Navbar called');

  // page navigation
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  };

  const navigateToStatistics = () => {
    navigate('/statistics');
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToReviews = () => {
    navigate('/reviews');
  };

  const navigateToSync = () => {
    navigate('/sync');
  };

  const navigateToLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div>
      <div className="d-flex" id="wrapper">
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom bg-light">RaveNUS</div>
          <div className="list-group list-group-flush">
            <a onClick={navigateToHome} name="Home" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Home</a>
            <a onClick={navigateToStatistics} name="Statistics" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Statistics</a>
            <a onClick={navigateToProfile} name="Profile" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
            <a onClick={navigateToReviews} name="Reviews" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Reviews</a>
            <a onClick={navigateToSync} name="Sync" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Sync</a>
            <a onClick={navigateToLeaderboard} name="Leaderboard" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Leaderboard</a>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid" id="main-content">
            {props.content}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Navbar;
