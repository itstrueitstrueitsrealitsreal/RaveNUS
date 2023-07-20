import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../components/firebase";
import { Form, Card } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Input from "../../components/Input";
import img from "../../components/public/profpicheader.png";
import {
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardTitle
} from "reactstrap";

function UpdateReview(props) {
  console.log("Update Review..");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfileReviews = () => {
    navigate('/admin/reviews/profile');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[6];
  // review id
  const revID = location.pathname.split("/")[3];
  // eatery id
  const eateryID = location.pathname.split("/")[4];
  // stall id
  const stallID = location.pathname.split("/")[5];

  // review references
  const userRevRef = doc(db, "profile/" + uid + "/reviews", revID);
  const stallRevRef = doc(db, "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews", revID);
  // paths
  const stallRevsPath = "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews";
  const stallPath = "eateries/" + eateryID + "/Stalls/";

  // review states
  const [rev, setRev] = useState({
    Poster: "",
    Content: "",
    Rating: 0,
    Time: new Date(Date.now()),
    UserID: uid
  });
  const [oldRev, setOldRev] = useState({
    UserID: "not retrieved"
  });

  // retrive old review
  useEffect(() => {
    const getRev = async () => {
      const doc = await getDoc(userRevRef);
      setRev(doc.data());
      setOldRev(doc.data());
    }
    getRev();
  }, []);

  // retrieve old review pic
  const [revPicURL, setRevPicURL] = useState("");
  const revURL = async (name) => {
    const urlRef = ref(storage, name)
    const url = await getDownloadURL(urlRef)
    setRevPicURL(url.toString());
  }
  if (oldRev.UserID !== "not retrieved") {
    console.log("old review retrieved")
    console.log(oldRev)
    revURL(oldRev.RevPic);
  }

  // new review state
  function handleRev(event) {
    const { name, value } = event.target;
    console.log("updating rev field...");

    setRev(prevRev => {
      return {
        ...prevRev,
        [name]: value,
        UserID: uid,
        Time: new Date(Date.now())
      };
    });
  }

  function handleRating(event) {
    const { name, value } = event.target;
    const rate = Number(value);
    console.log("handling rev...");

    setRev(prevRev => {
      return {
        ...prevRev,
        [name]: rate,
        Time: new Date(Date.now())
      };
    });
  }

  // edit review
  const updateRev = async () => {
    const confirmed = window.confirm("Are you sure you want to Update this Review?\n"
        + "\n  OLD:"
        + "\n    Eatery: " + oldRev.Eatery + "\n    Stall: " + oldRev.Stall
        + "\n    Content: " + oldRev.Content + "\n    Rating: " + oldRev.Rating
        + "\n"
        + "\n  NEW:"
        + "\n    Eatery: " + oldRev.Eatery + "\n    Stall: " + oldRev.Stall
        + "\n    Content: " + rev.Content + "\n    Rating: " + rev.Rating);
    if (confirmed) {
      const newFields = {
        Poster: rev.Poster,
        Content: rev.Content,
        Rating: rev.Rating,
        UserID: uid,
        Time: new Date(Date.now()),
        Eatery: oldRev.Eatery,
        Stall: oldRev.Stall,
        StallID: oldRev.StallID,
        EateryID: oldRev.EateryID,
        RevPic: rev.RevPic
      };
      await updateDoc(userRevRef, newFields);
      await updateDoc(stallRevRef, newFields);
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
      navigateToProfileReviews();
    }
  };

  // new image
  const [newImage, setNewImage] = useState(null);
  const [newUploadLoc, setNewUploadLoc] = useState("");
  function handleImage(event) {
    setNewImage(event.target.files[0]);
    const a = `ReviewPictures/${v4()}`
    setNewUploadLoc(a)
    setRev(prevRev => {
      return {
        ...prevRev,
        RevPic: a
      }
    });
  }
  const uploadImage = () => {
    if (newImage === null) {
      setRev(prevRev => {
        return {
          ...prevRev,
          RevPic: oldRev.RevPic
        }
      });
    } else {
      const uploadRef = ref(storage, newUploadLoc);
      uploadBytes(uploadRef, newImage).then(() => {
        console.log("image uploaded " + newUploadLoc);
      })
    }
  }

  // remove image from firestore
  const removeFirestoreImage = async () => {
    const delRef = ref(storage, oldRev.RevPic);
    await deleteObject(delRef);
  }

  // update function
  function editAll() {
    if (newImage !== null) {
      uploadImage();
      removeFirestoreImage();
    }
    updateRev();
  }

  // remove review picture
  const removeImageRef = async () => {
    const confirmed = window.confirm("Are you sure you want to Remove your Review's Picture?");
    if (confirmed) {
      const newFields = {
        RevPic: ""
      };
      await updateDoc(userRevRef, newFields);
      await updateDoc(stallRevRef, newFields);
    }
  }
  function removeImage() {
    removeImageRef();
    removeFirestoreImage();
    navigateToProfileReviews();
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
              <h1 className="display-2 text-white mb-0 ml-2 text-nowrap">Edit Review</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                Edit your review below.
              </p> 
              <Button
                className="my-2 mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigateToProfileReviews();
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className='mt--7' fluid>
        <Card className="my-2">
          <CardHeader className='my-0 h1 bg-transparent'>
            Editing review for {oldRev.Stall}, {oldRev.Eatery}:
          </CardHeader>
          <Card.Body>
            <CardTitle className="h2">Image:</CardTitle>
            {/* image */}
            <Card.Img src={revPicURL} alt="" />
            <Button 
              className="my-2" 
              onClick={removeImage}
              color='danger'>Remove image</Button>
            <Form>
              {/* content */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Review content:</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="Content" 
                  value={rev.Content} 
                  placeholder="Content" 
                  onChange={handleRev}/>
              </Form.Group>
              {/* rating */}
              <Form.Label>Review rating:</Form.Label>
              <br/>
              <Rating 
                name="Rating"
                type="number"
                placeholder="Rating"
                value={rev.Rating}
                onClick={handleRating}
              />
              {/* new image */}
              <Form.Group>
                <Form.Label>Change Review Picture:</Form.Label>
                <Input type="file" onChange={handleImage}>here</Input>
              </Form.Group>
              <br />
              <Button 
                className="btn btn-primary btn-lg px-4 gap-2" 
                color='warning'
                onClick={editAll}>
                Update review
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container> 
    </>
  )

  return cont;
}

export default UpdateReview;