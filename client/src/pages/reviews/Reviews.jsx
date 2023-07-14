import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import { db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function Reviews(props) {
  console.log("Reviews Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfileReviews = () => {
    navigate('/reviews/profile');
  }

  // Get Eateries and Stalls
  const [eateries, setEateries] = useState([]);
  const [stalls, setStalls] = useState([]);
  const eateriesCollectionRef = collection(db, "eateries");
  useEffect(() => {
    const getEateriesAndStalls = async () => {
      // get Eateries
      console.log("retrieving eateries");
      const eatData = await getDocs(eateriesCollectionRef);
      var allEateries = eatData.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
        id: doc.id,
      }));
      allEateries.forEach((object, index) => {
        object.index = index;
      });
      setEateries(allEateries);
      // get Stalls
      console.log("retrieving stalls");
      var allStalls = [];
      for (let i = 0; i < allEateries.length; i++) {
        const eateryID = allEateries[i].id;
        const s = await findStalls(eateryID);
        allStalls.push(s);
      }
      setStalls(allStalls);
    }
    getEateriesAndStalls();
  }, []);

  // Get Stalls of Eatery
  const findStalls = async (id) => {
    if (id) {
      const stallsPath = "eateries/" + id + "/Stalls/";
      const stallsData = await getDocs(collection(db, stallsPath));
      const allStalls = stallsData.docs.map((doc) => ({
        key: doc.id, ...doc.data(), id: doc.id, eateryID: id
      }));
      return allStalls;
    }
  }

  // location of eatery
  const [eatID, setEatID] = useState(null);
  const [eatIndex, setEatIndex] = useState(0);
  // location of stall
  const [stallID, setStallID] = useState(null);

  // Page content
  const cont = (
    stalls.length !== 0 ?
    <div>
      <h1>REVIEWS PAGE</h1>
      <Button variant="primary" onClick={navigateToProfileReviews}>Your Reviews</Button>

      <Form>
        <Form.Group>
        <Form.Label>Eatery</Form.Label>
        <FormControl fullWidth>
          <InputLabel>Eatery</InputLabel>
          <Select
            value={eatIndex}
            label="Eatery"
            onChange={(event) => {
              var i = event.target.value;
              var e = eateries[i]
              setEatIndex(i);
              setEatID(e.id);
            }}
          >
          {eateries.map((eat) => {
            return <MenuItem value={eat.index}>{eat.name}</MenuItem>
          })}
          </Select>
        </FormControl>
        </Form.Group>

        <Form.Group>
        <Form.Label>Stall</Form.Label>
        <FormControl fullWidth>
          <InputLabel>Stall</InputLabel>
          <Select
            value={stallID}
            label="Eatery"
            onChange={(event) => {setStallID(event.target.value)}}
          >
          {stalls[eatIndex].map((s) => {
            return <MenuItem value={s.id}>{s.name}</MenuItem>
          })}
          </Select>
        </FormControl>
        </Form.Group>

        {/* review query */}
        <Button onClick={() => {navigate(`/vr/${eatID}/${stallID}`)}}>View Reviews</Button>
      </Form>
    </div> :
    <div className="pb-8 pt-5 pt-md-8"><h1 className="text-center">Quota exceeded</h1></div>
  )

  return cont;
}

export default Reviews;