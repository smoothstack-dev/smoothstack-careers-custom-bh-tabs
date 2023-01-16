import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmployees from "./store/employees";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { EmployeeData, Signature } from "./store/types";
import { getEmployeeSignatureData } from "../../helpers/api";
import { CSVLink } from "react-csv";
import * as MdIcon from "react-icons/md";
import { EmployeeDataForm } from "./EmployeeDataForm";
import { TabOptions } from ".";

export const DataOverview: React.FC<{
  tab: TabOptions;
}> = ({ tab }) => {
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

  const [editEmployee, setEditEmployee] = useState<EmployeeData | undefined>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const handleClose = () => setShowEditModal(false);

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
    <>
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
                  Refresh Data
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        {isLoadingEmployeeDataList ? (
          <Spinner animation={"border"} />
        ) : displayEmployeeDataList.length > 0 ? (
          <div
            style={{
              overflowX: "scroll",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr style={{ whiteSpace: "nowrap", width: "1%" }}>
                  <th>#</th>
                  <th>Edit</th>
                  <th onClick={() => handleSoring("firstName")}>First Name</th>
                  <th onClick={() => handleSoring("lastName")}>Last Name</th>
                  <th onClick={() => handleSoring("isActive")}>Enabled</th>
                  <th onClick={() => handleSoring("title")}>Title</th>
                  <th onClick={() => handleSoring("phoneNumber")}>
                    Phone Number
                  </th>
                  <th onClick={() => handleSoring("calendarUrl")}>
                    Calendar Url
                  </th>
                  <th onClick={() => handleSoring("badgeUrls")}>
                    Badge Counts
                  </th>
                  <th onClick={() => handleSoring("profileUrl")}>
                    Profile Image Url
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayEmployeeDataList.map((empData: Signature, index) => {
                  return (
                    <tr style={{ whiteSpace: "nowrap", width: "1%" }}>
                      {[
                        index + 1,
                        "edit",
                        empData.firstName,
                        empData.lastName,
                        !!empData.isActive ? "Yes" : "No",
                        empData.title,
                        empData.phoneNumber,
                        empData.calendarUrl,
                        empData.badgeUrls?.length || 0,
                        empData.profileUrl,
                      ].map((item, subIndex) => {
                        if (subIndex === 1)
                          return (
                            <td>
                              <MdIcon.MdEdit
                                onClick={() => {
                                  setEditEmployee({
                                    mail: empData.primaryEmail,
                                    givenName: empData.firstName,
                                    surname: empData.lastName,
                                    jobTitle: empData.title,
                                    mobilePhone: empData.phoneNumber,
                                  });
                                  setShowEditModal(true);
                                }}
                              />
                            </td>
                          );
                        return <td>{item}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No Employee Data</p>
        )}
      </div>

      <Modal
        show={showEditModal}
        onHide={handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px",
            }}
          >
            {editEmployee && tab === "OVERVIEW" && (
              <EmployeeDataForm selectedEmployee={editEmployee} />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

interface CsvDownloadButtonProps {
  data: object[];
  fileName: string;
  isDisabled: boolean;
}

export function CsvDownloadButton(props: CsvDownloadButtonProps) {
  const { data, fileName, isDisabled } = props;
  const csvData = data.map((d: any) => {
    return {
      PrimaryEmail: d.primaryEmail || "",
      FirstName: d.firstName || "",
      LastName: d.lastName || "",
      Enabled: d.isActive ? "Yes" : "No",
      title: d.title || "",
      PhoneNumber: d.phoneNumber || "",
      DisplayedProfileUrl: d.profileUrl || "",
      AvatarUrl: d.avatarUrl || "",
      UploadedProfileUrl: d.uploadedProfileUrl || "",
      BadgesCount: d.badgeUrls ? d.badgeUrls.length : 0,
      DisplayMailingAddress: d.displayMailingAddress ? "Yes" : "No",
      TeamsProfileUrl: d.teamsProfileUrl || "",
      CalendarUrlLabel: d.calendarUrlLabel || "",
      CalendarUrl: d.calendarUrl || "",
    };
  });

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
        data={csvData}
        filename={`${fileName}.csv`}
        target="_blank"
        ref={csvLinkRef}
      />
    </>
  );
}
