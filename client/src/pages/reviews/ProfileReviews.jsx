import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth, authForFirebaseUI, storage } from "../../components/firebase";
import Review from "../../components/Review";
import Spinner from 'react-bootstrap/Spinner';
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import img from "../../components/img/profpicheader.png";
import {
  Card,
  CardHeader,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardText,
  CardImg
} from "reactstrap";

function ProfileReviews(props) {
  console.log("Profile Reviews Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/admin/reviews');
  }

  // loading state
  const [loading, setLoading] = useState(true);

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
      console.log("userid trying: " +uids)
      const documentRef = doc(db, "profile", userid);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        console.log("document exists");
      } else {
        console.log("document doesnt exist");
        setCallAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (uids !== null) {
    checkUser(uids);
  }

  // Read db 
  const [revs, setRevs] = useState([]);
  const path = "profile/" + uids + "/reviews";
  
  useEffect(() => {
    const getRevs = async () => {
        // getting reviews
        console.log("Reviews getRev called");
        const data = await getDocs(collection(db, path));
        const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
        setRevs(allRevs);
        setLoading(false);
    }
    getRevs();
  }, [uids]);

  // delete review
  const deleteRev = async (revID, content, rating, uid, eateryID, stallID, eatery, stall, revpic) => {
    const confirmed = window.confirm("Are you sure you want to Delete this Review?\n"
        + "\n    Eatery: " + eatery + "\n    Stall: " + stall
        + "\n    Content: " + content + "\n    Rating: " + rating);
    if (confirmed) {
      const userRevRef = doc(db, "profile/" + uid + "/reviews", revID);
      const stallRevRef = doc(db, "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews", revID);
      const delRef = ref(storage, revpic);
      await deleteObject(delRef);
      await deleteDoc(userRevRef);
      await deleteDoc(stallRevRef);
      // paths
      const stallRevsPath = "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews";
      const stallPath = "eateries/" + eateryID + "/Stalls/";
      // get stall reviews
      const stallData = await getDocs(collection(db, stallRevsPath));
      const allRevs = stallData.docs.map((doc) => ({
        key: doc.id, ...doc.data(), id: doc.id
      }));
      // update stall rating
      if (allRevs.length > 0) {
        console.log("updating stall rating")
        const sum = allRevs.reduce((acc, item) => {
          return acc + item.Rating;
        }, 0);
        const avgRating = sum / allRevs.length;
        const newFields = {
          rating: avgRating
        };
        await updateDoc(doc(db, stallPath, stallID), newFields);
      }
      window.location.reload();
    }
  }

  // Page content
  const cont = (
    <>
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
                <h1 className="display-2 text-white mb-0 ml-2 text-nowrap">Your reviews</h1>
                <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                  You can view all the reviews that you have posted here!
                </p>
                <Button
                  className="my-2 mx-2"
                  color="warning"
                  href="#pablo"
                  onClick={(e) =>{ 
                    e.preventDefault();
                    navigate(`/admin/cr/${uids}`);
                  }}
                >
                  Create new review
                </Button>
                <Button
                  className="my-2 mx-2"
                  color="light"
                  href="#pablo"
                  onClick={(e) =>{ 
                    e.preventDefault();
                    navigate(`/admin/reviews`);
                  }}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        {/* add new review  */}

        <Container className='mt--7' fluid>
          <Row>
            {/* Reviews */}
            {/* uses getDocs  */}
            <div className='col text-center m-4'>
              {/* Filter by User's own reviews and map to display  */}
              {revs.map((rev, idx) => {
                const date = new Date(rev.Time.seconds * 1000);
                return (<div key={rev.id}>
                  <Review 
                    recPage={false}
                    deleteRev={deleteRev}
                    updateRev={`/admin/updatereview/${rev.id}/${rev.EateryID}/${rev.StallID}/${rev.UserID}`}
                    id={rev.id}
                    poster={rev.Poster}
                    content={rev.Content}
                    rating={rev.Rating}
                    time={date.toString()}
                    idx={idx}
                    eatery={rev.Eatery}
                    stall={rev.Stall}
                    revpic={rev.RevPic}
                    eateryID={rev.EateryID}
                    stallID={rev.StallID}
                    uid={rev.UserID}
                    viewerUID={uids}
                  />
                </div>);
              })}
            </div>
          </Row>
        </Container>
      </div>
    </>)
  
  return (loading ? <div className="pb-8 pt-5 pt-md-8 text-center"><Spinner /></div> : callAlert ? 
    <div className="pb-8 pt-0 pt-md-0">
      <Container fluid>
        <Row>
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold text-body-emphasis">You have not created a profile yet.</h1>
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
    </div> : cont)
}

export default ProfileReviews;