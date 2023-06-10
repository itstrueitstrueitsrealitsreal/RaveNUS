import React, { useState } from "react";
import Login from "./auth/Login";
import Sync from "./sync/Sync";


function Navbar() {

  const [page, setPage] = useState("Login");
  function render(event) {
    console.log(event.target.name);
    setPage(event.target.name);
  }

  function currentPage() {
    if (page === "Login") {
      return <Login />;
    } else if (page === "Sync") {
      return <Sync />;
    }
  }

  return <div class="d-flex" id="wrapper">
              <div class="border-end bg-white" id="sidebar-wrapper">
                  <div class="sidebar-heading border-bottom bg-light">RaveNUS</div>
                  <div class="list-group list-group-flush">
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Home</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Statistics</a>
                      <a onClick={render} name="Login" class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Settings</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Reviews</a>
                      <a onClick={render} name="Sync" class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Sync</a>
                      <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Leaderboard</a>
                  </div>
              </div>
              <div id="page-content-wrapper">
                  <div class="container-fluid" id="main-content">
                      {currentPage()}
                  </div>
              </div>
          </div>;
}

export default Navbar;