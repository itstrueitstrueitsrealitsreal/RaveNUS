import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';

function CreateReview(props) {
  console.log("Create Review..");

  const navigate = useNavigate();

  const navigateToReviews = () => {
    navigate('/reviews');
  }

  const revsCollectionRef = collection(db, "reviews");

  // current userID
  const uid = UserID();

  const [newRev, setNewRev] = useState({
    Poster: "",
    Content: "",
    Rating: 0,
    Time: new Date(Date.now()),
    UserID: uid
  });

  // new review state
  function handleRev(event) {
    const { name, value } = event.target;
    console.log("handling rev...");

    setNewRev(prevRev => {
      return {
        ...prevRev,
        [name]: value,
        UserID: uid,
        Time: new Date(Date.now())
      };
    });
  }

  // add review to db
  const addReview = async () => {
    if (newRev.Content === "" || newRev.Poster === "") {
      alert("All fields are mandatory.")
    } else { 
      const confirmed = window.confirm("Are you sure you want to Create this Review?\n"
        + "\n    Content: " + newRev.Content + "\n    Rating: " + newRev.Rating);
      if (confirmed) {
        console.log("adding review...");
        delete(newRev.undefined);
        await addDoc(revsCollectionRef, newRev);
        setNewRev({
          Poster: "",
          Content: "",
          Rating: 0,
          Time: new Date(Date.now()),
          UserID: uid
        });
        navigateToReviews(); 
      }
    }
  };

  // Page content
  const cont = (
    <div>
      <div>
        <h1>Create a new review!</h1>
        <Form>
          <Form.Group 
            className="mb-3" 
            controlId="exampleForm.ControlInput1">
            <Form.Label>Name:</Form.Label>
            <Form.Control 
              type="Poster" 
              placeholder="Name"
              name="Poster" 
              value={newRev.Poster}
              onChange={handleRev} 
            />
          </Form.Group>

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
            onClick={handleRev}
          />
          <br />
          <Button 
            className="btn btn-primary btn-lg px-4 gap-2" 
            variant="primary" 
            onClick={addReview}>
            Add Review
          </Button>
        </Form>
        <br />
      </div>

      <div>
        <Button variant="primary" onClick={navigateToReviews}>Back</Button>
      </div>
    </div> )

  return <Navbar content={cont} />
}

export default CreateReview;