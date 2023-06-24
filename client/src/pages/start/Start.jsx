import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Start() {
  console.log("Start Page called");

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/signin')
  }
  const navigateToSignUp = () => {
    navigate('/signup')
  }

  return (
  <div className="startDiv">
    <h1>Welcome to RaveNUS!</h1>
    <Button className="mx-4" onClick={navigateToSignIn}>Sign In</Button>
    <Button onClick={navigateToSignUp}>Register</Button>
  </div>)
}

export default Start;