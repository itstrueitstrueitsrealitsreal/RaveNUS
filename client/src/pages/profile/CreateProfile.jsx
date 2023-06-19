import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

function CreateProfile() {
  console.log("Create Profile page");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/profile');
  }

  // current userID
  const uid = UserID();

  // info
  const [newProf, setNewProf] = useState({
    UserID: uid,
    Username: "",
    Halal: false,
    Vegetarian: false
  });

  // new info states
  // username
  function handleProf(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("handling username...");
    setNewProf(prevProf => {
      return {
        ...prevProf,
        [name]: value,
        UserID: uid
      }
    })
  }
  // halal
  function handleHalal(event) {
    event.preventDefault();
    console.log("handling halal...");
    const oldHalal = newProf.Halal;
    setNewProf(prevProf => {
      return {
        ...prevProf,
        Halal: !oldHalal,
        UserID: uid
      }
    })
    setCheckedH(!checkedH);
  }
  // vegetarian
  function handleVegetarian(event) {
    event.preventDefault();
    console.log("handling vegetarian...");
    const oldVeg = newProf.Vegetarian;
    setNewProf(prevProf => {
      return {
        ...prevProf,
        Vegetarian: !oldVeg,
        UserID: uid
      }
    })
    setCheckedV(!checkedV);
  }

  // profile collection
  const profileCollectionRef = collection(db, "profile");

  // add new profile to db
  const addProf = async () => {
    if (newProf.Username === "") {
      alert("Username field is mandatory");
    } else {
      const confirmed = window.confirm("Are you sure you want to Create this Profile?\n"
        + "\n    Username: " + newProf.Username + "\n    Halal: " + newProf.Halal + "\n    Vegetarian: " + newProf.Vegetarian);
        if (confirmed) {
          console.log("adding profile...");
          delete(newProf.undefined);
          await addDoc(profileCollectionRef, newProf);
          setNewProf({
            UserID: uid,
            Username: "",
            Halal: false,
            Vegetarian: false
          });
          navigateToProfile();
        }
    }
  }

  // checkbox states
  const [checkedH, setCheckedH] = useState(false)
  const [checkedV, setCheckedV] = useState(false)

  // Page content
  const cont = (
    <div>
      <h1>Create a Profile!</h1>

      <Form>
        <Form.Group 
          className="mb-3" 
          controlId="exampleForm.ControlInput1">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            placeholder="Username"
            name="Username" 
            value={newProf.Username}
            onChange={handleProf} 
          />
        </Form.Group>

        <FormGroup>
          <FormControlLabel control={<Checkbox checked={checkedH} onClick={handleHalal}/>} label="Halal" />
          <FormControlLabel control={<Checkbox checked={checkedV} onClick={handleVegetarian}/>} label="Vegetarian" />
        </FormGroup>

        <br />
        <Button 
          className="btn btn-primary btn-lg px-4 gap-2" 
          variant="primary" 
          onClick={addProf}>
          Create Profile
        </Button>
      </Form>

      <br />

      <div>
        <Button variant="primary" onClick={navigateToProfile}>Back</Button>
      </div>
    </div>
  )

  return <Navbar content={cont} />
}

export default CreateProfile;