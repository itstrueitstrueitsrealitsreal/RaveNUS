import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { db, storage } from "../../components/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import { v4 } from "uuid";
import Input from "../../components/Input";
import { ref, uploadBytes } from "firebase/storage";

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

  // loc and stall and user
  const [loc, setLoc] = useState({});
  const [stall, setStall] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    const getItems = async () => {
      const locDoc = await getDoc(doc(db, "eateries", locID));
      // console.log(locDoc)
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
    console.log(typeof(value));

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
        navigateToReviews(); 
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
            onClick={handleRating}
          />
          <Form.Group>
            <Form.Label>Review Picture:</Form.Label>
            <Input type="file" onChange={handleImage}>here</Input>
          </Form.Group>
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