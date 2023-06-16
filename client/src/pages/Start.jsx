import React from "react";
import { useNavigate } from "react-router-dom";

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
    <button onClick={navigateToSignIn}>Sign In</button>
    <button onClick={navigateToSignUp}>Register</button>
  </div>)
}

export default Start;