import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { Form } from 'react-bootstrap';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import Input from '../../components/Input';
import { db, storage } from '../../components/firebase';
import UserID from '../../components/auth/UserID';
import {
  Button,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormText,
  Card
} from "reactstrap";
import img from '../../components/img/profpicheader.png'

function CreateProfile() {
  console.log('Create Profile page');

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/admin/profile');
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
    NoOfRec: 0
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
          NoOfRec: 0
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
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + img + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white mb-0 ml-2 text-nowrap">Create Profile</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                Come join the RaveNUS community today!
              </p>
              <Button
                className="mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigate(`/admin/profile`);
                }}
              >
               Back
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mt--7" fluid>
       <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className="bg-transparent">
                <h2 className="mb-0 h2">Profile details:</h2>
              </CardHeader>
              <CardBody>
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
            className="px-4 gap-2"
            color="warning"
            variant="primary"
            onClick={addProf}
          >
            Create Profile
          </Button>
        </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

  return cont;
}

export default CreateProfile;
