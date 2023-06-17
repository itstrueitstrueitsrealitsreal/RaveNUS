import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';

const SignIn = (props) => {
  console.log("SignIn Component called");

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home');
  }
  const navigateToSignUp = () => {
    navigate('/signup');
  }
  const navigateToResetPassword = () => {
    navigate('/resetpassword');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      navigateToHome();
      }).catch((error) => {
        console.log(error);
        alert("Unable to sign in. Please try again.");
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
        Not registered? <a href="#!" name="Sign Up" onClick={navigateToSignUp}>Register here</a>
      </Form.Text>
      <br />
      <Form.Text muted>
        Forgotten password? <a href="#!" name="Sign Up" onClick={navigateToResetPassword}>Reset password</a>
      </Form.Text>
    </Form>
    )
}

export default SignIn;