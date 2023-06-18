import React, {useState} from "react";
import Navbar from "../components/Navbar";
import {Button, Form} from "react-bootstrap";

function Sync() {
  console.log("Sync Page called");

  const navigateToNUSMods = () => {
    alert("Redirecting you to nusmods.com...");
      window.open('https://nusmods.com', '_blank');
  };

  const [url, setURL] = useState("");

  function handleChange(event) {
    setURL(event.target.value);
  }
  const cont = (
    <div id="syncPage">
      <h1>Timetable Sync</h1>
      <h2>Sync your timetable in 3 simple steps!</h2>
      <ol>
        <li>
          Go to the Timetable tab with your desired timetable on NUSMods using the button below.
          <br/>
          <Button 
            variant="primary"
            onClick={navigateToNUSMods}>
            NUSMods</Button>
        </li>
        <li>
          Click the Share/Sync button on the bottom right of the timetable as shown below.
          <br/>
          <img src={require("../components/img/nusmods_screenshot.png")} alt="screenshot of sync button" />
        </li>
        <li>
          Copy and paste the URL into the box below!
          <Form>
            <Form.Group 
              className="mb-3" >
              <Form.Control 
                type="url" 
                placeholder="Paste URL here:"
                name="URL" 
                value={url}
                onChange={handleChange} 
              />
            </Form.Group>
            <Button variant="primary">Sync</Button>
          </Form>
        </li>
      </ol>
    </div>
  );

  return <Navbar content={cont} />
}

export default Sync;