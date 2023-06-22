import React from 'react';
// import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import Navbar from "./Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
// import Axios from 'axios';

import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Profile from "../pages/profile/Profile";
import Reviews from "../pages/reviews/Reviews";
import Sync from "../pages/Sync";
import Leaderboard from "../pages/Leaderboard";
import SignUp from "../pages/start/SignUp";
import SignIn from "../pages/start/SignIn";
import Recommendation from "../pages/Recommendation";
import Start from '../pages/start/Start';
import UpdateReview from '../pages/reviews/UpdateReview';
import CreateReview from '../pages/reviews/CreateReview';
import CREatery from '../pages/reviews/CREatery';
import CRStall from '../pages/reviews/CRStall';
import ChangePassword from '../pages/profile/ChangePassword';
import ResetPassword from '../pages/start/ResetPassword';
import CreateProfile from '../pages/profile/CreateProfile';
import UpdateProfile from '../pages/profile/UpdateProfile';


function App() {
  console.log("App called");

  // const [data, setData] = useState();

  // const getData = async() => {
  //   try {
  //     const response = await Axios.get("http://localhost:5001/getData");
  //     setData(response.data);
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   getData()
  // }, []);

  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/sync" element={<Sync />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/updatereview/:revid/:eatid/:stallid/:uid" element={<UpdateReview />} />
            <Route path="/cr/:id" element={<CREatery />} />
            <Route path="/cr/:uid/:locid" element={<CRStall />} />
            <Route path="/cr/:uid/:locid/:stallid" element={<CreateReview />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/createprofile" element={<CreateProfile />} />
            <Route path="/updateprofile/:id" element={<UpdateProfile />} />
          </Routes>
        </Router>
      </div>
  );

}

export default App;
