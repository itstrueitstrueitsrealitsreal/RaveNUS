import React from "react";
import Login from "./auth/Login";


function Navbar() {
  return <div class="d-flex" id="wrapper">
              <div class="border-end bg-white" id="sidebar-wrapper">
                  <div class="sidebar-heading border-bottom bg-light">RaveNUS</div>
                  <div class="list-group list-group-flush">
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Home</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Statistics</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Settings</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Reviews</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Sync</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Leaderboard</a>
                  </div>
              </div>
              <div id="page-content-wrapper">
                  
                  <div class="container-fluid" id="main-content">
                      <Login />
                  </div>
              </div>
          </div>;
}

export default Navbar;