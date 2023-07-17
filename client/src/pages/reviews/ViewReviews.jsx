import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase";
import Review from "../../components/Review";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useLocation } from "react-router-dom";
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
} from "reactstrap";
import img from "../../components/img/profpicheader.png";

function ViewReviews(props) {
  console.log("View Reviews Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/admin/reviews');
  }

  // loading state
  const [loading, setLoading] = useState(true);

  // url
  const location = useLocation();
  // eatery id
  const eateryID = location.pathname.split("/")[3];
  // stall id
  const stallID = location.pathname.split("/")[4];

  // paths
  const stallRevsPath = "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews";
  // Reviews
  const [revs, setRevs] = useState([]);
  // location
  const [eatery, setEatery] = useState({});
  // stalls
  const [stall, setStall] = useState({});
  useEffect(() => {
    const getRevs = async () => {
        // get reviews
        const data = await getDocs(collection(db, stallRevsPath));
        const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
        setRevs(allRevs);
        // get eatery
        const locRef = doc(db, "eateries/" + eateryID);
        const loc = await getDoc(locRef);
        setEatery(loc.data());
        // get stall
        const sRef = doc(db, "eateries/" + eateryID + "/Stalls/", stallID);
        const s = await getDoc(sRef);
        setStall(s.data());
        setLoading(false);
    }
    getRevs();
  }, []);

  // Page Content
  const cont = eateryID !== 'null' && stallID !== 'null' && revs.length !== 0 ? (
    <>
    {/* header */}
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
              <h1 className="display-2 text-white mb-0 ml-2">View reviews for: {stall.name}, {eatery.name}</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                You can view all reviews for {stall.name} here!
              </p>
              <Button
                className="my-2 mx-2"
                color="warning"
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
      <Container className="mt--7" fluid>
      </Container>
      <Row>
        <div className="col text-center m-4">
          {revs.map((rev, idx) => {
              const date = new Date(rev.Time.seconds * 1000);
              return (<div key={rev.id}>
                <Review 
                  recPage={true}
                  updateRev={`/reviews`}
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
                  viewerUID={props.viewerUID}
                />
              </div>);
            })}
        </div>
      </Row>
    </>
  ) : 
    <div className="pb-8 pt-0 pt-md-0">
      <Container fluid>
        <Row>
          <div className="px-4 py-5 my-5 text-center">
            <h2 className="display-5 fw-bold text-body-emphasis">No reviews matching your search criteria have been posted.</h2>
            <div className="col-lg-6 mx-auto">
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Button className="mt-5" type='button' color='default' onClick={(e) => {
                  e.preventDefault();
                  navigateToReviews();
                }}>Back</Button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div> 

  return loading ? <div className="pb-8 pt-5 pt-md-8 text-center"><Spinner /></div> : cont
}

export default ViewReviews;