import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, addDoc } from "firebase/firestore";

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

  const addReview = async () => {
    if (newRev.Content === "" || newRev.Poster === "") {
      alert("All fields are mandatory.")
    } else { console.log("adding review...");
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
  };

  const cont = (
    <div>
      <button onClick={navigateToReviews}>Back</button>
      <div>
        <input name="Poster" value={newRev.Poster} placeholder="Poster" onChange={handleRev}/>
        <input name="Content" value={newRev.Content} placeholder="Content" onChange={handleRev}/>
        <input name="Rating" value={newRev.Rating} type="number" placeholder="Rating" onChange={handleRev}/>
        <button onClick={addReview}>Add Review</button>
      </div>
    </div> )

  return <Navbar content={cont} />
}

export default CreateReview;