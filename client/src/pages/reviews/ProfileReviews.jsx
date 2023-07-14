import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db, auth, authForFirebaseUI, storage } from "../../components/firebase";
import Navbar from "../../components/Navbar";
import { Button } from "react-bootstrap";
import Review from "../../components/Review";
import Spinner from 'react-bootstrap/Spinner';
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function ProfileReviews(props) {
  console.log("Profile Reviews Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/admin/reviews');
  }

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
      // paths
      const stallRevsPath = "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews";
      const stallPath = "eateries/" + eateryID + "/Stalls/";
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
      window.location.reload();
    }
  }

  // Page content
  const cont = (
    <div>
      <h1>REVIEWS PAGE</h1>
      <h2>Your Reviews</h2>
      <Button variant="primary" onClick={navigateToReviews}>Back</Button>
      <br />

      {/* add new review  */}
      {callAlert ? 
      <div>
        <h2>Oops! You have yet to Create a Profile!</h2>
        <p>Create a Profile from the Profile Page to start creating reviews!</p>
      </div> 
      : <Button className="btn btn-light" onClick={() => {navigate(`/admin/cr/${uids}`)}}>Create New Review</Button>}
      <br />
      <br />
      
      {/* Reviews */}
      {/* uses getDocs  */}
      <div>
        {/* Filter by User's own reviews and map to display  */}
        {revs.map((rev, idx) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div key={rev.id}>
            <Review 
              recPage={false}
              deleteRev={deleteRev}
              updateRev={`/admin/updatereview/${rev.id}/${rev.EateryID}/${rev.StallID}/${rev.UserID}`}
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
              viewerUID={uids}
            />
          </div>);
        })}
      </div>
      
    </div>)
  
  return (<Navbar content={loading ? <Spinner /> : cont} />)
}

export default ProfileReviews;