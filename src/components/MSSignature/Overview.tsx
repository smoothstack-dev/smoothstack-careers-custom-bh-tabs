import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmployees from "./store/employees";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { EmployeeData, Signature } from "./store/types";
import { getEmployeeSignatureData } from "../../helpers/api";
import { CSVLink } from "react-csv";

export const DataOverview = () => {
  const [employeeDataList, setEmployeeDataList] = useState<Signature[]>([]);
  const [displayEmployeeDataList, setDisplayEmployeeDataList] = useState<
    Signature[]
  >([]);
  const [isLoadingEmployeeDataList, setLoadingEmployeeDataList] =
    useState<boolean>(false);
  const { employees } = useEmployees();
  const [sortingField, setSortingField] = useState<string | undefined>();
  const [search, setSearch] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const loadEmployeeDataList = useCallback(async () => {
    setLoadingEmployeeDataList(true);
    setSortingField(undefined);
    setSearch("");
    const data = await Promise.all(
      employees
        .filter((emp: EmployeeData) => emp.mail)
        .map(async (emp: EmployeeData) => {
          const empData = await getEmployeeSignatureData(emp.mail);
          if (empData) return empData;
          else
            return {
              isActive: false,
              primaryEmail: emp.mail,
              firstName: emp.givenName,
              lastName: emp.surname,
              title: emp.jobTitle,
              phoneNumber: emp.mobilePhone,
            };
        })
    );
    setEmployeeDataList(data);
    setDisplayEmployeeDataList(data);
    setLoadingEmployeeDataList(false);
  }, [employees]);

  // sorting and search
  useEffect(() => {
    const updatedList = [...employeeDataList]
      .filter((ul) => {
        if (search) {
          const name = ul.firstName + " " + ul.lastName;
          return name.includes(search) || ul.primaryEmail.includes(search);
        }
        return true;
      })
      .sort((x, y) => {
        let compare = 1;
        // undefined check
        if (sortingField && !(sortingField in x))
          return isAscending ? -compare : compare;
        if (sortingField && !(sortingField in y))
          return isAscending ? compare : -compare;

        if (sortingField && sortingField in x && sortingField in y) {
          // string check
          if (
            typeof (x as any)[sortingField] === "string" &&
            typeof (y as any)[sortingField] === "string"
          )
            compare =
              (x as any)[sortingField].toUpperCase() >
              (y as any)[sortingField].toUpperCase()
                ? 1
                : -1;
          else
            compare =
              (x as any)[sortingField] > (y as any)[sortingField] ? 1 : -1;
          return isAscending ? compare : -compare;
        }
        return 1;
      });
    setDisplayEmployeeDataList(updatedList);
  }, [sortingField, search, isAscending, employeeDataList]);

  useEffect(() => {
    if (employees && employees.length > 0) {
      loadEmployeeDataList();
    }
  }, [employees, loadEmployeeDataList]);

  const handleSoring = (field: string) => {
    if (sortingField === field) setIsAscending(!isAscending);
    else setIsAscending(true);
    setSortingField(field);
  };

  return (
    <div>
      <Container
        style={{
          marginBottom: 10,
        }}
      >
        <Row>
          <Col
            md={4}
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <Form.Control
              value={search}
              onChange={(e) => {
                setSearch(e.target.value || "");
              }}
              placeholder="Search Employee by Name or Email"
            />
            <Button
              variant="link"
              onClick={() => {
                setSearch("");
                setSortingField(undefined);
                setIsAscending(true);
              }}
            >
              clear
            </Button>
          </Col>
          <Col md={5}></Col>
          <Col
            md={3}
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <div>
              <CsvDownloadButton
                data={displayEmployeeDataList}
                fileName="employee_data.cvs"
                isDisabled={
                  isLoadingEmployeeDataList ||
                  displayEmployeeDataList.length <= 0
                }
              />
              <Button
                onClick={() => loadEmployeeDataList()}
                disabled={isLoadingEmployeeDataList}
                style={{
                  marginRight: "5px",
                }}
              >
                Reload Data
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {isLoadingEmployeeDataList ? (
        <Spinner animation={"border"} />
      ) : displayEmployeeDataList.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => handleSoring("firstName")}>First Name</th>
              <th onClick={() => handleSoring("lastName")}>Last Name</th>
              <th onClick={() => handleSoring("isActive")}>Active</th>
              <th onClick={() => handleSoring("title")}>Title</th>
              <th onClick={() => handleSoring("phoneNumber")}>Phone Number</th>
              <th onClick={() => handleSoring("profileUrl")}>
                Profile Image Url
              </th>
              <th onClick={() => handleSoring("mailingAddress")}>
                Mailing Address
              </th>
              <th onClick={() => handleSoring("calendarUrl")}>Calendar Url</th>
              <th onClick={() => handleSoring("badgeUrls")}>Badge Counts</th>
            </tr>
          </thead>
          <tbody>
            {displayEmployeeDataList.map((empData: Signature, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{empData.firstName}</td>
                  <td>{empData.lastName}</td>
                  <td>{!!empData.isActive ? "Y" : "N"}</td>
                  <td>{empData.title}</td>
                  <td>{empData.phoneNumber}</td>
                  <td>{empData.profileUrl}</td>
                  <td>{empData.mailingAddress}</td>
                  <td>{empData.calendarUrl}</td>
                  <td>{empData.badgeUrls?.length}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No Employee Data</p>
      )}
    </div>
  );
};

interface CsvDownloadButtonProps {
  data: object[];
  fileName: string;
  isDisabled: boolean;
}

export function CsvDownloadButton(props: CsvDownloadButtonProps) {
  const { data, fileName, isDisabled } = props;
  const csvLinkRef = useRef<any>(null);
  return (
    <>
      <Button
        variant="link"
        onClick={() => csvLinkRef.current?.link.click()}
        disabled={isDisabled}
      >
        Download CSV
      </Button>
      <CSVLink
        data={data}
        filename={`${fileName}.csv`}
        target="_blank"
        ref={csvLinkRef}
      />
    </>
  );
}
