import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";
import { db } from "../../components/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import img from "../../assets/img/theme/profpicheader.png";
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

function Reviews(props) {
  console.log("Reviews Page called");

  // page navigation
  const navigate = useNavigate();
  const navigateToProfileReviews = () => {
    navigate('/admin/reviews/profile');
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
              <h1 className="display-2 text-white mb-0 ml-2 text-nowrap">Reviews</h1>
              <p className="text-white mt-0 mb-2 ml-2 text-nowrap">
                You can view all reviews for a stall, or write, edit or delete your reviews here!
              </p>
              <Button
                className="my-2 mx-2"
                color="warning"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  navigateToProfileReviews();
                }}
              >
                Your reviews
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h2 className="mb-0 h2">View reviews for a specific eatery:</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Form.Group>
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
                  </Row>
                  <hr className='my-3'/>
                  <Row>
                    <Form.Group>
                    <FormControl fullWidth>
                      <InputLabel>Stall</InputLabel>
                      <Select
                        value={stallID}
                        label="Stall"
                        onChange={(event) => {setStallID(event.target.value)}}
                      >
                      {stalls[eatIndex].map((s) => {
                        return <MenuItem value={s.id}>{s.name}</MenuItem>
                      })}
                      </Select>
                    </FormControl>
                    </Form.Group>
                  </Row>

                  {/* review query */}
                  <Button 
                    onClick={() => {navigate(`/admin/vr/${eatID}/${stallID}`)}}
                    color='warning'
                    href='#pablo'
                    className='mt-3'
                    >
                    Search
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </> :
    <div className="pb-8 pt-5 pt-md-8 text-center"><Spinner /></div>
  )

  return cont;
}

export default Reviews;