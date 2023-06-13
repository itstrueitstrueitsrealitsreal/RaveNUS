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

  function currentPage(pathname) {
    switch(pathname) {
      case "/signin":
        return <SignIn signUp={navigateToSignUp} login={navigateToHome} />;
      case "/signup":
        return <SignUp signIn={navigateToSignIn} login={navigateToSignIn} />;
      case "/home":
        return <Home recPage={navigateToRecommendation} />;
      case "/statistics":
        return <Statistics />;
      case "/profile":
        return <Profile logout={navigateToSignIn} />;
      case "/settings":
        return <Settings />;
      case "/reviews":
        return <Reviews />;
      case "/sync":
        return <Sync />;
      case "/leaderboard":
        return <Leaderboard />;
      case "/recommendation":
        return <Recommendation recPage={navigateToRecommendation} />;
      default:
        return <SignIn />;
    }
  }

  return (
    <div>
    <div className="d-flex" id="wrapper">
              <div className="border-end bg-white" id="sidebar-wrapper">
                  <div onClick={navigateToSignIn} name="Sign In" className="sidebar-heading border-bottom bg-light">RaveNUS</div>
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
                      {currentPage(window.location.pathname)}
                  </div>
              </div>
          </div>
      <Routes>
        <Route path="/signin" />
        <Route path="/signup" />
        <Route path="/home" />
        <Route path="/statistics" />
        <Route path="/profile" />
        <Route path="/settings" />
        <Route path="/reviews" />
        <Route path="/sync" />
        <Route path="/leaderboard" />
        <Route path="/recommendation" />
      </Routes>
    </div>
  );
}

export default Navbar;