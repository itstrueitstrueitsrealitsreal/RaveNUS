import React from 'react';
// import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import Navbar from "./Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
// import Axios from 'axios';

import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Reviews from "../pages/Reviews";
import Sync from "../pages/Sync";
import Leaderboard from "../pages/Leaderboard";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Recommendation from "../pages/Recommendation";
import Start from '../pages/Start';
import UpdateReview from '../pages/reviews/UpdateReview';
import CreateReview from '../pages/reviews/CreateReview';


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
            <Route path="/settings" element={<Settings />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/sync" element={<Sync />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/updatereview" element={<UpdateReview />} />
            <Route path="/createreview" element={<CreateReview />} />
          </Routes>
        </Router>
      </div>
  );

}

export default App;
