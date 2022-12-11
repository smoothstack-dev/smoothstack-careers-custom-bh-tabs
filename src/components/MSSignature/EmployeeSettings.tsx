import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Preview } from "./Preview";
import useEmployees from "./store/employees";
import useSignature from "./store/signature";
import { Employee } from "./store/types";
import styled from "styled-components";

export const EmployeeSettings: React.FC<{}> = ({}) => {
  const { employees } = useEmployees();
  const { signature, setSelectedSignature } = useSignature();
  const [search, setSearch] = useState<string>("");
  const employeeName = (e: Employee) => `${e.firstName} ${
    e.middleNameInitial ? e.middleNameInitial + ". " : ""
  }
  ${e.lastName}`;

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
              label="Search Employee by Name"
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
              <ListGroup>
                {employees
                  .filter((e) => {
                    if (search) {
                      const name = employeeName(e);
                      return name
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase());
                    }
                    return true;
                  })
                  .map((e) => {
                    const isSelected = signature.employeeId === e.employeeId;
                    return (
                      <ListGroup.Item
                        active={isSelected}
                        onClick={() => setSelectedSignature(e)}
                      >
                        {employeeName(e)}
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
            </SettingContainer>
          </Col>
          <Col md={8}>
            <DetailSection />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const DetailSection: React.FC<{}> = ({}) => {
  const { signature: employee, updateSignature } = useSignature();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

          {createFieldSet("firstName", "First Name", employee.firstName)}
          {createFieldSet(
            "middleNameInitial",
            "Middle Initial (optional)",
            employee.middleNameInitial
          )}
          {createFieldSet("lastName", "Last Name", employee.lastName)}
          {createFieldSet("title", "Title", employee.title)}
          {createFieldSet("profileUrl", "Profile URL", employee.profileUrl)}
          {createFieldSet("phoneNumber", "Phone Number", employee.phoneNumber)}
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
        </div>
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
          <Button>Save Changes</Button>
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
            <Preview data={employee} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
