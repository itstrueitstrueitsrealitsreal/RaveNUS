import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Form } from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardBody,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";

export default function CRStall() {
  console.log("Create Review Step 2: Stall Selection");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfileReviews = () => {
    navigate('/admin/reviews/profile');
  }

  // current userID
  const location = useLocation();
  const uid = location.pathname.split("/")[3];
  // locID
  const locID = location.pathname.split("/")[4];

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
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + "../../assets/img/profpicheader.png" + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white mb-0 ml-2 text-nowrap">Create Review</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                Select a stall from {eatery.name}.
              </p>
              <Button
                className="my-2 mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Back
              </Button>
              <Button
                className="my-2 mx-2"
                color="light"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigate(`/admin/reviews/profile`);
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className='mt--7' fluid>
        <Row>
          <div className="col ">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 className="mb-0 h2">Select stall from {eatery.name}:</h2>
              </CardHeader>
              <CardBody>
                {/* STALL SELECTION  */}
                <Form>
                  <Form.Group>
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
                  {/* NEXT BUTTON  */}
                  <Button 
                  className="" 
                  color="warning"
                  onClick={() => {
                    stallID !== null ? navigate(`/admin/cr/${uid}/${locID}/${stallID}`) :
                    alert("Please select a Stall before proceeding")}}
                  >
                    Next
                  </Button>
                </Form>   
              </CardBody>
            </Card>
          </div> 
        </Row>
      </Container>
    </>
  )

  return cont;
}