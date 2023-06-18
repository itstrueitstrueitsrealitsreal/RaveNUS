import React, {useState} from "react";
import Navbar from "../components/Navbar";
import {Button, Form} from "react-bootstrap";
import Input from "../components/Input";

function Sync() {
  console.log("Sync Page called");

  const [url, setURL] = useState("");

  const cont = (
    <div className="syncPage">
      <h1>Timetable Sync</h1>
      <h2>Sync your timetable in 3 simple steps!</h2>
      <ol>
        <li>
          Go to the Timetable tab with your desired timetable on NUSMods using the button below.
          <div></div>
          <Button variant="primary">NUSMods</Button>{' '}
        </li>
        <li>
          Click the Share/Sync button on the bottom right of the timetable as shown below.
          <img src={require("../components/img/nusmods_screenshot.png")} />
        </li>
        <li>
          Copy and paste the URL into the box below!
          <Form className='AuthForm'>
            <Input 
              className="mb-3"
              controlId="formBasicURL"
              type="url" 
              placeholder="Enter URL" 
              value={url} 
              onChange={(e) => setURL(e.target.value)} 
            />
            <Button variant="primary">Sync</Button>{' '}
          </Form>
        </li>
      </ol>
    </div>
  );

  return <Navbar content={cont} />
}

export default Sync;