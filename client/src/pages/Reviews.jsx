import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

function Reviews() {
  console.log("Reviews Page called");

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

      <input placeholder="Poster"/>
      <input placeholder="Content"/>
      <input placeholder="Rating"/>
      <button>Add Review</button>

      {/* Reviews */}
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