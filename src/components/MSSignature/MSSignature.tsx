import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { Preview } from "./Preview";
import { Settings } from "./Settings";

export const MSSignature: React.FC<{}> = ({}) => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Settings />
        </Col>
        <Col md={8}>
          <Preview />
        </Col>
      </Row>
    </Container>
  );
};
