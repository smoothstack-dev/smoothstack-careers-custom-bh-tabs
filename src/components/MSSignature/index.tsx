import React, { useEffect } from "react";
import "./style.css";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { SignatureDesign } from "./SignatureDesign";
import { EmployeeSettings } from "./EmployeeSettings";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";
import { DataOverview } from "./Overview";
import useEmployees from "./store/employees";

export type TabOptions = "DESIGN" | "EMPLOYEE" | "OVERVIEW";

export const MSSignature = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { setInitialSignatureStyle } = useSignatureStyle();
  const { isLoadingEmployeeList, loadEmployeeList } = useEmployees();
  const [tab, setTab] = React.useState<TabOptions>("DESIGN");

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
        <Tabs
          defaultActiveKey="DESIGN"
          transition={false}
          onSelect={(t: any) => setTab(t)}
          className="mb-3"
        >
          <Tab eventKey="DESIGN" title="Signature Design">
            {isLoading ? <Spinner animation={"border"} /> : <SignatureDesign />}
          </Tab>
          <Tab eventKey="EMPLOYEE" title="Employee Data">
            {isLoadingEmployeeList ? (
              <Spinner animation={"border"} />
            ) : (
              <EmployeeSettings tab={tab} />
            )}
          </Tab>
          <Tab eventKey="OVERVIEW" title="Data Overview">
            {isLoadingEmployeeList ? (
              <Spinner animation={"border"} />
            ) : (
              <DataOverview tab={tab} />
            )}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
