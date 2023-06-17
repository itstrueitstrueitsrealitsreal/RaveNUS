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
        <h1>Create a new Review!</h1>
        <input name="Poster" value={newRev.Poster} placeholder="Poster" onChange={handleRev}/><br />
        <input name="Content" value={newRev.Content} placeholder="Content" onChange={handleRev}/><br />
        <input name="Rating" value={newRev.Rating} type="number" placeholder="Rating" onChange={handleRev}/><br />
        <br /><button className="btn btn-primary btn-lg px-4 gap-3" onClick={addReview}>Add Review</button>
      </div>

      <div>
        <br />
        <button variant="primary" onClick={navigateToReviews}>Back</button>
      </div>
    </div> )

  return <Navbar content={cont} />
}

export default CreateReview;