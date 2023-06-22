import React from 'react';
import {Button, Card, Form, Col, Row} from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import { Link } from "react-router-dom";

function Review(props) {


  return (
    <Row xs={1} md={1} className="g-4">
        <Col key={props.idx}>
          <Card className="my-2">
            {/* image */}
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
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
              {/* content */}
              <Card.Text>
                {"Content: " + props.content}
              </Card.Text>
              {/* rating */}
              <Form.Label>Rating:</Form.Label> <br/>
              <Rating name="read-only" value={props.rating} max={5} readOnly />

              {/* date */}
              <Card.Subtitle className="mb-2 text-muted text-black-50">
                {props.time}
              </Card.Subtitle>
              {/* update the review  */}
              <Button className="btn btn-light">
                <Link to={props.updateRev}>Edit</Link>
              </Button>
              {/* delete the review  */}
              <Button onClick={() => props.deleteRev(props.id, props.content, props.rating)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
    </Row>
  );
}

export default Review;