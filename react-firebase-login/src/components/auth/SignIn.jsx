import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignIn = () => {
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button className="mb-3" variant="primary" type="submit" onClick={signIn}>
        Sign In
      </Button>
    </Form>
    )
}

export default SignIn;