import React from 'react';
import img from "../img/profpicheader.png";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

function Statistics() {
  console.log('Statistics Page called');

  const cont = <>
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
              <h1 className="display-2 text-white mb-0 ml-2">Statistics</h1>
              <p className="text-white mt-0 mb-2 ml-2">
              </p>
            </Col>
          </Row>
        </Container>
      </div>
  </>;

  return cont;
}

export default Statistics;
