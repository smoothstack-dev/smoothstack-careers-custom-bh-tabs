import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Preview } from "./Preview";
import useEmployees from "./store/employees";
import useSignature from "./store/signature";
import { EmployeeData, Signature } from "./store/types";
import styled from "styled-components";
import { getEmployeeList, getEmployeeSignatureData } from "../../helpers/api";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";

export const EmployeeSettings = () => {
  const { employees, setEmployees } = useEmployees();
  const { signature, setSelectedSignature } = useSignature();
  const [search, setSearch] = useState<string>("");
  const [isLoadingEmployeeList, setIsLoadingEmployeeList] =
    useState<boolean>(false);
  const [isLoadingEmployeeData, setLoadingEmployeeData] =
    useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Save Changes");
  const [error, setError] = useState<string>("");

  // Retrieve Employee List
  useEffect(() => {
    const loadEmployeeList = async () => {
      setIsLoadingEmployeeList(true);
      const data = await getEmployeeList();
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
  }, [setEmployees]);

  const ref = React.useRef<null | HTMLDivElement>(null);

  // Retrieve Existing Employee Signature Data
  const handleGetEmployeeData = async (selectedEmployee: EmployeeData) => {
    const primaryEmail = selectedEmployee.mail;
    const defaultData: Signature = {
      primaryEmail: selectedEmployee.mail,
      firstName: selectedEmployee.givenName,
      lastName: selectedEmployee.surname,
      title: selectedEmployee.jobTitle,
      phoneNumber: selectedEmployee.mobilePhone,
    };
    try {
      setError("");
      setLoadingEmployeeData(true);
      const data = await getEmployeeSignatureData(primaryEmail);
      setSelectedSignature(data ?? defaultData);
      setLoadingEmployeeData(false);
    } catch {
      setLoadingEmployeeData(false);
      setSelectedSignature(defaultData);
    }
    ref.current?.scrollIntoView({ behavior: "auto" });
  };

  // Styleing
  const employeeName = (e: EmployeeData) => `${e.givenName} ${e.surname}`;

  const SettingContainer = styled.div`
    max-height: 550px;
    overflow-y: scroll;
  `;

  return (
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <FloatingLabel
              label="Search Employee by Name or Email"
              className="fieldLabel"
            >
              <Form.Control
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </FloatingLabel>
            <SettingContainer>
              <br />
              {isLoadingEmployeeList ? (
                <Spinner animation={"border"} />
              ) : (
                <ListGroup>
                  {employees
                    .filter((e) => {
                      if (search) {
                        const name = employeeName(e);
                        return (
                          name
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase()) ||
                          e.mail.includes(search.toLocaleLowerCase())
                        );
                      }
                      return true;
                    })
                    .map((emp, index) => {
                      const isSelected = signature?.primaryEmail === emp.mail;
                      return (
                        <div ref={isSelected ? ref : undefined}>
                          <ListGroup.Item
                            id={`list-${index}`}
                            key={index}
                            active={isSelected}
                            onClick={(e) => {
                              handleGetEmployeeData(emp);
                            }}
                          >
                            <strong>{employeeName(emp)}</strong>
                            <br />
                            {emp.mail}
                          </ListGroup.Item>
                        </div>
                      );
                    })}
                </ListGroup>
              )}
            </SettingContainer>
          </Col>
          <Col md={8}>
            <DetailSection
              isLoadingEmployeeData={isLoadingEmployeeData}
              error={error}
              btnText={btnText}
              setBtnText={setBtnText}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const DetailSection: React.FC<{
  isLoadingEmployeeData: boolean;
  btnText: string;
  setBtnText: any;
  error: string;
}> = ({ isLoadingEmployeeData, error, btnText, setBtnText }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { signature: employee, updateSignature } = useSignature();
  const { signatureStyle } = useSignatureStyle();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setBtnText("Saving employee data...");
      await API.saveEmployeeSignatureData(employee);
      setIsSaving(false);
      setBtnText("Saved");
    } catch {
      setIsSaving(false);
      setBtnText("Saved");
    }
  };

  const createFieldSet = (
    field: string,
    label: string,
    value: string | undefined
  ) => {
    return (
      <FloatingLabel label={label} className="fieldLabel">
        <Form.Control
          value={value || ""}
          onChange={(e) => {
            if (field === "badgeUrls") {
              const urls = e.target.value.split(" ");
              updateSignature(field, urls);
            } else {
              updateSignature(field, e.target.value);
            }
          }}
        />
      </FloatingLabel>
    );
  };

  return (
    <>
      <div>
        <div>
          <p>
            <strong>Employee Info:</strong>
          </p>
          {isLoadingEmployeeData ? (
            <Spinner animation={"border"} />
          ) : error ? (
            <p>{error}</p>
          ) : !employee ? (
            <p>No Employee Selected. Please select an employee from the list</p>
          ) : (
            <div>
              {createFieldSet("firstName", "First Name", employee.firstName)}
              {createFieldSet(
                "middleNameInitial",
                "Middle Initial (optional)",
                employee.middleNameInitial
              )}
              {createFieldSet("lastName", "Last Name", employee.lastName)}
              {createFieldSet("title", "Title", employee.title)}
              {createFieldSet("profileUrl", "Profile URL", employee.profileUrl)}
              {createFieldSet(
                "teamsProfileUrl",
                "Teams Profile URL",
                employee.teamsProfileUrl
              )}
              {createFieldSet(
                "phoneNumber",
                "Phone Number",
                employee.phoneNumber
              )}
              {createFieldSet(
                "mailingAddress",
                "Mailing Address (optional)",
                employee.mailingAddress
              )}
              {createFieldSet(
                "calendarUrl",
                "Calendar URL (optional)",
                employee.calendarUrl
              )}
              {createFieldSet(
                "badgeUrls",
                "Badge URLs (optional). Please separate badge urls with space",
                employee.badgeUrls?.join(" ")
              )}

              <div
                style={{
                  display: "flex",
                }}
              >
                <Button
                  variant="link"
                  onClick={handleShow}
                  style={{
                    marginRight: "5px",
                  }}
                >
                  Preview
                </Button>
                <Button onClick={() => handleSave()} disabled={isSaving}>
                  {btnText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Signature Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px",
            }}
          >
            {employee && (
              <Preview data={employee} signatureStyle={signatureStyle} />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
