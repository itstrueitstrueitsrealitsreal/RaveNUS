import React, { useState, useEffect } from "react";
import Auth from "../../components/auth/Auth";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserID from "../../components/auth/UserID";
import { db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";

function Profile(props) {
  console.log("Profile Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToChangePassword = () => {
    navigate('/changepassword');
  }

  // current userID
  const uid = UserID();

  // profile collection
  const profileCollectionRef = collection(db, "profile");

  // check if user profile exists
  const [profs, setProfs] = useState([]);

  useEffect(() => {
    const checkProfile = async () => {
      const profiles = await getDocs(profileCollectionRef);
      setProfs(profiles.docs.map((doc) => ({...doc.data()})));
    }
    checkProfile();
  }, [])
  
  const profiles = profs.filter((p) => p.UserID === uid ? true : false).length;
  

  // Page content
  const cont = (
    <div>
      <h1>PROFILE PAGE</h1>
      <Auth />

      <br />
      <div>
        <Button onClick={navigateToChangePassword}>Change Password</Button>
      </div>
      <br />

      { profiles === 1 ? <p>profile exists</p> : <p>profile doesnt exist</p> }
      
    </div>
  )

  return <Navbar content={cont} />
}

export default Profile;