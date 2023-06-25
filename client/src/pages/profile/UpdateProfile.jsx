import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../components/firebase";
import { Button, Form, Card } from "react-bootstrap";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { Avatar } from "@mui/material";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { v4 } from "uuid";
import Input from "../../components/Input";

function UpdateProfile() {
  console.log("Update Profile Page");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/profile');
  }

  // profile id
  const location = useLocation();
  const profID = location.pathname.split("/")[2];
  const profRef = doc(db, "profile", profID);

  // profile states
  const [newProf, setNewProf] = useState({
    Username: "",
    Halal: false,
    Vegetarian: false,
    ProfPic: "",
    UserID: ""
  });
  const [oldProf, setOldProf] = useState({
    UserID: "not retrieved"
  });

  // retrieve old profile
  useEffect(() => {
    const getOldProf = async () => {
      const doc = await getDoc(profRef);
      setNewProf(doc.data());
      setOldProf(doc.data());
      setCheckedH(doc.data().Halal);
      setCheckedV(doc.data().Vegetarian);
    }
    getOldProf();
  }, []);

  // retrieve old profile pic
  const [profPicURL, setProfPicURL] = useState("");
  const profileURL = async (name) => {
    const urlRef = ref(storage, name)
    const url = await getDownloadURL(urlRef)
    setProfPicURL(url.toString());
  }
  if (oldProf.UserID !== "not retrieved") {
    console.log("old profile retrieved")
    console.log(oldProf)
    profileURL(oldProf.ProfPic);
  }

  // new info states
  // username
  function handleProf(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("handling username...");
    setNewProf(prevProf => {
      return {
        ...prevProf,
        [name]: value
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
        Halal: !oldHalal
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
        Vegetarian: !oldVeg
      }
    })
    setCheckedV(!checkedV);
  }

  // checkbox states
  const [checkedH, setCheckedH] = useState(false)
  const [checkedV, setCheckedV] = useState(false)

  // update profile
  const editProfile = async () => {
    const confirmed = window.confirm("Are you sure you want to Update your profile?\n"
        + "\n  OLD:"
        + "\n    Username: " + oldProf.Username + "\n    Halal: " + oldProf.Halal + "\n    Vegetarian: " + oldProf.Vegetarian
        + "\n"
        + "\n  NEW:"
        + "\n    Username: " + newProf.Username + "\n    Halal: " + newProf.Halal + "\n    Vegetarian: " + newProf.Vegetarian);
    if (confirmed) {
      const newFields = {
        Username: newProf.Username,
        Halal: newProf.Halal,
        Vegetarian: newProf.Vegetarian,
        ProfPic: newProf.ProfPic
      };
      await updateDoc(profRef, newFields);
      navigateToProfile();
    }
  }

  // new image
  const [newImage, setNewImage] = useState(null);
  const [newUploadLoc, setNewUploadLoc] = useState("");
  function handleImage(event) {
    setNewImage(event.target.files[0]);
    const a = `ProfilePhotos/${v4()}`
    setNewUploadLoc(a)
    setNewProf(prevProf => {
      return {
        ...prevProf,
        ProfPic: a
      }
    });
  }
  const uploadImage = () => {
    if (newImage === null) {
      setNewProf(prevProf => {
        return {
          ...prevProf,
          ProfPic: oldProf.ProfPic
        }
      });
    } else {
      const uploadRef = ref(storage, newUploadLoc);
      uploadBytes(uploadRef, newImage).then(() => {
        console.log("image uploaded " + newUploadLoc);
      })
    }
  }

  function editAll() {
    if (newImage !== null) {
      uploadImage();
      removeImageFirebase();
    }
    editProfile();
  }

  // remove profile picture
  const removeImageRef = async () => {
    const confirmed = window.confirm("Are you sure you want to Remove your Profile Picture?");
    if (confirmed) {
      const newFields = {
        ProfPic: ""
      };
      await updateDoc(profRef, newFields);
    }
  }
  const removeImageFirebase = async () => {
    const delRef = ref(storage, oldProf.ProfPic);
    await deleteObject(delRef);
  }

  function removeImage() {
    removeImageRef();
    removeImageFirebase();
    navigateToProfile();
  }

  // Page content
  const cont = (
    <div>
      <div>
        <h1>Update Profile</h1>
        {/* <Avatar className="Avatar" alt={oldProf.Username} src={profPicURL}/> */}
        <Card.Img variant="top" src={profPicURL} alt={oldProf.Username} />
        <Button onClick={removeImage}>Remove Profile Picture</Button>
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

          <Form.Group>
            <Form.Label>Change Profile Picture:</Form.Label>
            <Input type="file" onChange={handleImage}>here</Input>
          </Form.Group>
          
          <br />
          <Button onClick={editAll}>Update Profile</Button>
        </Form>
      </div>
      

      <br />
      <div>
        <Button variant="primary" onClick={navigateToProfile}>Back</Button>
      </div>
    </div>
  )

  return <Navbar content={cont} />
}

export default UpdateProfile;