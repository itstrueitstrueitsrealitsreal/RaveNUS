import React, { useState, useEffect } from "react";
import Review from "../Review";
import Rating from '@mui/material/Rating';
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth, authForFirebaseUI, storage } from "../../components/firebase";

function Rec(props) {
  console.log("Rec Component called");

  // const stalls = props.stalls;
  // const randomIndex = Math.floor(Math.random() * stalls.length);
  // const recStall = stalls[randomIndex];
  const recStall = props.stalls;

  // const [revs, setRevs] = useState([]);
  // const path = "eateries/" + recStall.eateryID + "/Stalls/" + recStall.id + "/reviews";
  
  // useEffect(() => {
  //   const getRevs = async () => {
  //       // getting reviews
  //       console.log("Reviews getRev called");
  //       const data = await getDocs(collection(db, path));
  //       const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
  //       setRevs(allRevs);
  //       // setLoading(false);
  //   }
  //   getRevs();
  // }, []);

  return <div>
    <h1>Recommendation: {recStall.name}</h1>
    <h2>Average Rating: {recStall.rating}/5</h2>
    {/* rating */}
    <Rating name="read-only" value={recStall.rating} max={5} readOnly />

    <br />
    <br />
    <h2>Not to your liking?</h2>
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button onClick={props.recPage} type="button" className="btn btn-primary btn-lg px-4 gap-3">Generate ANOTHER Recommendation</button>
    </div>
    <br />
    <br />

    <h2>Stall Reviews</h2>
    {props.revs.map((rev, idx) => {
        const date = new Date(rev.Time.seconds * 1000);
        return (<div key={rev.id}>
          <Review 
            // deleteRev={deleteRev}
            // updateRev={`/updatereview/${rev.id}/${rev.EateryID}/${rev.StallID}/${rev.UserID}`}
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

    <br />
    <br />
    
  </div>
}

export default Rec;