import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function CRStall() {
  console.log("Create Review Step 2: Stall Selection");

  // page navigation
  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/reviews');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[2];
  // locID
  const locID = location.pathname.split("/")[3];

  // location
  const [eatery, setEatery] = useState({});
  // stalls
  const [stalls, setStalls] = useState([]);
  const stallsCollectionRef = collection(db, "eateries/" + locID + "/Stalls");
  useEffect(() => {
    const getStalls = async () => {
      console.log("retrieving stalls");
      const data = await getDocs(stallsCollectionRef);
      const allStalls = data.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
        id: doc.id
      }));
      setStalls(allStalls);
      console.log("retrieving location");
      const locRef = doc(db, "eateries/" + locID);
      const loc = await getDoc(locRef);
      setEatery(loc.data());
    }
    getStalls();
  }, []);

  // stall chosen
  const [stallID, setStallID] = useState(null);

  // Page content
  const cont = (
    <div>
      <h1>Create a New Review!</h1>
      <br />
      <h2>Step 2: Select an Stall!</h2>
      <br />
      <h3>Eatery: {eatery.name}</h3>
      <br />
      <Form>
        <Form.Group>
        <Form.Label>Stall</Form.Label>
        <FormControl fullWidth>
          <InputLabel>Stall</InputLabel>
          <Select
            value={stallID}
            label="Stall"
            onChange={(event) => {setStallID(event.target.value)}}
          >
          {stalls.map((stall) => {
            return <MenuItem key={stall.id} value={stall.id}>{stall.name}</MenuItem>
          })}
          </Select>
        </FormControl>
        </Form.Group>

        <br />
        <Button className="btn btn-light">
          <Link to={`/cr/${uid}`}>Back</Link>
        </Button>
        <Button className="btn btn-light">
          <Link to={`/cr/${uid}/${locID}/${stallID}`}>Next</Link>
        </Button>
      </Form>    

      <br />
      <br />
      <div>
        <Button variant="primary" onClick={navigateToReviews}>Cancel</Button>
      </div>
    </div>
  )

  return <Navbar content={cont} />
}