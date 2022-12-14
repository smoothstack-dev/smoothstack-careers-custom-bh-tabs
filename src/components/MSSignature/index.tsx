import React, { useEffect } from "react";
import "./style.css";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { SignatureDesign } from "./SignatureDesign";
import { EmployeeSettings } from "./EmployeeSettings";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";
import { DataOverview } from "./Overview";
import useEmployees from "./store/employees";

export const MSSignature = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { setInitialSignatureStyle } = useSignatureStyle();
  const { isLoadingEmployeeList, loadEmployeeList } = useEmployees();

  useEffect(() => {
    const getSignatureData = async () => {
      setLoading(true);
      const data = await API.getSignatureConfig();
      setInitialSignatureStyle(data);
      setLoading(false);
    };

    loadEmployeeList();
    getSignatureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div>
        <Tabs defaultActiveKey="design" transition={false} className="mb-3">
          <Tab eventKey="design" title="Signature Design">
            {isLoading ? <Spinner animation={"border"} /> : <SignatureDesign />}
          </Tab>
          <Tab eventKey="details" title="Employee Data">
            {isLoadingEmployeeList ? (
              <Spinner animation={"border"} />
            ) : (
              <EmployeeSettings />
            )}
          </Tab>
          <Tab eventKey="overview" title="Data Overview">
            {isLoadingEmployeeList ? (
              <Spinner animation={"border"} />
            ) : (
              <DataOverview />
            )}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
