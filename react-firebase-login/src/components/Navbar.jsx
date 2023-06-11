import React, { useState } from "react";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Reviews from "../pages/Reviews";
import Sync from "../pages/Sync";
import Leaderboard from "../pages/Leaderboard";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";



function Navbar() {

  const [page, setPage] = useState("Sign In");
  function render(event) {
    console.log(event.target.getAttribute("name"));
    setPage(event.target.getAttribute("name"));
  }

  function currentPage() {
    if (page === "Sign In") {
      return <SignIn render={render}/>;
    } else if (page === "Home") {
      return <Home />;
    } else if (page === "Statistics") {
      return <Statistics />;
    } else if (page === "Profile") {
      return <Profile />;
    } else if (page === "Settings") {
      return <Settings />;
    } else if (page === "Reviews") {
      return <Reviews />;
    } else if (page === "Sync") {
      return <Sync />;
    } else if (page === "Leaderboard") {
      return <Leaderboard />;
    } else if (page === "Sign Up") {
      return <SignUp render={render}/>;
    }
  }

  return <div className="d-flex" id="wrapper">
              <div className="border-end bg-white" id="sidebar-wrapper">
                  <div onClick={render} name="Sign In" className="sidebar-heading border-bottom bg-light">RaveNUS</div>
                  <div className="list-group list-group-flush">
                      <a onClick={render} name="Home" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Home</a>
                      <a onClick={render} name="Statistics" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Statistics</a>
                      <a onClick={render} name="Profile" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
                      <a onClick={render} name="Settings" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Settings</a>
                      <a onClick={render} name="Reviews" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Reviews</a>
                      <a onClick={render} name="Sync" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Sync</a>
                      <a onClick={render} name="Leaderboard" className="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Leaderboard</a>
                  </div>
              </div>
              <div id="page-content-wrapper">
                  <div className="container-fluid" id="main-content">
                      {currentPage()}
                  </div>
              </div>
          </div>;
}

export default Navbar;