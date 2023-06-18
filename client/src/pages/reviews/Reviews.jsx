import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Reviews() {
  console.log("Reviews Page called");

  // navigation 
  const navigate = useNavigate();

  const navigateToCreateReview = () => {
    navigate('/createreview');
  }

  // current userID
  const uid = UserID();

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

  // delete review
  const deleteRev = async (id, content, rating) => {
    const confirmed = window.confirm("Are you sure you want to Delete this Review?\n"
        + "\n    Content: " + content + "\n    Rating: " + rating);
    if (confirmed) {
      const revDoc = doc(db, "reviews", id);
      await deleteDoc(revDoc);
      window.location.reload();
    }
  }

  // Page content
  const cont = (
    <div>
      <h1>REVIEWS PAGE</h1>

      {/* add new review  */}
      <Button onClick={navigateToCreateReview}>Create New Review</Button>

      {/* Reviews */}
      {/* uses getDocs  */}
      <div>
        {/* Filter by User's own reviews and map to display  */}
        {revs.filter((r) => r.UserID === uid ? true : false).map((rev) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div className="individualReview" key={rev.id}>
            <p>Poster: {rev.Poster}</p>
            <p>Content: {rev.Content}</p>
            <p>Rating: {rev.Rating}</p>
            <p>Time: {date.toString()}</p>

            {/* update the review  */}
            <Button className="btn btn-light"><Link to={`/updatereview/${rev.id}`}>Edit</Link></Button>

            {/* delete the review  */}
            <Button onClick={() => {deleteRev(rev.id, rev.Content, rev.Rating)}}>Delete</Button>
          </div>);
        })}
      </div>
      
    </div>)
  
  return <Navbar content={cont} />
}

export default Reviews;