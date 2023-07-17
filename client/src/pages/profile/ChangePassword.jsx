import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../components/firebase';
import img from "../../components/img/profpicheader.png";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "../../components/Headers/UserHeader.js";

function ChangePassword() {
  console.log('Change password page');

  // page navigation
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate('/profile');
  };

  // inputs
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // change password
  const handleChangePassword = async () => {
    console.log('password change attempted');
    if (newPassword === '' || confirmPassword === '' || currentPassword === '') {
      alert('All fields are mandatory.');
    } else if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
    } else {
      const confirmed = window.confirm('Are you sure you want to change your password?');
      if (confirmed) {
        try {
          // reauthenticate
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword,
          );
          await reauthenticateWithCredential(auth.currentUser, credential);

          // update password
          await updatePassword(auth.currentUser, newPassword);
          alert('Password changed successfully.');
        } catch (err) {
          alert(err);
        }
      }
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // // Page content
  // const cont = (
  //   <div>
  //     <h1>Change Password</h1>
  //     <br />

  //     <div>
  //       <Input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
  //       <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
  //       <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
  //       <br />
  //       <Button onClick={handleChangePassword}>Change Password</Button>
  //     </div>

  //     <br />
  //     <Button onClick={navigateToProfile}>Back</Button>
  //   </div>
  // );
  const cont = (
    <>
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + img + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white mb-0 ml-2">Change password</h1>
                <p className="text-white mt-0 mb-2 ml-2">
                  You can change your password here. Make sure to use a strong password you can remember and not to share it with others!
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChangePassword();
                        navigate(-1);
                      }}
                      size="sm"
                    >
                      Update password
                    </Button>
                    <Button
                      color="default"
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                      }}
                      size="sm"
                    >
                      Back
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="password"
                          >
                            Old password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="old-password"
                            placeholder="Old password"
                            type="password"
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="new-password"
                          >
                            New password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="new-password"
                            placeholder="New password"
                            type="password"
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="confirm-new-password"
                          >
                            Confirm password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="confirm-new-password"
                            placeholder="Confirm password"
                            type="password"
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )

  return cont;
}

export default ChangePassword;
