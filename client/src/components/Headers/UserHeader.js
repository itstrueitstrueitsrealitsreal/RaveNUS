import React, { useState, useEffect } from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import img from "../../assets/img/theme/profpicheader.png";

const UserHeader = (props) => {
  const greeting = props.name ? `Hello ${props.name}!` : `Hello!`;
  return (
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
              <h1 className="display-2 text-white mb-0 ml-2">{greeting}</h1>
              <p className="text-white mt-0 mb-2 ml-2">
                This is your profile page. You can sign out, edit your profile or change your password here.
              </p>
              <Button
                className="my-2 mx-2"
                color="info"
                href="#pablo"
                onClick={(e) =>{ 
                  e.preventDefault();
                  props.navigateToChangePassword();
                }}
              >
                Change password
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
