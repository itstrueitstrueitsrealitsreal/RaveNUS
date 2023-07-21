import React, { useState, useEffect } from "react";
import img from "../assets/img/profpicheader.png";
import Rating from '@mui/material/Rating';
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  ListGroupItemHeading,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth, authForFirebaseUI, storage } from "../components/firebase";

function Statistics() {
  console.log('Statistics Page called');

  // page navigation
  const navigate = useNavigate();

  // STATES
  // LOADING state
  const [loading, setLoading] = useState(true);
  // current USER PROFILE
  const [profile, setProfile] = useState(null);
  // USER REVIEWS
  const [revs, setRevs] = useState(null);
  // STATS
  // Number of Reviews
  const [noRevs, setNoRevs] = useState(null);
  // Average Review Rating
  const [avgRating, setAvgRating] = useState(null);
  // Number of Recommendations Generated
  const [noRecs, setNoRecs] = useState(null);
  // current userID
  const [uids, setUids] = useState(null);
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUids(authForFirebaseUI.currentUser.uid);
      
    } else {
      window.location.reload();
    }
  })

  // check if user has created a profile
  const [callAlert, setCallAlert] = useState(false);
  const checkUser = async (userid) => {
    try {
      console.log("userid trying: " + uids)
      const documentRef = doc(db, "profile", userid);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        console.log("document exists");
        console.log(documentSnapshot.data());
        // SET PROFILE
        const p = documentSnapshot.data();
        setProfile(p);
        // SET NO OF RECS
        if (p.NoOfRec !== null) {
          const noOfRecommendations = p.NoOfRec;
          setNoRecs(noOfRecommendations);
        }
        // SET REVIEWS
        const revPath = "profile/" + uids + "/reviews";
        const data = await getDocs(collection(db, revPath)).catch((err) => console.log(err));
        const reviews = data.docs.map((doc) => ({ key: doc.id, ...doc.data(), id: doc.id })); 
        // const reviews = await getRevs(revPath);
        console.log(reviews);
        setRevs(reviews);
        // SET NO OF REVIEWS
        const noOfReviews = reviews.length;
        setNoRevs(noOfReviews);
        // SET AVG RATING
        if (noOfReviews > 0) {
          const sum = reviews.reduce((acc, item) => {
            return acc + item.Rating;
          }, 0);
          const avgRatings = sum / noOfReviews;
          setAvgRating(avgRatings);
        }
      } else {
        console.log("document doesnt exist");
        setCallAlert(true);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  if (uids !== null) {
    if (loading === true) {
      checkUser(uids);
    }
  }


  const cont = <>
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
              <h1 className="display-2 text-white mb-0 ml-2">Statistics</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                View your usage statistics here!
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt--7" fluid>
        <Row>
          <div className="col ">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 className="mb-0 h2">Your statistics:</h2>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <ListGroup flush>
                      <ListGroupItem>
                        Number of recommendations generated: {noRecs === null ? "NIL" : noRecs}
                      </ListGroupItem>
                      <ListGroupItem>
                        Number of reviews: {noRevs}
                      </ListGroupItem>
                      <ListGroupItem>
                        Average review rating: 
                        <br />
                        {avgRating === null ? "NIL" : <Rating className="mt-0" name="read-only" value={avgRating} max={5} readOnly />}
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container> 
  </>;

  return (loading ? <div className='pb-8 pt-5 pt-md-8 text-center'><Spinner /></div> : callAlert ?       
    <div className="pb-8 pt-0 pt-md-0">
      <Container fluid>
        <Row>
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold text-body-emphasis">Create a profile to track and view your statistics.</h1>
            <div className="col-lg-6 mx-auto">
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Button className="mt-5" type='button' color='success' onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/profile`);
                }}>Create profile</Button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div> : cont);
}

export default Statistics;
