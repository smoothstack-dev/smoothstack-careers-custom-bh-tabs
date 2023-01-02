import React, { useEffect, useMemo, useState } from "react";
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
import { getEmployeeSignatureData } from "../../helpers/api";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";
import { cloneDeep } from "lodash";

export const EmployeeSettings = () => {
  const { employees, isLoadingEmployeeList } = useEmployees();
  const { signature, setSelectedSignature } = useSignature();
  const [search, setSearch] = useState<string>("");
  const [isLoadingEmployeeData, setLoadingEmployeeData] =
    useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Save Changes");
  const [error, setError] = useState<string>("");
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] =
    useState<string>("");

  const ref = React.useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  }, [signature, search]);

  // Retrieve Existing Employee Signature Data
  const handleGetEmployeeData = async (selectedEmployee: EmployeeData) => {
    const primaryEmail = selectedEmployee.mail;
    const defaultData: Signature = {
      isActive: false,
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
    ref.current?.scrollIntoView({
      behavior: "auto",
      block: "end",
    });
  };

  const employeeName = (e: EmployeeData) => `${e.givenName} ${e.surname}`;

  const displayList = useMemo(() => {
    return employees.filter((e) => {
      if (search) {
        const name = employeeName(e);
        return (
          name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          e.mail.includes(search.toLocaleLowerCase())
        );
      }
      return true;
    });
  }, [employees, search]);

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
              ) : displayList.length > 0 ? (
                <ListGroup>
                  {displayList.map((emp, index) => {
                    const isSelected = selectedEmployeeEmail === emp.mail;
                    return (
                      <div ref={isSelected ? ref : undefined}>
                        <ListGroup.Item
                          id={`list-${index}`}
                          key={index}
                          active={isSelected}
                          onClick={(e) => {
                            setSelectedEmployeeEmail(emp.mail);
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
              ) : (
                <p>No Employee Found</p>
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

  const BadgeUrlSplitInd = "\r\n";

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setBtnText("Saving employee data...");
      let employeeRecord = cloneDeep(employee);
      if (employeeRecord) {
        // filter badge urls
        employeeRecord.badgeUrls =
          employeeRecord.badgeUrls
            ?.filter((bd) => !!bd && bd !== null)
            .map((bd) => bd.trim()) || undefined;

        // format phone number
        employeeRecord.phoneNumber = [...employeeRecord.phoneNumber]
          .filter((pn) => !isNaN(+pn))
          .join("");
        if (employeeRecord.phoneNumber.length === 10) {
          const phoneNumber = cloneDeep(employeeRecord.phoneNumber);
          employeeRecord.phoneNumber = `(${phoneNumber[0]}${phoneNumber[1]}${phoneNumber[2]})${phoneNumber[3]}${phoneNumber[4]}${phoneNumber[5]}-${phoneNumber[6]}${phoneNumber[7]}${phoneNumber[8]}${phoneNumber[9]}`;
        }
      }
      await API.saveEmployeeSignatureData(employeeRecord);
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
    value: string | undefined,
    isTextArea: boolean = false
  ) => {
    return (
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <strong>{label}:</strong>
        </Form.Label>
        {isTextArea ? (
          <Form.Control
            as="textarea"
            rows={(value?.length || 0) / 80 + 3}
            value={value || ""}
            onChange={(e) => {
              if (field === "badgeUrls") {
                const urls = e.target.value.split(BadgeUrlSplitInd);
                updateSignature(field, urls);
              } else {
                updateSignature(field, e.target.value);
              }
            }}
          />
        ) : (
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
        )}
      </Form.Group>
    );
  };

  return (
    <>
      <div>
        <h2>
          <strong>Employee Info:</strong>
        </h2>
        <br />
        {isLoadingEmployeeData ? (
          <Spinner animation={"border"} />
        ) : error ? (
          <p>{error}</p>
        ) : !employee ? (
          <p>No Employee Selected. Please select an employee from the list</p>
        ) : (
          <div style={{ maxHeight: "550px", overflowY: "scroll" }}>
            <strong>
              <Form.Check
                type="switch"
                id="isActive"
                label="Enable Signture"
                checked={!!employee.isActive}
                onChange={(e) => {
                  if (!!employee.isActive) {
                    updateSignature("isActive", false);
                  } else {
                    updateSignature("isActive", true);
                  }
                }}
              />
            </strong>
            {createFieldSet("firstName", "First Name", employee.firstName)}
            {createFieldSet("lastName", "Last Name", employee.lastName)}
            {createFieldSet("title", "Title", employee.title)}
            {createFieldSet(
              "profileUrl",
              "Profile Image URL",
              employee.profileUrl
            )}
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
              "Badge URLs (optional). Please separate badge urls with enter",
              employee.badgeUrls
                ? employee.badgeUrls
                    .filter((bd) => !!bd && bd !== null)
                    .join(BadgeUrlSplitInd)
                : undefined,
              true
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
