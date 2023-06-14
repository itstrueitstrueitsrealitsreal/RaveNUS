import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./Navbar";
import {BrowserRouter as Router} from 'react-router-dom';
import Axios from 'axios';

function App() {
  const [data, setData] = useState();

  const getData = async() => {
    try {
      const response = await Axios.get("http://localhost:5001/getData");
      setData(response.data);
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, []);
  return (
      <div className="App">
        <Router>
          <Navbar />
          <div>{data}</div>
        </Router>
      </div>
  );

}

export default App;
