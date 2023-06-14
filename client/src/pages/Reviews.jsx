import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

function Reviews() {

  const [revs, setRevs] = useState([]);
  const revsCollectionRef = collection(db, "reviews");

  useEffect(() => {
    const getRevs = async () => {
      const data = await getDocs(revsCollectionRef);
      setRevs(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getRevs()
  })

  return (
    <div>
      <h1>REVIEWS PAGE</h1>
      {revs.map((rev) => {
        return (<div>
          <p>Poster: {rev.Poster}</p>
          <p>Content: {rev.Content}</p>
          <p>Rating: {rev.Rating}</p>
          {/* <p>Time: {rev.Time}</p> */}
        </div>)
        })}
    </div>)
  
}

export default Reviews;