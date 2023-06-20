import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Review from "../../components/Review";
import Spinner from 'react-bootstrap/Spinner';

function Reviews() {
  console.log("Reviews Page called");

  // loading state
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    getRevs();
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
        {revs.filter((r) => r.UserID === uid ? true : false).map((rev, idx) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div key={rev.id}>
            <Review 
              deleteRev={deleteRev}
              updateRev={`/updatereview/${rev.id}`}
              id={rev.id}
              poster={rev.Poster}
              content={rev.Content}
              rating={rev.Rating}
              time={date.toString()}
              idx={idx}
            />
          </div>);
        })}
      </div>
      
    </div>)
  
  return (<Navbar content={loading ? <Spinner /> : cont} />)
}

export default Reviews;