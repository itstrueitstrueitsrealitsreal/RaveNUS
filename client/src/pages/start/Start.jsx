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
  <div>
    <h1>START PAGE</h1>
    <h1>Welcome to RaveNUS!</h1>
    <Button onClick={navigateToSignIn}>Sign In</Button>
    <Button onClick={navigateToSignUp}>Register</Button>
  </div>)
}

export default Start;