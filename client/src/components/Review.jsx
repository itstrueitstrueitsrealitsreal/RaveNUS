import React, { useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';

function Review(props) {

  // page navigation
  const navigate = useNavigate();

  // retrieve review pic url
  const [picURL, setPicURL] = useState(null);
  const getURL = async () => {
    const urlRef = ref(storage, props.revpic);
    const url = await getDownloadURL(urlRef);
    setPicURL(url.toString());
  }
  if (props.revpic !== null && props.revpic !== "") {
    getURL();
  }

  return (
    <Row xs={1} md={1} className="g-4">
        <Col key={props.idx}>
          <Card className="my-2">
            <Card.Body>
              {/* poster */}
              <Card.Title>{"Poster: " + props.poster}</Card.Title>
              {/* eatery */}
              <Card.Text>
                {"Eatery: " + props.eatery}
              </Card.Text>
              {/* stall */}
              <Card.Text>
                {"Stall: " + props.stall}
              </Card.Text>
              {/* rating */}
              <Rating name="read-only" value={props.rating} max={5} readOnly />
              <br />
              {/* image */}
              <Card.Img variant="top" src={picURL} />
              {/* content */}
              <Card.Text>
                {"Content: " + props.content}
              </Card.Text>
              {/* date */}
              <Card.Subtitle className="mb-2 text-muted text-black-50">
                {props.time}
              </Card.Subtitle>
              {/* user can only update or delete the review if user created it */}
              { props.viewerUID === props.uid ? (props.recPage === true ?
                <Button onClick={() => {
                  const confirmed = window.confirm("Update this Review?\nYou will be redirected to your Reviews Page");
                  if (confirmed) {
                    navigate(props.updateRev)
                  }}}>Edit/Update
                </Button> :
                <div>
                {/* update the review  */}
                <Button className="btn btn-light" onClick={() => {navigate(props.updateRev)}}>Edit</Button>
                {/* delete the review  */}
                <Button onClick={() => props.deleteRev(props.id, props.content, 
                    props.rating, props.uid, props.eateryID, props.stallID, props.eatery, props.stall, props.revpic)}>
                  Delete
                </Button></div>) :
                <></>
              } 
            </Card.Body>
          </Card>
        </Col>
    </Row>
  );
}

export default Review;