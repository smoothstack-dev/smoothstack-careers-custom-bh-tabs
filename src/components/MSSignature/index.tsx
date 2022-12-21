import React, { useEffect } from "react";
import "./style.css";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { SignatureDesign } from "./SignatureDesign";
import { EmployeeSettings } from "./EmployeeSettings";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";

export const MSSignature: React.FC<{}> = ({}) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { setInitialSignatureStyle } = useSignatureStyle();

  useEffect(() => {
    const getSignatureData = async () => {
      setLoading(true);
      const data = await API.getSignatureConfig();
      setInitialSignatureStyle(data);
      setLoading(false);
    };
    getSignatureData();
  }, []);

  return (
    <Container>
      <div>
        <Tabs defaultActiveKey="design" transition={false} className="mb-3">
          <Tab eventKey="design" title="Signature Design">
            {isLoading ? <Spinner animation={"border"} /> : <SignatureDesign />}
          </Tab>
          <Tab eventKey="details" title="Employee Data">
            <EmployeeSettings />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
