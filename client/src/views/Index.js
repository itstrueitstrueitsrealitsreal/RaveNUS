import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import { auth, authForFirebaseUI } from '../components/firebase.js';

const Index = () => {
  console.log('Home Page called');

  const url = useLocation();

  // page navigation
  const navigate = useNavigate();

  const navigateToRecommmendation = () => {
    navigate(`/admin/recommendation/${uid}`);
  }

  // current userID
  const [uid, setUid] = useState(null);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUid(authForFirebaseUI.currentUser.uid);
    } else {
      window.location.reload();
    }
  });

  // Current Time
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);
  setInterval(updateTime, 1000);

  function updateTime() {
    setTime(new Date().toLocaleTimeString());
  }

  return ( 
    <>
      <div className="pb-8 pt-5 pt-md-8">
        <Container className="mt-7" fluid>
          <Row>
            <div className="px-4 py-5 my-5 text-center">
              <h1 className="display-5 fw-bold text-body-emphasis">{time}</h1>
              <h1 className="display-5 fw-bold text-body-emphasis">"Hunger knows no friend but its feeder."</h1>
              <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">-Aristophenes</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Button className="btn btn-light text-center" type='button' onClick={navigateToRecommmendation}>Generate Recommendation</Button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Index;
