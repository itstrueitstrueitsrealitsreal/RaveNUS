import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from './firebase';
import {
  Card,
  CardHeader,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  CardText,
  CardImg
} from "reactstrap";

function Review(props) {
  // page navigation
  const navigate = useNavigate();

  // retrieve review pic url
  const [picURL, setPicURL] = useState(null);
  const getURL = async () => {
    const urlRef = ref(storage, props.revpic);
    const url = await getDownloadURL(urlRef);
    setPicURL(url.toString());
  };
  if (props.revpic && props.revpic !== '') {
    console.log(props.revpic);
    console.log('getting url')
    getURL();
    console.log(picURL);
  }

  return (
  <>
    <Row xs={1} md={1} className="my-4">
      <Col key={props.idx}>
        <Card className="shadow">
          <CardBody>
            {/* poster */}
            <CardHeader className="my-0 h1 bg-transparent">
              <h1>{`Poster: ${props.poster}`}</h1>
            </CardHeader>
            {/* eatery */}
            <CardText className="my-2">
              <h2>{`Eatery: ${props.eatery}`}</h2>
            </CardText>
            {/* stall */}
            <CardText className="my-2">
              <h2>{`Stall: ${props.stall}`}</h2>
            </CardText>
            {/* rating */}
            <Rating 
              className="my-2"
              name="read-only" 
              value={props.rating} 
              max={5} 
              readOnly />
            <br />
            {/* image */}
            <CardImg className="my-2" variant="top" src={picURL} />
            {/* content */}
            <CardText className="my-2 text-black-50">
              <p>{`${props.content}`}</p>
            </CardText>
            {/* date */}
            <CardSubtitle className="my-2 text-muted text-black-50">
              <p>{props.time}</p>
            </CardSubtitle>
            {/* user can only update or delete the review if user created it */}
            { props.viewerUID === props.uid ? (props.recPage === true
              ? (
                <Button onClick={() => {
                  const confirmed = window.confirm('Update this Review?\nYou will be redirected to your Reviews Page');
                  if (confirmed) {
                    navigate(props.updateRev)
                  }}}>Edit/Update
                </Button> ):
                <div>
                {/* update the review  */}
                <Button color="info" onClick={() => {navigate(props.updateRev)}}>Edit</Button>
                {/* delete the review  */}
                <Button color="light" onClick={() => props.deleteRev(props.id, props.content, 
                    props.rating, props.uid, props.eateryID, props.stallID, props.eatery, props.stall, props.revpic)}>
                  Delete
                </Button></div>) :
                <></>
              } 
            </CardBody>
          </Card>
        </Col>
    </Row>
  </>
  );
}

export default Review;
