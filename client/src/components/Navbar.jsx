import React from "react";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Reviews from "../pages/Reviews";
import Sync from "../pages/Sync";
import Leaderboard from "../pages/Leaderboard";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Recommendation from "../pages/Recommendation";
import {Routes, Route, useNavigate} from 'react-router-dom';


function Navbar(props) {
  console.log("Navbar called");

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/signin');
  }

  const navigateToSignUp = () => {
    navigate('/signup');
  }

  const navigateToHome = () => {
    navigate('/home');
  }

  const navigateToStatistics = () => {
    navigate('/statistics');
  }

  const navigateToProfile = () => {
    navigate('/profile');
  }

  const navigateToSettings = () => {
    navigate('/settings');
  }

  const navigateToReviews = () => {
    navigate('/reviews');
  }

  const navigateToSync = () => {
    navigate('/sync');
  }

  const navigateToLeaderboard = () => {
    navigate('/leaderboard');
  }

  const navigateToRecommendation = () => {
    navigate('/recommendation');
  }

  return (
    <div>
    <div className="d-flex" id="wrapper">
              <div className="border-end bg-white" id="sidebar-wrapper">
                  <div className="sidebar-heading border-bottom bg-light">RaveNUS</div>
                  <div className="list-group list-group-flush">
                      <a onClick={navigateToHome} name="Home" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Home</a>
                      <a onClick={navigateToStatistics} name="Statistics" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Statistics</a>
                      <a onClick={navigateToProfile} name="Profile" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
                      <a onClick={navigateToSettings} name="Settings" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Settings</a>
                      <a onClick={navigateToReviews} name="Reviews" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Reviews</a>
                      <a onClick={navigateToSync} name="Sync" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Sync</a>
                      <a onClick={navigateToLeaderboard} name="Leaderboard" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Leaderboard</a>
                  </div>
              </div>
              <div id="page-content-wrapper">
                  <div className="container-fluid" id="main-content">
                      <Routes>
                        <Route path="/signin" element={<SignIn signUp={navigateToSignUp} login={navigateToHome}/>} />
                        <Route path="/signup" element={<SignUp signIn={navigateToSignIn} login={navigateToSignIn}/>} />
                        <Route path="/home" element={<Home recPage={navigateToRecommendation}/>} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/profile" element={<Profile logout={navigateToSignIn}/>} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/sync" element={<Sync />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/recommendation" element={<Recommendation recPage={navigateToRecommendation}/>} />
                      </Routes>
                  </div>
              </div>
          </div>
      
    </div>
  );
}

export default Navbar;