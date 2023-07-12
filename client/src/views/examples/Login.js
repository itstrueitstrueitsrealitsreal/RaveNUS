import React, { useState } from 'react';
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
import { auth } from '../../components/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  console.log('Login component called');

  // navigation
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/admin/index');
  }
  const navigateToSignUp = () => {
    navigate(`/auth/register`);
  }
  const navigateToResetPassword = () => {
    navigate(`/auth/reset`);
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
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with your credentials:</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
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
              <FormGroup>
                <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={signIn}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                navigateToResetPassword();
              }}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                navigateToSignUp();
              }}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
