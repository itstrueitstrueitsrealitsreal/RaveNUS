import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Input from '../Input';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = (e) => {
      e.preventDefault();
      if (confirmPassword === '' || password === '' || email === ''){
        alert("All fields are mandatory.");
      } else if (confirmPassword !== password) {
        alert("Passwords do not match!");
      } else if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          }).catch((error) => {
            console.log(error);
          });
      }
  };

  return (
    <Form className='AuthForm'>
      <h1>Create an account</h1>
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
      <Input 
        className="mb-3"
        controlId="formBasicPassword"
        text="Confirm password" 
        type="password" 
        placeholder="Confirm password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
      />
      <Button className="mb-3" variant="primary" type="submit" onClick={signUp}>
        Create Account
      </Button>
    </Form>
    )
}

export default SignUp;