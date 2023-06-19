import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/firebase";
import { Button } from "react-bootstrap";

function UpdateProfile() {
  console.log("Update Profile Page");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/profile');
  }

  // Page content
  const cont = (
    <div>
      <h1>Update Profile</h1>

      <div>
        <Button variant="primary" onClick={navigateToProfile}>Back</Button>
      </div>
    </div>
  )

  return <Navbar content={cont} />
}

export default UpdateProfile;