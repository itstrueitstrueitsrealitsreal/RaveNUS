import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { Button, Form } from 'react-bootstrap';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import Input from '../../components/Input';
import { db, storage } from '../../components/firebase';
import UserID from '../../components/auth/UserID';
import Navbar from '../../components/Navbar';

function CreateProfile() {
  console.log('Create Profile page');

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/profile');
  };

  // current userID
  const uid = UserID();

  // info
  const [newProf, setNewProf] = useState({
    UserID: uid,
    Username: '',
    Halal: false,
    Vegetarian: false,
    ProfPic: '',
  });

  // new info states
  // username
  function handleProf(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log('handling username...');
    setNewProf((prevProf) => ({
      ...prevProf,
      [name]: value,
      UserID: uid,
    }));
  }
  // halal
  function handleHalal(event) {
    event.preventDefault();
    console.log('handling halal...');
    const oldHalal = newProf.Halal;
    setNewProf((prevProf) => ({
      ...prevProf,
      Halal: !oldHalal,
      UserID: uid,
    }));
    setCheckedH(!checkedH);
  }
  // vegetarian
  function handleVegetarian(event) {
    event.preventDefault();
    console.log('handling vegetarian...');
    const oldVeg = newProf.Vegetarian;
    setNewProf((prevProf) => ({
      ...prevProf,
      Vegetarian: !oldVeg,
      UserID: uid,
    }));
    setCheckedV(!checkedV);
  }

  // image
  const [image, setImage] = useState(null);
  const [uploadLoc, setUploadLoc] = useState('');

  // handle image
  function handleImage(event) {
    setImage(event.target.files[0]);
    const loc = `ProfilePhotos/${v4()}`;
    setUploadLoc(loc);
    setNewProf((prevProf) => ({
      ...prevProf,
      ProfPic: loc,
      UserID: uid,
    }));
  }

  // upload image
  const uploadImage = () => {
    if (image === null) {
      return;
    }
    const uploadRef = ref(storage, uploadLoc);
    uploadBytes(uploadRef, image).then(() => {
      console.log(`image uploaded ${uploadLoc}`);
    });
  };

  // add new profile to db
  const addProfInfo = async () => {
    if (newProf.Username === '') {
      alert('Username field is mandatory');
    } else {
      const confirmed = window.confirm('Are you sure you want to Create this Profile?\n'
        + `\n    Username: ${newProf.Username}\n    Halal: ${newProf.Halal}\n    Vegetarian: ${newProf.Vegetarian}`);
      if (confirmed) {
        console.log('adding profile...');
        delete (newProf.undefined);
        await setDoc(doc(db, 'profile', uid), newProf);
        setNewProf({
          UserID: uid,
          Username: '',
          Halal: false,
          Vegetarian: false,
        });
        navigateToProfile();
      }
    }
  };

  // submit handle function
  function addProf() {
    uploadImage();
    addProfInfo();
  }

  // checkbox states
  const [checkedH, setCheckedH] = useState(false);
  const [checkedV, setCheckedV] = useState(false);

  // Page content
  const cont = (
    <div>
      <h1>Create a Profile!</h1>

      <Form>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Username:</Form.Label>
          <Form.Control
            placeholder="Username"
            name="Username"
            value={newProf.Username}
            onChange={handleProf}
          />
        </Form.Group>

        <FormGroup>
          <FormControlLabel control={<Checkbox checked={checkedH} onClick={handleHalal} />} label="Halal" />
          <FormControlLabel control={<Checkbox checked={checkedV} onClick={handleVegetarian} />} label="Vegetarian" />
        </FormGroup>

        <Form.Group>
          <Form.Label>Profile Picture:</Form.Label>
          <Input type="file" onChange={handleImage}>here</Input>
        </Form.Group>

        <br />
        <Button
          className="btn btn-primary btn-lg px-4 gap-2"
          variant="primary"
          onClick={addProf}
        >
          Create Profile
        </Button>
      </Form>

      <br />

      <div>
        <Button variant="primary" onClick={navigateToProfile}>Back</Button>
      </div>
    </div>
  );

  return <Navbar content={cont} />;
}

export default CreateProfile;
