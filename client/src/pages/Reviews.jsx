import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";
import Navbar from "../components/Navbar";
import UserID from "../components/auth/UserID";
import UpdateReview from "./reviews/UpdateReview";
import CreateReview from "./reviews/CreateReview";
import { useNavigate } from "react-router-dom";

function Reviews() {
  console.log("Reviews Page called");

  // navigation 
  const navigate = useNavigate();

  const navigateToUpdateReview = () => {
    navigate('/updatereview');
  }

  const navigateToCreateReview = () => {
    navigate('/createreview');
  }

  // current userID
  const uid = UserID();

  // Add to db 
  // const [newRev, setNewRev] = useState({
  //   Poster: "",
  //   Content: "",
  //   Rating: 0,
  //   Time: new Date(Date.now()),
  //   UserID: uid
  // });

  // function handleRev(event) {
  //   const { name, value } = event.target;
  //   console.log("handling rev...");

  //   setNewRev(prevRev => {
  //     return {
  //       ...prevRev,
  //       [name]: value,
  //       UserID: uid
  //     };
  //   });
  // }

  // const addReview = async () => {
  //   console.log("adding...");
  //   await addDoc(revsCollectionRef, newRev);
  //   setNewRev({
  //     Poster: "",
  //     Content: "",
  //     Rating: 0,
  //     Time: new Date(Date.now()),
  //     UserID: uid
  //   });
  // };

  // Read db 
  const [revs, setRevs] = useState([]);
  const revsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    const getRevs = async () => {
      console.log("Reviews getRev called");
      const data = await getDocs(revsCollectionRef);
      const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
      setRevs(allRevs);
    }
    getRevs()
  }, []);

  // const updateRev = async (old) => {

  // }

  const cont = (
    <div>
      <h1>REVIEWS PAGE</h1>

      <button onClick={navigateToCreateReview}>Create New Review</button>

      {/* Add review  */}
      {/* uses addDoc  */}
      {/* <div>
        <input name="Poster" value={newRev.Poster} placeholder="Poster" onChange={handleRev}/>
        <input name="Content" value={newRev.Content} placeholder="Content" onChange={handleRev}/>
        <input name="Rating" value={newRev.Rating} type="number" placeholder="Rating" onChange={handleRev}/>
        <button onClick={addReview}>Add Review</button>
      </div> */}

      {/* Reviews */}
      {/* uses getDocs  */}
      <div>
        {/* Filter by User's own reviews and map to display  */}
        {revs.filter((r) => r.UserID === uid ? true : false).map((rev) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div key={rev.id}>
            <p>Poster: {rev.Poster}</p>
            <p>Content: {rev.Content}</p>
            <p>Rating: {rev.Rating}</p>
            <p>Time: {date.toString()}</p>
            {/* <button onClick={updateRev(rev)}>Edit</button> */}
          </div>);
        })}
      </div>
      
    </div>)
  
  return <Navbar content={cont} />
}

export default Reviews;