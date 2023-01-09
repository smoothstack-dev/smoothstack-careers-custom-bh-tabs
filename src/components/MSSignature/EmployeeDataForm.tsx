import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Preview } from "./Preview";
import useSignature from "./store/signature";
import { EmployeeData, Signature } from "./store/types";
import { getEmployeeSignatureData } from "../../helpers/api";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";
import { cloneDeep } from "lodash";
import * as Helpers from "./helpers";

export const EmployeeDataForm: React.FC<{
  selectedEmployee: EmployeeData | undefined;
}> = ({ selectedEmployee }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const {
    signature: employee,
    setSelectedSignature,
    updateSignature,
  } = useSignature();
  const { signatureStyle } = useSignatureStyle();
  const [isLoadingEmployeeData, setLoadingEmployeeData] =
    useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>("Save Changes");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (selectedEmployee?.mail) handleGetEmployeeData();
  }, [selectedEmployee]);

  // Retrieve Existing Employee Signature Data
  const handleGetEmployeeData = async () => {
    if (!selectedEmployee) return;
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
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setBtnText("Saving employee data...");
      let employeeRecord = cloneDeep(employee);
      if (employeeRecord) {
        // filter badge urls
        employeeRecord.badgeUrls =
          employeeRecord.badgeUrls
            ?.filter((bd) => !!bd && bd !== null && bd !== "")
            .map((bd) => bd.trim()) || undefined;

        // format phone number
        employeeRecord.phoneNumber = Helpers.formatePhoneNumber(
          employeeRecord.phoneNumber
        );
      }
      await API.saveEmployeeSignatureData(employeeRecord);
      setIsSaving(false);
      setBtnText("Saved");
    } catch {
      setIsSaving(false);
      setBtnText("Smething went wrong, please click to save it again");
    }
  };

  const createFieldSet = (
    field: string,
    label: string,
    value: string | boolean | undefined,
    inputType?: "textArea" | "switch"
  ) => {
    return (
      <Form.Group className="mb-3" controlId={field}>
        {(() => {
          switch (inputType) {
            case "switch":
              return (
                <strong>
                  <Form.Check
                    type="switch"
                    id={field}
                    label={label}
                    checked={!!value}
                    onChange={(e) => {
                      setBtnText("Save Changes");
                      if (!!value) {
                        updateSignature(field, false);
                      } else {
                        updateSignature(field, true);
                      }
                    }}
                  />
                </strong>
              );
            default:
              return (
                <>
                  {" "}
                  <Form.Label>
                    <strong>{label}:</strong>
                  </Form.Label>
                  <Form.Control
                    value={value?.toString() || ""}
                    onChange={(e) => {
                      setBtnText("Save Changes");
                      updateSignature(field, e.target.value);
                    }}
                  />
                </>
              );
          }
        })()}
      </Form.Group>
    );
  };

  const createBadgeSet = () => {
    return (
      <Form.Group className="mb-3" controlId="badgeUrls">
        <Form.Label>
          <strong>
            Badge URLs (optional). Please separate badge urls with enter
          </strong>
        </Form.Label>
        {employee?.badgeUrls?.map((badge, index) => {
          return (
            <p style={{ display: "flex" }}>
              <Form.Control
                value={badge.toString() || ""}
                onChange={(e) => {
                  setBtnText("Save Changes");
                  const badgeInput = e.target.value;
                  let updatedBadgeUrls = cloneDeep(employee.badgeUrls || []);
                  if (index < updatedBadgeUrls.length)
                    updatedBadgeUrls[index] = badgeInput;
                  updateSignature("badgeUrls", updatedBadgeUrls);
                }}
              />
              <Button
                variant="link"
                onClick={() => {
                  setBtnText("Save Changes");
                  let updatedBadgeUrls = cloneDeep(employee?.badgeUrls || []);
                  if (index > -1 && index < updatedBadgeUrls.length)
                    updatedBadgeUrls.splice(index, 1);
                  updateSignature("badgeUrls", [...updatedBadgeUrls]);
                }}
              >
                Remove
              </Button>
            </p>
          );
        })}
        <p>
          <Button
            variant="light"
            onClick={() => {
              setBtnText("Save Changes");
              let updatedBadgeUrls = cloneDeep(employee?.badgeUrls || []);
              updateSignature("badgeUrls", [...updatedBadgeUrls, ""]);
            }}
          >
            Add new badge entry
          </Button>
        </p>
      </Form.Group>
    );
  };

  const title =
    selectedEmployee && employee
      ? `${employee.firstName} ${employee.lastName} Info:`
      : "Employee Info";

  return (
    <>
      <div>
        {isLoadingEmployeeData ? (
          <Spinner animation={"border"} />
        ) : error ? (
          <p>{error}</p>
        ) : !selectedEmployee || !employee ? (
          <p>No Employee Selected. Please select an employee from the list</p>
        ) : (
          <>
            <h3>
              <strong>{title}</strong>
            </h3>

            <Container>
              <Row>
                <Col md={4}>
                  {employee && (
                    <div>
                      <strong>Signature Preview</strong>
                      <Preview
                        data={employee}
                        signatureStyle={signatureStyle}
                      />
                    </div>
                  )}
                  <p>
                    <strong>Avatar Preview</strong>
                    {employee.profileUrl && (
                      <>
                        <img
                          src={employee.profileUrl}
                          alt={"invalid image url"}
                          height={"100px"}
                          width="auto"
                          style={{
                            display: "block",
                          }}
                        />
                        <br />
                      </>
                    )}
                    <Form.Control
                      placeholder="Enter your Avatar url here"
                      value={employee.profileUrl || ""}
                      onChange={(e) => {
                        setBtnText("Save Changes");
                        updateSignature("profileUrl", e.target.value);
                      }}
                    />
                  </p>
                  <p>
                    <strong>Profile Picture</strong>
                  </p>
                </Col>
                <Col md={8}>
                  <div style={{ maxHeight: "480px", overflowY: "scroll" }}>
                    {" "}
                    <div>
                      {[
                        {
                          field: "isActive",
                          label: "Enable Signature",
                          fieldData: employee.isActive,
                          inputType: "switch",
                        },
                        {
                          field: "firstName",
                          label: "First Name",
                          fieldData: employee.firstName,
                        },
                        {
                          field: "lastName",
                          label: "Last Name",
                          fieldData: employee.lastName,
                        },
                        {
                          field: "title",
                          label: "Title",
                          fieldData: employee.title,
                        },
                        {
                          field: "profileUrl",
                          label: "Profile Image URL",
                          fieldData: employee.profileUrl,
                        },
                        {
                          field: "teamsProfileUrl",
                          label: "Teams Profile URL",
                          fieldData: employee.teamsProfileUrl,
                        },
                        {
                          field: "phoneNumber",
                          label: "Phone Number (Enter numbers only)",
                          fieldData: Helpers.filterWithNumberOnly(
                            employee.phoneNumber
                          ),
                        },
                        {
                          field: "displayMailingAddress",
                          label: "Display company address?",
                          fieldData: employee.displayMailingAddress,
                          inputType: "switch",
                        },
                        {
                          field: "calendarUrlLabel",
                          label: "Calendar URL Label (optional)",
                          fieldData: employee.calendarUrlLabel,
                        },
                        {
                          field: "calendarUrl",
                          label: "Calendar URL (optional)",
                          fieldData: employee.calendarUrl,
                        },
                      ].map((item) => {
                        return createFieldSet(
                          item.field,
                          item.label,
                          item.fieldData,
                          item.inputType as any
                        );
                      })}
                    </div>
                    <div>{createBadgeSet()}</div>
                  </div>
                </Col>
              </Row>
            </Container>
            {/* Button Section */}
            <div
              style={{
                float: "right",
                display: "flex",
              }}
            >
              <Button onClick={() => handleSave()} disabled={isSaving}>
                {btnText}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
