import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';
import Input from '../components/Input';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = (e) => {
      e.preventDefault();
      if (confirmPassword === '' || password === '' || email === ''){
        alert("All fields are mandatory.");
        setPassword('');
        setConfirmPassword('');
      } else if (confirmPassword !== password) {
        alert("Passwords do not match!");
        setPassword('');
        setConfirmPassword('');
      } else if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          }).catch((error) => {
            console.log(error);
          });
        alert('Successfully registered. Redirecting to home page.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
      <Form.Text className="mb-3" id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long and must not contain spaces, special characters, or emoji.
      </Form.Text>
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
      <div></div>
      <Form.Text muted>
        Already have an account? <a href="#!" name="Sign In" onClick={props.render}>Sign in</a>
      </Form.Text>
    </Form>
    )
}

export default SignUp;
