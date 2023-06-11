import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import {BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
      <div className="App">
        <Router>
          <Navbar />
        </Router>
      </div>
  );

}

export default App;
