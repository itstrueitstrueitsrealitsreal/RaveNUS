import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db, storage } from "../../components/firebase";
import { Button, Form, Card } from "react-bootstrap";
import Rating from '@mui/material/Rating';
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import Input from "../../components/Input";

function UpdateReview(props) {
  console.log("Update Review..");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/reviews');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[5];
  // review id
  const revID = location.pathname.split("/")[2];
  // eatery id
  const eateryID = location.pathname.split("/")[3];
  // stall id
  const stallID = location.pathname.split("/")[4];

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
      navigateToReviews();
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
    navigateToReviews();
  }

  // Page content
  const cont = (
    <div>
      <div>
      <h1>Edit Review</h1>
        <Card className="my-2">
          <Card.Body>
            {/* eatery */}
            <Card.Text>
              {"Eatery: " + oldRev.Eatery}
            </Card.Text>
            {/* stall */}
            <Card.Text>
              {"Stall: " + oldRev.Stall}
            </Card.Text>
            {/* image */}
            <Card.Img variant="top" src={revPicURL} alt="" />
          </Card.Body>
        </Card>
        <Button onClick={removeImage}>Remove Review Picture</Button>
        <Form>
          {/* content */}
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
          {/* rating */}
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
            variant="primary" 
            onClick={editAll}>
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