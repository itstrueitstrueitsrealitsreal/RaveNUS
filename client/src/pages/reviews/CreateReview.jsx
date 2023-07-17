import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { db, storage } from "../../components/firebase";
import { doc, setDoc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import { v4 } from "uuid";
import Input from "../../components/Input";
import { ref, uploadBytes } from "firebase/storage";
import img from "../../assets/img/theme/profpicheader.png";
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

function CreateReview(props) {
  console.log("Create Review..");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfileReviews = () => {
    navigate('/admin/reviews/profile');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[3];
  // locID
  const locID = location.pathname.split("/")[4];
  // stallID
  const stallID = location.pathname.split("/")[5];

  // paths
  const stallPath = "eateries/" + locID + "/Stalls/" + stallID + "/reviews";
  const userPath = "profile/" + uid + "/reviews";

  // loc and stall and user
  const [loc, setLoc] = useState({});
  const [stall, setStall] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    const getItems = async () => {
      const locDoc = await getDoc(doc(db, "eateries", locID));
      setLoc(locDoc.data());
      const stallDoc = await getDoc(doc(db, "eateries/" + locID + "/Stalls/", stallID));
      setStall(stallDoc.data());
      const userDoc = await getDoc(doc(db, "profile", uid));
      setUser(userDoc.data());
      
    }
    getItems();
  }, []);
  
  // new review
  const [newRev, setNewRev] = useState({
    Content: "",
    Rating: 0,
    Time: new Date(Date.now()),
    UserID: uid,
    RevPic: ""
  });

  // new review states
  function handleRev(event) {
    const { name, value } = event.target;
    console.log("handling rev...");

    setNewRev(prevRev => {
      return {
        ...prevRev,
        [name]: value,
        Time: new Date(Date.now())
      };
    });
  }

  function handleRating(event) {
    const { name, value } = event.target;
    const rate = Number(value);
    console.log("handling rev...");

    setNewRev(prevRev => {
      return {
        ...prevRev,
        [name]: rate,
        Time: new Date(Date.now())
      };
    });
  }

  // image
  const [image, setImage] = useState(null);
  const [uploadLoc, setUploadLoc] = useState("");
  // handle image
  function handleImage(event) {
    setImage(event.target.files[0]);
    const upLoc = `ReviewPictures/${v4()}`;
    setUploadLoc(upLoc);
    setNewRev(prevRev => {
      return {
        ...prevRev,
        RevPic: upLoc
      }
    })
  }
  // upload image
  const uploadImage = () => {
    if (image === null) {
      return;
    }
    const uploadRef = ref(storage, uploadLoc);
    uploadBytes(uploadRef, image).then(() => {
      console.log("review image uploaded " + uploadLoc);
    });
  }

  // add review to db
  const addReviewDoc = async () => {
    if (newRev.Content === "" || newRev.Poster === "") {
      alert("All fields are mandatory.")
    } else { 
      const confirmed = window.confirm("Are you sure you want to Create this Review?\n"
        + "\n    Eatery: " + loc.name + "\n    Stall: " + stall.name
        + "\n    Content: " + newRev.Content + "\n    Rating: " + newRev.Rating);
      if (confirmed) {
        const id = v4();
        console.log("adding review...");
        delete(newRev.undefined);
        const revToUpload = {
          Content: newRev.Content,
          Rating: newRev.Rating,
          Time: new Date(Date.now()),
          UserID: uid,
          Eatery: loc.name,
          Stall: stall.name,
          Poster: user.Username,
          RevPic: newRev.RevPic,
          EateryID: locID,
          StallID: stallID
        }
        // add review to stall
        await setDoc(doc(db, stallPath, id), revToUpload);
        // add review to user
        await setDoc(doc(db, userPath, id), revToUpload);
        setNewRev({
          Content: "",
          Rating: 0,
          Time: new Date(Date.now()),
          RevPic: ""
        });
        // get stall reviews
        const stallData = await getDocs(collection(db, stallPath));
        const allRevs = stallData.docs.map((doc) => ({
          key: doc.id, ...doc.data(), id: doc.id
        }));
        // if stall has at least 1 review, update rating
        if (allRevs.length > 0) {
          console.log("updating stall rating")
          const sum = allRevs.reduce((acc, item) => {
            return acc + item.Rating;
          }, 0);
          const avgRating = sum / allRevs.length;
          const newFields = {
            rating: avgRating
          };
          await updateDoc(doc(db, "eateries/" + locID + "/Stalls/", stallID), newFields);
        }
        navigateToProfileReviews(); 
      }
    }
  };

  // submit handle function
  function addReview() {
    uploadImage();
    addReviewDoc();
  }

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
              <h1 className="display-2 text-white mb-0 ml-2 text-nowrap">Create Review</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                Write your review below!
              </p> 
              <Button
                className="my-2 mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigate(`/admin/cr/${uid}/${locID}`);
                }}
              >
                Back
              </Button>
              <Button
                className="my-2 mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigate(`/admin/reviews/profile`);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt--7" fluid>
        <Row>
          <div className="col ">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 className="mb-0 h2">Currently reviewing: {stall.name}, {loc.name}</h2>
              </CardHeader>
              <CardBody>
                <div>
                  {/* REVIEW WRITING  */}
                  <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Type your review here:</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="Content" 
                        value={newRev.Content} 
                        placeholder="Content" 
                        onChange={handleRev}/>
                    </Form.Group>
                    <Form.Label>Rating:</Form.Label> <br/>
                    <Rating 
                      name="Rating"
                      type="number"
                      placeholder="Rating"
                      value={newRev.Rating}
                      onClick={handleRating}
                    />
                    <Form.Group>
                    <br/>
                      <Form.Label>Upload picture (optional):</Form.Label> 
                      <Input type="file" onChange={handleImage}/>
                    </Form.Group>
                    <br />
                    <Button 
                      className="px-4 gap-2" 
                      color='warning'
                      variant="primary" 
                      onClick={addReview}>
                      Add Review
                    </Button>
                  </Form>
                  <br />
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container> 
    </>)

  return cont;
}

export default CreateReview;