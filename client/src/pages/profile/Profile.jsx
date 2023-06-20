import React, { useState, useEffect } from "react";
import Auth from "../../components/auth/Auth";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UserID from "../../components/auth/UserID";
import { db, storage } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Avatar } from "@mui/material";

function Profile(props) {
  console.log("Profile Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToChangePassword = () => {
    navigate('/changepassword');
  }
  const navigateToCreateProfile = () => {
    navigate('/createprofile');
  }
  const navigateToUpdateProfile = () => {
    navigate('/updateprofile');
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
      setProfs(profiles.docs.map((doc) => ({key: doc.id, id: doc.id, ...doc.data()})));
    }
    checkProfile();
  }, [])
  
  // filtering out the user's profile
  const profiles = profs.filter((p) => p.UserID === uid ? true : false);

  // retrieve profile pic url
  const [profPicURL, setProfPicURL] = useState("");
  const profileURL = async (name) => {
    const urlRef = ref(storage, name)
    const url = await getDownloadURL(urlRef)
    setProfPicURL(url.toString());
  }

  if (profiles.length === 1) {
    profileURL(profiles[0].ProfPic);
  }

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

      { profiles.length === 1 ? <p>exists</p> : <p>doesnt exists</p>}
      { profiles.length === 1 ? 
      <div>  {profiles.map((p) => {
          return (
            <div key={p.id}>
              <Avatar className="Avatar" alt={p.Username} src={profPicURL}/>
              <h2>Username: {p.Username}</h2>
              <h3>Halal: {p.Halal.toString()}</h3>
              <h3>Vegetarian: {p.Vegetarian.toString()}</h3>
              <Button onClick={navigateToUpdateProfile}>Update Profile</Button>
            </div>
          )
        })} 
      </div> :
      <div>
        <Button onClick={navigateToCreateProfile}>Create Profile</Button>
      </div> 
      }

    </div>
  )

  return <Navbar content={cont} />
}

export default Profile;