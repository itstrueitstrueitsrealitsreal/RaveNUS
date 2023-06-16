import React from "react";
import Navbar from "../../components/Navbar";
import UserID from "../../components/auth/UserID";

function UpdateReview(props) {
  console.log("Update Review..");

  // current userID
  const uid = UserID();

  const cont = <div></div>

  return <Navbar content={cont} />
}

export default UpdateReview;