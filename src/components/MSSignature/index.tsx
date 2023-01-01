import React, { useEffect, useState } from "react";
import "./style.css";
import { Container, Spinner, Tab, Tabs } from "react-bootstrap";
import { SignatureDesign } from "./SignatureDesign";
import { EmployeeSettings } from "./EmployeeSettings";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";
import { DataOverview } from "./Overview";
import useEmployees from "./store/employees";
import { EmployeeData } from "./store/types";

export const MSSignature = () => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const { setInitialSignatureStyle } = useSignatureStyle();
  const { employees, setEmployees } = useEmployees();
  const [isLoadingEmployeeList, setIsLoadingEmployeeList] =
    useState<boolean>(false);

  useEffect(() => {
    const getSignatureData = async () => {
      setLoading(true);
      const data = await API.getSignatureConfig();
      setInitialSignatureStyle(data);
      setLoading(false);
    };
    const loadEmployeeList = async () => {
      setIsLoadingEmployeeList(true);
      const data = await API.getEmployeeList();
      const constructedData: EmployeeData[] = data
        .filter((d: any) => d.mail)
        .map((d: any) => {
          return {
            mail: (d.mail ?? "").toLowerCase(),
            givenName: d.givenName ?? "",
            surname: d.surname ?? "",
            jobTitle: d.jobTitle ?? "",
            mobilePhone: d.mobilePhone ?? "",
          } as EmployeeData;
        });
      setEmployees(() => {
        return constructedData;
      });
      setIsLoadingEmployeeList(false);
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
            <EmployeeSettings />
          </Tab>
          <Tab eventKey="overview" title="Data Overview">
            <DataOverview />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
