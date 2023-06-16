import { collection, getDocs, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";
import { auth } from "../components/firebase"

function Reviews() {
  console.log("Reviews Page called");

  // current user 
  const user = auth.currentUser;
  const uid = user.uid;

  // Add to db 
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
        [name]: value
      };
    });
  }

  const addReview = async () => {
    console.log("adding...");
    await addDoc(revsCollectionRef, newRev);
    setNewRev({
      Poster: "",
      Content: "",
      Rating: 0,
      Time: new Date(Date.now()),
      UserID: uid
    });
  };

  // Read db 
  const [revs, setRevs] = useState([]);
  const revsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    const getRevs = async () => {
      console.log("Reviews getRev called");
      const data = await getDocs(revsCollectionRef);
      const x = data.docs.map((doc) => ({key: doc.id, ...doc.data(), id: doc.id}));
      setRevs(x);
    }
    getRevs()
  }, []);

  return (
    <div>
      <h1>REVIEWS PAGE</h1>

      {/* Add review  */}
      {/* uses addDoc  */}
      <div>
        <input name="Poster" value={newRev.Poster} placeholder="Poster" onChange={handleRev}/>
        <input name="Content" value={newRev.Content} placeholder="Content" onChange={handleRev}/>
        <input name="Rating" value={newRev.Rating} type="number" placeholder="Rating" onChange={handleRev}/>
        <button onClick={addReview}>Add Review</button>
      </div>

      {/* Reviews */}
      {/* uses getDocs  */}
      <div>
        {revs.map((rev) => {
          const date = new Date(rev.Time.seconds * 1000);
          return (<div key={rev.id}>
            <p>Poster: {rev.Poster}</p>
            <p>Content: {rev.Content}</p>
            <p>Rating: {rev.Rating}</p>
            <p>Time: {date.toString()}</p>
          </div>);
        })}
      </div>
      
    </div>)
  
}

export default Reviews;