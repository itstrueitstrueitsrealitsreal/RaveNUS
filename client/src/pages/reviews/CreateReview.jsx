import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { db } from "../../components/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import { v4 } from "uuid";

function CreateReview(props) {
  console.log("Create Review..");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/reviews');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[2];
  // locID
  const locID = location.pathname.split("/")[3];
  // stallID
  const stallID = location.pathname.split("/")[4];

  // paths
  const stallPath = "eateries/" + locID + "/Stalls/" + stallID + "/reviews";
  const userPath = "profile/" + uid + "/reviews";
  
  // new review
  const [newRev, setNewRev] = useState({
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
        const id = v4();
        console.log("adding review...");
        delete(newRev.undefined);
        // add review to stall
        await setDoc(doc(db, stallPath, id), newRev);
        // add review to user
        await setDoc(doc(db, userPath, id), newRev);
        setNewRev({
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
        <h2>Step 3: Write your Review!</h2>
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

      <Button className="btn btn-light">
        <Link to={`/cr/${uid}/${locID}`}>Back</Link>
      </Button>

      <div>
        <Button variant="primary" onClick={navigateToReviews}>Cancel</Button>
      </div>
    </div> )

  return <Navbar content={cont} />
}

export default CreateReview;