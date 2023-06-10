import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Input from '../Input';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form className='AuthForm'>
      <h1>Sign In</h1>
      <Input 
        className="mb-3"
        controlId="formBasicEmail"
        text="Email address" 
        type="email" 
        placeholder="Enter email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />

      <Input 
        className="mb-3"
        controlId="formBasicPassword"
        text="Password" 
        type="password" 
        placeholder="Enter password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button className="mb-3" variant="primary" type="submit" onClick={signIn}>
        Sign In
      </Button>
      <div></div>
      <Form.Text muted>
        Not registered? <a href="#!" name="Sign Up" onClick={props.render}>Register here</a>
      </Form.Text>
    </Form>
    )
}

export default SignIn;