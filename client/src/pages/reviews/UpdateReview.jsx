import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/firebase";

function UpdateReview(props) {
  console.log("Update Review..");

  const navigate = useNavigate();
  const location = useLocation();

  const navigateToReviews = () => {
    navigate('/reviews');
  }

  // current userID
  const uid = UserID();

  const revID = location.pathname.split("/")[2];
  const revRef = doc(db, "reviews", revID);
  const [rev, setRev] = useState({
    Poster: "",
    Content: "",
    Rating: 0,
    Time: new Date(Date.now()),
    UserID: uid
  });

  useEffect(() => {
    const getRev = async () => {
      const doc = await getDoc(revRef);
      setRev(doc.data());
    }
    getRev();
  }, []);

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

  const updateRev = async () => {
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

  const cont = (
    <div>
      <button onClick={navigateToReviews}>Back</button>
      <div>
        <input name="Poster" value={rev.Poster} placeholder="Poster" onChange={handleRev}/>
        <input name="Content" value={rev.Content} placeholder="Content" onChange={handleRev}/>
        <input name="Rating" value={rev.Rating} type="number" placeholder="Rating" onChange={handleRev}/>
        <button onClick={updateRev}>Update Review</button>
      </div>
    </div> )

  return <Navbar content={cont} />
}

export default UpdateReview;