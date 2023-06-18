import React from "react";
import Auth from "../../components/auth/Auth";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Profile(props) {
  console.log("Profile Page called");

  const navigate = useNavigate();
  const navigateToChangePassword = () => {
    navigate('/changepassword');
  }

  const cont = (
    <div>
      <h1>PROFILE PAGE</h1>
      <Auth />

      <br />
      <Button onClick={navigateToChangePassword}>Change Password</Button>
    </div>
  )

  return <Navbar content={cont} />
}

export default Profile;