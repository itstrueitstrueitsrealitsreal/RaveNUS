import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function CREatery() {
  console.log("Create Review Step 1: Eatery Selection");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/reviews');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[2];

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
        <Button className="btn btn-light">
          <Link to={`/cr/${uid}/${locID}`}>Next</Link>
        </Button>
      </Form>

      <br />  

      <div>
        <Button variant="primary" onClick={navigateToReviews}>Cancel</Button>
      </div>
    </div>
  )

  return <Navbar content={cont} />
}