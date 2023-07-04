import { collection, getDocs } from "firebase/firestore";
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
    navigate('/reviews');
  }

  // loading state
  const [loading, setLoading] = useState(true);

  // url
  const location = useLocation();
  // eatery id
  const eateryID = location.pathname.split("/")[2];
  // stall id
  const stallID = location.pathname.split("/")[3];

  // path
  const stallRevsPath = "eateries/" + eateryID + "/Stalls/" + stallID + "/reviews";
  // get Reviews
  const [revs, setRevs] = useState([]);
  useEffect(() => {
    const getRevs = async () => {
        const data = await getDocs(collection(db, stallRevsPath));
        const allRevs = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
        setRevs(allRevs);
        setLoading(false);
    }
    getRevs();
  }, []);

  // Page Content
  const cont = (
    <div>
      <Button variant="primary" onClick={navigateToReviews}>Back</Button>
      <h2>Stall Reviews</h2>
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

  return (<Navbar content={loading ? <Spinner /> : cont} />)
}

export default ViewReviews;