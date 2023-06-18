import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { authForFirebaseUI } from "../../components/firebase";
import Input from "../../components/Input";

function ResetPassword() {
  console.log("Reset Password page");

  // page navigation
  const navigate = useNavigate();
  const navigateToSignIn = () => {
    navigate('/signin');
  }

  const [email, setEmail] = useState('');

  // send reset email
  const resetEmail = async () => {
    try {
      await authForFirebaseUI.sendPasswordResetEmail(email);
      alert("Password reset email sent");
      setEmail("");
      navigateToSignIn();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  // Page content
  return (
    <Form className='AuthForm'>
      <h1>Reset Password</h1>
      <div>
        <Input        
          className="mb-3"
          controlId="formBasicEmail"
          text="Email address" 
          type="email" 
          placeholder="Enter email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} />
        <br />
        <Button onClick={resetEmail}>Send Reset Password Email</Button>
      </div>

      <Form.Text muted>
        <a href="#!" name="Sign Up" onClick={navigateToSignIn}>Sign In</a>
      </Form.Text>
    </Form>
  )
}

export default ResetPassword;