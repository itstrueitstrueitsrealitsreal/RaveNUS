import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth, authForFirebaseUI, storage } from "../../components/firebase";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Review from "../../components/Review";
import Spinner from 'react-bootstrap/Spinner';
import { deleteObject, ref } from "firebase/storage";

function Reviews(props) {
  console.log("Reviews Page called");

  // loading state
  const [loading, setLoading] = useState(true);

  // current userID
  const [uids, setUids] = useState(null);
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUids(authForFirebaseUI.currentUser.uid);
    } else {
      window.location.reload();
    }
  })

  // check if user has created a profile
  const [callAlert, setCallAlert] = useState(false);
  const checkUser = async (userid) => {
    try {
      console.log("userid trying: " +uids)
      const documentRef = doc(db, "profile", userid);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        console.log("document exists");
      } else {
        console.log("document doesnt exist");
        setCallAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (uids !== null) {
    checkUser(uids);
  }

  // Read db 
  const [revs, setRevs] = useState([]);
  const path = "profile/" + uids + "/reviews";
  
  useEffect(() => {
    const getRevs = async () => {
        // getting reviews
        console.log("Reviews getRev called");
        const data = await getDocs(collection(db, path));
        const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
        setRevs(allRevs);
        setLoading(false);
    }
    getRevs();
  }, [uids]);

  // delete review
  const deleteRev = async (revID, content, rating, uid, eateryID, stallID, eatery, stall, revpic) => {
    const confirmed = window.confirm("Are you sure you want to Delete this Review?\n"
        + "\n    Eatery: " + eatery + "\n    Stall: " + stall
        + "\n    Content: " + content + "\n    Rating: " + rating);
    if (confirmed) {
      const userRevRef = doc(db, "profile/" + uid + "/reviews", revID);
      const stallRevRef = doc(db, "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews", revID);
      const delRef = ref(storage, revpic);
      await deleteObject(delRef);
      await deleteDoc(userRevRef);
      await deleteDoc(stallRevRef);
      window.location.reload();
    }
  }

  // Page content
  const cont = (
    <div>
      <h1>REVIEWS PAGE</h1>

      {/* add new review  */}
      {callAlert ? 
      <div>
        <h2>Oops! You have yet to Create a Profile!</h2>
        <p>Create a Profile from the Profile Page to start creating reviews!</p>
      </div> 
      : <Button className="btn btn-light">
        <Link to={`/cr/${uids}`}>Create New Review</Link>
      </Button>}
      
      {/* Reviews */}
      {/* uses getDocs  */}
      <div>
        {/* Filter by User's own reviews and map to display  */}
        {revs.map((rev, idx) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div key={rev.id}>
            <Review 
              deleteRev={deleteRev}
              updateRev={`/updatereview/${rev.id}/${rev.EateryID}/${rev.StallID}/${rev.UserID}`}
              id={rev.id}
              poster={rev.Poster}
              content={rev.Content}
              rating={rev.Rating}
              time={date.toString()}
              idx={idx}
              eatery={rev.Eatery}
              stall={rev.Stall}
              revpic={rev.RevPic}
              eateryID={rev.EateryID}
              stallID={rev.StallID}
              uid={rev.UserID}
            />
          </div>);
        })}
      </div>
      
    </div>)
  
  return (<Navbar content={loading ? <Spinner /> : cont} />)
}

export default Reviews;