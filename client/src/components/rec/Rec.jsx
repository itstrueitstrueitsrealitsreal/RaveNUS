import React from 'react';
import Rating from '@mui/material/Rating';
import Review from '../Review';

function Rec(props) {
  console.log('Rec Component called');

  // Stall
  const recStall = props.stall;
  // Reviews to show
  const revs = props.revs.slice(0, props.limit);

  return (
    <div>
      <h1>
        Recommendation:
        {recStall.name}
      </h1>
      <h2>
        Average Rating:
        {recStall.rating}
        /5
      </h2>
      {/* rating */}
      <Rating name="read-only" value={recStall.rating} max={5} readOnly />

      <br />
      <br />
      <h2>Not to your liking?</h2>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button onClick={props.recPage} type="button" className="btn btn-primary btn-lg px-4 gap-3">Generate ANOTHER Recommendation</button>
      </div>
      <br />
      <br />

      <h2>Stall Reviews</h2>
      {revs.map((rev, idx) => {
        const date = new Date(rev.Time.seconds * 1000);
        return (
          <div key={rev.id}>
            <Review
              recPage
              updateRev="/reviews"
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
          </div>
        );
      })}

      <br />
      <br />

    </div>
  );
}

export default Rec;
