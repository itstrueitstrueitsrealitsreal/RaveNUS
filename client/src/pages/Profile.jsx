import React from "react";
import Auth from "../components/auth/Auth";
import Navbar from "../components/Navbar";

function Profile(props) {
  console.log("Profile Page called");

  const cont = (
    <div>
      <h1>PROFILE PAGE</h1>
      <Auth />
    </div>
  )

  return <Navbar content={cont} />
}

export default Profile;