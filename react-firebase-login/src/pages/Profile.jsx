import React from "react";
import Auth from "../components/auth/Auth"

function Profile(props) {
  return (
    <div>
      <h1>PROFILE PAGE</h1>
      <Auth logout={props.logout} />
    </div>
  )
}

export default Profile;