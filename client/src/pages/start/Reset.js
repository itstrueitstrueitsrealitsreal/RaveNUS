import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { authForFirebaseUI } from "../../components/firebase.js";

const Reset = () => {
  console.log('Reset component called');
  
  // navigation
  const navigate = useNavigate();
  const navigateToSignIn = () => {
    navigate('/signin');
  }

  const [email, setEmail] = useState('');

  // send reset email
  const resetEmail = async (e) => {
    e.preventDefault();
    try {
      await authForFirebaseUI.sendPasswordResetEmail(email);
      alert("Password reset email sent, redirecting you to login page...");
      setEmail("");
      navigateToSignIn();
    } catch (err) {
      console.log(err);
      if (email) {
        alert('Invalid email entered.');
      } else {
        alert('Please enter your email.');
      }
    }
  }
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Forgot your password?</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" onClick={resetEmail}>
                  Send password reset email
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-center">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                navigateToSignIn();
              }}
            >
              <small>Remembered your password?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Reset;
