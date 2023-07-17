import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Form } from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import img from "../../components/img/profpicheader.png";
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
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + img + ")",
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
              <p className="text-white mt-0 mb-2 ml-2">
                Start by selecting an eatery below.
              </p>
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
      <Container className="mt--7" fluid>
        <Row>
          <div className="col ">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 className="mb-0 h2">Select eatery:</h2>
              </CardHeader>
              <CardBody>
                {/* EATERY SELECTION  */}
                <Form>
                  <Row>
                    <Form.Group>
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
                  </Row>
                  {/* NEXT BUTTON  */}
                  <Button 
                    className="mt-4"
                    color='warning'
                    onClick={() => {
                    locID !== null ? navigate(`/admin/cr/${uid}/${locID}`) : 
                    alert("Please select an eatery before proceeding.")}}>Next</Button>
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