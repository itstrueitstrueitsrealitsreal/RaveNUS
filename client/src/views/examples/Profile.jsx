import React, { useState, useEffect } from "react";
import Auth from "../../components/auth/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import UserID from "../../components/auth/UserID";
import { db, storage } from "../../components/firebase";
import { collection, getDocs, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../components/firebase';
import defaultImg from '../../assets/img/theme/defaultprofile.png'
import { v4 } from 'uuid';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
  FormText
} from "reactstrap";
import { Checkbox, FormControlLabel } from '@mui/material';
// core components
import UserHeader from "../../components/Headers/UserHeader.js";

const Profile = () => {
  console.log(`Profile called`);
  // page navigation
  const navigate = useNavigate();
  const navigateToChangePassword = () => {
    navigate('/admin/changepassword');
  };
  const navigateToCreateProfile = () => {
    navigate('/admin/createprofile');
  };
  const navigateToStart = () => {
    navigate('/auth/login');
  };

  // current userID
  const uid = UserID();

  // profile collection
  const profileCollectionRef = collection(db, 'profile');

  // check if user profile exists
  const [profs, setProfs] = useState([]);

  useEffect(() => {
    const checkProfile = async () => {
      const profiles = await getDocs(profileCollectionRef);
      setProfs(profiles.docs.map((doc) => ({ key: doc.id, id: doc.id, ...doc.data() })));
    };
    checkProfile();
  }, []);

  // filtering out the user's profile
  const profiles = profs.filter((p) => (p.UserID === uid));

  // retrieve profile pic url
  const [profPicURL, setProfPicURL] = useState('');
  const profileURL = async (name) => {
    const urlRef = ref(storage, name);
    const url = await getDownloadURL(urlRef);
    setProfPicURL(url.toString());
  };

  if (profiles.length === 1) {
    profileURL(profiles[0].ProfPic);
  }

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = async () => {
    signOut(auth).then(() => {
      console.log('signed out');
      alert('Successfully signed out. Redirecting you to start page...');
    }).catch((error) => console.log(error));
    navigateToStart();
  };
  var username;
  var id;
  console.log(profiles);
  if (profiles.length === 1) {
    username = profiles[0] ? profiles[0].Username : null;
    console.log(profiles);
    id = profiles[0] ? profiles[0].UserID : null;
  }

  // create profile

  // page navigation
  const navigateToProfile = () => {
    navigate('/admin/profile');
  };

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
    console.log(event.target.files[0]);
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
        window.location.reload();
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


  return (
    <>
      <UserHeader name={username} profileExists={profiles.length === 1} 
        navigateToChangePassword={navigateToChangePassword}
        navigateToCreateProfile={navigateToCreateProfile}
        userSignOut={userSignOut}
        navigateToUpdateProfile={() => {
          navigate(`/admin/updateprofile/${id}`);
        }
        }
        />
      {/* Page content */}
      {profiles.length === 1 ? <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => {
                      e.preventDefault();
                    }}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={profPicURL === '' ? defaultImg : profPicURL}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Change profile picture
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Remove profile picture
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Update profile
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="lucky.jesse"
                            id="input-username"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Jesse"
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> :
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Get started by creating a profile.</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        addProf();
                      }}
                      size="sm"
                    >
                      Create profile
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="Username"
                            name="Username"
                            value={newProf.Username}
                            onChange={handleProf}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Dietary restrictions
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox checked={checkedH} onClick={handleHalal} />} label="Halal" />
                          <FormControlLabel control={<Checkbox checked={checkedV} onClick={handleVegetarian} />} label="Vegetarian" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Profile picture
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Input
                            onChange={handleImage}
                            type="file"
                            className="mb-4"
                          />
                          <FormText>
                            Upload your profile picture here, if any.
                          </FormText>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>}
    </>
  );
};

export default Profile;
