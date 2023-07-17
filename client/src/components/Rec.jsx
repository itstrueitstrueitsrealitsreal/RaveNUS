import React from 'react';
import Rating from '@mui/material/Rating';
import Review from './Review';
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
  Button
} from "reactstrap";

function Rec(props) {
  console.log('Rec Component called');

  // Stall
  const recStall = props.stall;
  // Reviews to show
  const revs = props.revs.slice(0, props.limit);

  return (
  <>
    <div >
      {/* Table */}
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <h1 className="mb-0 h1">Recommendation: {recStall.name}</h1>
            </CardHeader>
            <CardBody>
              <Row>
                <Col>
                  <ListGroup flush>
                      <ListGroupItem>
                        <h2>Average Rating: {recStall.rating ? (recStall.rating + '/5') : 'No reviews yet'}</h2>
                        <br />
                        {recStall.rating ? <Rating name="read-only" value={recStall.rating} max={5} readOnly /> : ''}
                        <br />
                        <h3 className="text-muted">Not to your liking?</h3>
                        <br />
                        <Button
                          color='warning'
                          href='#pablo'
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.reload();
                          }
                          } 
                        >
                          Generate another recommendation
                        </Button>
                      </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </Row>
    </div>
    <br />
    <div>
      <h1>Reviews:</h1>
    </div>
    <br />
    <div>
      {revs.map((rev, idx) => {
        const date = new Date(rev.Time.seconds * 1000);
        return (<div key={rev.id}>
          <Review 
            recPage={true}
            updateRev={`/reviews/profile`}
            id={rev.id}
            poster={rev.Poster}
            content={rev.Content}
            rating={rev.Rating}
            time={date.toString()}
            idx={idx}
            eatery={rev.Eatery}
            stall={rev.Stall}
            revpic={rev.RevPic}
            eateryID={rev.EateryID}
            stallID={rev.StallID}
            uid={rev.UserID}
            viewerUID={props.viewerUID}
          />
        </div>);
      })}
    </div>
  </>
  );
}

export default Rec;
