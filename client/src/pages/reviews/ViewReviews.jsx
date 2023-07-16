import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase";
import Navbar from "../../components/Navbar";
import { Button } from "react-bootstrap";
import Review from "../../components/Review";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useLocation } from "react-router-dom";

function ViewReviews(props) {
  console.log("View Reviews Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/admin/reviews');
  }

  // loading state
  const [loading, setLoading] = useState(true);

  // url
  const location = useLocation();
  // eatery id
  const eateryID = location.pathname.split("/")[3];
  // stall id
  const stallID = location.pathname.split("/")[4];

  // paths
  const stallRevsPath = "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews";
  // Reviews
  const [revs, setRevs] = useState([]);
  // location
  const [eatery, setEatery] = useState({});
  // stalls
  const [stall, setStall] = useState({});
  useEffect(() => {
    const getRevs = async () => {
        // get reviews
        const data = await getDocs(collection(db, stallRevsPath));
        const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
        setRevs(allRevs);
        // get eatery
        const locRef = doc(db, "eateries/" + eateryID);
        const loc = await getDoc(locRef);
        setEatery(loc.data());
        // get stall
        const sRef = doc(db, "eateries/" + eateryID + "/Stalls/", stallID);
        const s = await getDoc(sRef);
        setStall(s.data());
        setLoading(false);
    }
    getRevs();
  }, []);

  // Page Content
  const cont = (
    <div>
      <Button variant="primary" onClick={navigateToReviews}>Back</Button>
      <h2>Stall Reviews</h2>
      {/* SELECTED EATERY  */}
      <h3>Eatery: {eatery.name}</h3>
      <br />
      {/* SELECTED Stall  */}
      <h3>Stall: {stall.name}</h3>
      <br />
      {revs.map((rev, idx) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div key={rev.id}>
            <Review 
              recPage={true}
              updateRev={`/reviews`}
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
              viewerUID={props.viewerUID}
            />
          </div>);
        })}
    </div>
  )

  return loading ? <div className="pb-8 pt-5 pt-md-8 text-center"><Spinner /></div> : cont
}

export default ViewReviews;