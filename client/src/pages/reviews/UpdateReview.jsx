import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/firebase";
import { Button, Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';

function UpdateReview(props) {
  console.log("Update Review..");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/reviews');
  }

  // current userID
  const uid = UserID();

  // review id
  const location = useLocation();
  const revID = location.pathname.split("/")[2];
  const revRef = doc(db, "reviews", revID);

  // review states
  const [rev, setRev] = useState({
    Poster: "",
    Content: "",
    Rating: 0,
    Time: new Date(Date.now()),
    UserID: uid
  });
  const [oldRev, setOldRev] = useState({});

  // retrive old review
  useEffect(() => {
    const getRev = async () => {
      const doc = await getDoc(revRef);
      setRev(doc.data());
      setOldRev(doc.data());
    }
    getRev();
  }, []);

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
        + "\n    Content: " + oldRev.Content + "\n    Rating: " + oldRev.Rating
        + "\n"
        + "\n  NEW:"
        + "\n    Content: " + rev.Content + "\n    Rating: " + rev.Rating);
    if (confirmed) {
      const newFields = {
        Poster: rev.Poster,
        Content: rev.Content,
        Rating: rev.Rating,
        UserID: uid,
        Time: new Date(Date.now())
      };
      await updateDoc(revRef, newFields);
      navigateToReviews();
    }
  }

  // Page content
  const cont = (
    <div>
      <div>
      <h1>Edit Review</h1>
        <Form>
          <Form.Group 
            className="mb-3" >
            <Form.Label>Name:</Form.Label>
            <Form.Control 
              type="Poster" 
              placeholder="Name"
              name="Poster" 
              value={rev.Poster}
              onChange={handleRev} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Type your review here:</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="Content" 
              value={rev.Content} 
              placeholder="Content" 
              onChange={handleRev}/>
          </Form.Group>
          <Form.Label>Rating:</Form.Label> <br/>
          <Rating 
            name="Rating"
            type="number"
            placeholder="Rating"
            value={rev.Rating}
            onClick={handleRating}
          />
          <br />
          <Button 
            className="btn btn-primary btn-lg px-4 gap-2" 
            variant="primary" 
            onClick={updateRev}>
            Update Review
          </Button>
        </Form>
      </div>

      <div>
        <br />
        <Button onClick={navigateToReviews}>Back</Button>
      </div>
    </div> )

  return <Navbar content={cont} />
}

export default UpdateReview;