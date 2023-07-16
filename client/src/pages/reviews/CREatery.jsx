import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function CREatery() {
  console.log("Create Review Step 1: Eatery Selection");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfileReviews = () => {
    navigate('/admin/reviews/profile');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[3];

  // eateries
  const [eateries, setEateries] = useState([]);
  const eateriesCollectionRef = collection(db, "eateries");
  useEffect(() => {
    const getEateries = async () => {
      console.log("retrieving eateries");
      const data = await getDocs(eateriesCollectionRef);
      const allEateries = data.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
        id: doc.id
      }));
      setEateries(allEateries);
    }
    getEateries();
  }, []);

  // location of eatery
  const [locID, setLocID] = useState(null);

  // Page content
  const cont = (
    <div>
      <h1>Create a New Review!</h1>
      <br />
      <h2>Step 1: Select an Eatery!</h2>
      <br />
      {/* EATERY SELECTION  */}
      <Form>
        <Form.Group>
        <Form.Label>Eatery</Form.Label>
        <FormControl fullWidth>
          <InputLabel>Eatery</InputLabel>
          <Select
            value={locID}
            label="Eatery"
            onChange={(event) => {setLocID(event.target.value)}}
          >
          {eateries.map((eat) => {
            return <MenuItem value={eat.id}>{eat.name}</MenuItem>
          })}
          </Select>
        </FormControl>
        </Form.Group>

        <br />
        {/* NEXT BUTTON  */}
        <Button className="btn btn-light" onClick={() => {
          locID !== null ? navigate(`/admin/cr/${uid}/${locID}`) : 
          alert("Please select an Eatery before proceeding")}}>Next</Button>
      </Form>

      <br />  

      {/* CANCEL BUTTON  */}
      <div>
        <Button variant="primary" onClick={navigateToProfileReviews}>Cancel</Button>
      </div>
    </div>
  )

  return cont;
}