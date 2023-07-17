import React, { useState, useEffect } from "react";
import Auth from "../../components/auth/Auth";
import { useNavigate } from "react-router-dom";
import { db, storage, auth } from "../../components/firebase";
import { collection, getDocs, getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import defaultImg from '../../components/img/defaultprofile.png'
import { v4 } from 'uuid';
import 'firebase/compat/firestore';
import img from '../../components/img/profpicheader.png'
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
  FormText,
  CardText
} from "reactstrap";
import { Checkbox, FormControlLabel } from '@mui/material';

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
  const navigateToProfile = () => {
    navigate(`/admin/profile`)
  }

  const uid = auth.currentUser.uid;

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

  //new 
  const greeting = username ? `Hello ${username}!` : `Hello!`;


  useEffect(() => {
    const checkProfile = async () => {
      const profiles = await getDocs(profileCollectionRef);
      setProfs(profiles.docs.map((doc) => ({ key: doc.id, id: doc.id, ...doc.data() })));
    };
    checkProfile();
  }, []);


  // retrieve profile pic url
  const profileURL = async (name) => {
    const urlRef = ref(storage, name);
    const url = await getDownloadURL(urlRef);
    setProfPicURL(url.toString());
  };

  if (profiles.length === 1) {
    profileURL(profiles[0].ProfPic);
  }



  return false ? (
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
              <h1 className="display-2 text-white mb-0 ml-2">{greeting}</h1>
              <p className="text-white mt-0 mb-2 ml-2">
                This is your profile page. You can sign out, edit your profile or change your password here.
              </p>
              <Button
                className="my-2 mx-2"
                color="info"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/updateprofile/${id}`);
                }}
              >
                Edit profile
              </Button>
              <Button
                className="my-2 mx-2"
                color="info"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigateToChangePassword();
                }}
              >
                Change password
              </Button>
              <Button
                className="mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  userSignOut();
                }}
              >
                Log out
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" >
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
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {username}
                  </h3>
                </div>
              </CardBody>
              <CardBody>
                <Form className='text-center'>
                  <h6 className="heading-small text-muted mb-4">
                    Dietary restrictions
                  </h6>
                  <div>
                    <Row>
                      <Col>
                        {profiles[0].Halal ? <div>Halal</div> : null}
                      </Col>
                    </Row>
                    <Row className='my-4'>
                      <Col>
                        {profiles[0].Vegetarian ? <div>Vegetarian</div> : null}
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>) : (
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
              <h1 className="display-2 text-white mb-0 ml-2">Hello!</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                Create a profile to get started generating enhanced recommendations.
              </p>
              <Button
                className="mx-2"
                color="warning"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigateToCreateProfile();
                }}
              >
                Create profile
              </Button>
              <Button
                className="my-2 mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigateToChangePassword();
                }}
              >
                Change password
              </Button>
              <Button
                className="mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  userSignOut();
                }}
              >
                Log out
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;