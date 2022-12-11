import React from "react";
import "./style.css";
import { Container, Tab, Tabs } from "react-bootstrap";
import { SignatureDesign } from "./SignatureDesign";
import { EmployeeSettings } from "./EmployeeSettings";

export const MSSignature: React.FC<{}> = ({}) => {
  return (
    <Container>
      <div>
        <Tabs defaultActiveKey="design" transition={false} className="mb-3">
          <Tab eventKey="design" title="Signature Design">
            <SignatureDesign />
          </Tab>
          <Tab eventKey="details" title="Employee Data">
            <EmployeeSettings />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
