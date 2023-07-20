import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../components/firebase";
import { Form, Card } from "react-bootstrap";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { v4 } from "uuid";
import Input from "../../components/Input";
import img from '../../components/public/profpicheader.png'
import defaultImg from '../../components/public/defaultprofile.png'
import {
  Button,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormText
} from "reactstrap";

function UpdateProfile() {
  console.log('Update Profile Page');

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/admin/profile');
  };

  // profile id
  const location = useLocation();
  const profID = location.pathname.split('/')[3];
  const profRef = doc(db, 'profile', profID);

  // profile states
  const [newProf, setNewProf] = useState({
    Username: '',
    Halal: false,
    Vegetarian: false,
    ProfPic: '',
    UserID: ''
  });
  const [oldProf, setOldProf] = useState({
    UserID: 'not retrieved',
  });

  // retrieve old profile
  useEffect(() => {
    const getOldProf = async () => {
      const doc = await getDoc(profRef);
      setNewProf(doc.data());
      setOldProf(doc.data());
      setCheckedH(doc.data().Halal);
      setCheckedV(doc.data().Vegetarian);
    };
    getOldProf();
  }, []);

  // retrieve old profile pic
  const [profPicURL, setProfPicURL] = useState('');
  const profileURL = async (name) => {
    const urlRef = ref(storage, name);
    const url = await getDownloadURL(urlRef);
    setProfPicURL(url.toString());
  };
  if (oldProf.UserID !== 'not retrieved') {
    console.log('old profile retrieved');
    console.log(oldProf);
    if (oldProf.ProfPic !== "") {
      profileURL(oldProf.ProfPic);
    }
  }

  // new info states
  // username
  function handleProf(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log('handling username...');
    setNewProf((prevProf) => ({
      ...prevProf,
      [name]: value,
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
    }));
    setCheckedV(!checkedV);
  }

  // checkbox states
  const [checkedH, setCheckedH] = useState(false);
  const [checkedV, setCheckedV] = useState(false);

  // update profile
  const editProfile = async () => {
    const confirmed = window.confirm('Are you sure you want to Update your profile?\n'
        + '\n  OLD:'
        + `\n    Username: ${oldProf.Username}\n    Halal: ${oldProf.Halal}\n    Vegetarian: ${oldProf.Vegetarian
        }\n`
        + '\n  NEW:'
        + `\n    Username: ${newProf.Username}\n    Halal: ${newProf.Halal}\n    Vegetarian: ${newProf.Vegetarian}`);
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
  };

  // new image
  const [newImage, setNewImage] = useState(null);
  const [newUploadLoc, setNewUploadLoc] = useState('');
  function handleImage(event) {
    setNewImage(event.target.files[0]);
    const a = `ProfilePhotos/${v4()}`;
    setNewUploadLoc(a);
    setNewProf((prevProf) => ({
      ...prevProf,
      ProfPic: a,
    }));
  }
  const uploadImage = () => {
    if (newImage === null) {
      setNewProf((prevProf) => ({
        ...prevProf,
        ProfPic: oldProf.ProfPic,
      }));
    } else {
      const uploadRef = ref(storage, newUploadLoc);
      uploadBytes(uploadRef, newImage).then(() => {
        console.log(`image uploaded ${newUploadLoc}`);
      });
    }
  };

  function editAll() {
    if (newImage !== null) {
      uploadImage();
      if (oldProf.ProfPic !== "") {
        removeImageFirebase();
      }
    }
    editProfile();
  }

  // remove profile picture
  const removeImageRef = async () => {
    const confirmed = window.confirm('Are you sure you want to remove your profile picture?');
    if (confirmed) {
      const newFields = {
        ProfPic: '',
      };
      await updateDoc(profRef, newFields);
    }
  };
  const removeImageFirebase = async () => {
    const delRef = ref(storage, oldProf.ProfPic);
    await deleteObject(delRef);
  };

  function removeImage() {
    removeImageRef();
    if (oldProf.ProfPic !== "") {
      removeImageFirebase();
    }
    navigateToProfile();
  }

  // Page content
  const cont = (
    <div>
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
              <h1 className="display-2 text-white mb-0 ml-2">Update Profile</h1>
              <p className="text-white mt-0 mb-2 ml-2">
                This is your profile page. You can sign out, edit your profile or change your password here.
              </p>
              <Button
                className="mx-2"
                color="light"
                href="#pablo"
                onClick={(e) => { 
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
                  <Form.Label>Profile picture:</Form.Label>
                </Form>
                <Row>
                  <Card.Img variant="top" className="rounded-circle w-25" src={profPicURL ? profPicURL : defaultImg} alt={oldProf.Username} />
                </Row>
                <Button color='danger' className='my-2' onClick={removeImage}>Remove picture</Button>
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
                    <Form.Label>Change profile picture:</Form.Label>
                    <Input type="file" onChange={handleImage}>here</Input>
                  </Form.Group>

                  <br />
                  <Button color='info' onClick={editAll}>Update profile</Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );

  return cont;
}

export default UpdateProfile;
