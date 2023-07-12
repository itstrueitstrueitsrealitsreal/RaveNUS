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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../components/firebase.js';


const Register = () => {
  console.log('Register component called');

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigateToSignIn = () => {
    navigate(`/auth/login`);
  }

  //signup logic
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
          return true;
          }).catch((error) => {
            console.log(error);
            alert(error);
            return false;
          }).then((check) => {
            if (check) {
              alert('Successfully registered. Redirecting to login page...');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              navigateToSignIn();
            } else {
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }
          });
        
      }
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with:</small>
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

              <FormGroup>
                <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" onClick={signUp}>
                  Create account
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
                navigate(`/auth/login`)

              }}
            >
              <small>Already have an account?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
