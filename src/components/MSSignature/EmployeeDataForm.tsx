import React, { ChangeEvent, useEffect, useCallback, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import { Preview } from "./Preview";
import useSignature from "./store/signature";
import { Badge, EmployeeData, Signature } from "./store/types";
import { getEmployeeSignatureData } from "../../helpers/api";
import useSignatureStyle from "./store/signatureStyle";
import * as API from "./../../helpers/api";
import { cloneDeep } from "lodash";
import * as Helpers from "./helpers";
import { PROFILE_IMAGE_S3_URL } from "./store/literal";

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
  const [imageError, setImageError] = useState<string>("");
  const [imageSelection, setImageSelection] = useState<
    "No Image" | "Custom Avatar" | "Uploaded Profile" | "Minted Avatar"
  >("No Image");
  const [msImageSelection, setMsImageSelection] = useState<
    "No Image" | "Custom Avatar" | "Uploaded Profile" | "Minted Avatar"
  >("No Image");
  const [uploadedImage, setUploadedImage] = useState<any>();
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>();
  const [mintedAvatarUrl, setMintedAvatarUrl] = useState<string | undefined>();
  const [mintedBadgeUrls, setMintedBadgeUrls] = useState<
    Array<Badge> | undefined
  >();
  const fileInputId = "upload-file-btn";

  const resetStates = () => {
    setError("");
    setMintedAvatarUrl("");
    setUploadedImage(undefined);
    setProfileImageUrl("");
    setImageSelection("No Image");
  };

  // Retrieve Existing Employee Signature Data
  const handleGetEmployeeData = useCallback(async () => {
    const handleMintedDataUpload = async (primaryEmail: string, data: any) => {
      if (primaryEmail) {
        const mintedData = await API.getMintedData(primaryEmail);
        const mintedAvatar = mintedData.data.nfts.find((avatar: any) => {
          if (
            avatar.attributes.find((attribute: any) => {
              return (
                attribute.trait_type === "Type" && attribute.value === "Avatar"
              );
            })
          ) {
            return true;
          }
          return false;
        });
        const mintedBadges = mintedData.data.nfts.filter((badge: any) => {
          if (
            badge.attributes.find((attribute: any) => {
              return (
                attribute.trait_type === "Feature" &&
                attribute.value === "Badge"
              );
            })
          ) {
            return true;
          }
          return false;
        });
        if (mintedAvatar) {
          setMintedAvatarUrl(mintedAvatar.imageUri ?? "");
        }
        if (mintedBadges) {
          if (data && data.mintedBadgeUrls) {
            const empMintedBadgeUrls = data.mintedBadgeUrls.map(
              (badge: Badge) => {
                return badge.url;
              }
            );
            const currMintedBadges = data.mintedBadgeUrls.filter(
              (badge: Badge) => {
                return mintedBadges
                  .map((importedBadge: any) => {
                    return importedBadge.imageUri;
                  })
                  .includes(badge.url);
              }
            );
            const newMintedBadges = mintedBadges
              .filter((url: any) => {
                return !empMintedBadgeUrls.includes(url.imageUri);
              })
              .map((url: any) => {
                const badge: Badge = {
                  url: url.imageUri,
                  isActive: false,
                };
                return badge;
              });
            const badges = currMintedBadges.concat(newMintedBadges);
            setMintedBadgeUrls(badges);
            return;
          }
          setMintedBadgeUrls(
            mintedBadges.map((url: any) => {
              const badge: Badge = {
                url: url.imageUri,
                isActive: false,
              };
              return badge;
            })
          );
        }
      }
    };
    if (!selectedEmployee) return;
    const primaryEmail = selectedEmployee.mail;
    const defaultData: Signature = {
      isActive: false,
      primaryEmail: selectedEmployee.mail || "",
      firstName: selectedEmployee.givenName || "",
      lastName: selectedEmployee.surname || "",
      title: selectedEmployee.jobTitle || "",
      phoneNumber: selectedEmployee.mobilePhone || "",
    };
    try {
      resetStates();
      setLoadingEmployeeData(true);
      const data = await getEmployeeSignatureData(primaryEmail);
      setSelectedSignature(data ?? defaultData);
      setLoadingEmployeeData(false);
      if (data) {
        if (data.uploadedProfileUrl)
          setProfileImageUrl(data.uploadedProfileUrl);
        if (data.profileUrl) {
          if (
            data.profileUrl === data.uploadedProfileUrl &&
            data.profileUrl !== ""
          ) {
            setImageSelection("Uploaded Profile");
          }
          if (data.profileUrl === data.avatarUrl)
            setImageSelection("Custom Avatar");
          if (data.profileUrl === data.defaultAvatar)
            setImageSelection("Minted Avatar");
        }
      }
      handleMintedDataUpload(primaryEmail, data);
    } catch {
      setLoadingEmployeeData(false);
      setSelectedSignature(defaultData);
    }
  }, [selectedEmployee, setSelectedSignature]);

  useEffect(() => {
    if (
      !isLoadingEmployeeData &&
      selectedEmployee?.mail !== employee?.primaryEmail
    )
      handleGetEmployeeData();
  }, [
    isLoadingEmployeeData,
    selectedEmployee,
    employee,
    handleGetEmployeeData,
  ]);

  // Save new selected image to local state
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    if (e.target.files && e.target.files[0]) {
      const type = e.target.files[0].type.toUpperCase();
      if (
        !(type.includes("PNG") || type.includes("JPG") || type.includes("JPEG"))
      ) {
        setImageError(`Image type (${type}) is not acceptable!`);
        clearFileInput();
      } else {
        const objLink = URL.createObjectURL(e.target.files[0]);
        setUploadedImage(e.target.files[0]);
        setProfileImageUrl(objLink);
        updateSignature("profileUrl", objLink);
        setImageSelection("Uploaded Profile");
      }
    }
  };

  // upload selected image to S3 and retrieve the url back
  const handleSeveUploadedImage = async () => {
    if (employee?.primaryEmail) {
      let formData = new FormData();
      formData.append("image", uploadedImage);
      const uploadedProfileUrl = await API.uploadProfileImage(
        formData,
        employee.primaryEmail
      );
      return uploadedProfileUrl || "";
    }
    return "";
  };

  const loadMsProfilePic = async (url: string) => {
    if (employee?.primaryEmail) {
      let formData = new FormData();
      formData.append("url", url);
      await API.uploadMsProfileImage(formData, employee.primaryEmail);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setBtnText("Saving employee data...");
      let employeeRecord = cloneDeep(employee);
      let newImageUrl = "";
      if (uploadedImage) {
        newImageUrl = await handleSeveUploadedImage();
      }
      if (employeeRecord) {
        // filter badge urls
        employeeRecord.badgeUrls = employeeRecord.badgeUrls
          ?.filter((bd) => !!bd && bd !== null && bd.url !== "")
          .map((bd) => {
            const badge: Badge = {
              url: bd.url,
              isActive: bd.isActive || false,
            };
            return badge || undefined;
          });

        // format phone number
        employeeRecord.phoneNumber = Helpers.formatePhoneNumber(
          employeeRecord.phoneNumber
        );

        // update profileUrl
        if (uploadedImage) {
          employeeRecord.uploadedProfileUrl = newImageUrl;
          if (msImageSelection === "Uploaded Profile") {
            employeeRecord.teamsProfileUrl = newImageUrl;
          }
        }
        if (imageSelection === "Uploaded Profile")
          employeeRecord.profileUrl = employeeRecord.uploadedProfileUrl;

        if (imageSelection === "Minted Avatar") {
          employeeRecord.defaultAvatar = mintedAvatarUrl;
        }
        employeeRecord.signatureProfileImage = imageSelection;

        // Upload profile pic
        loadMsProfilePic(employeeRecord.teamsProfileUrl || "");
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
    inputType?: "switch" | "textarea" | "divider"
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
            case "textarea":
              return (
                <>
                  <Form.Label>
                    <strong>{label}:</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    value={value?.toString() || ""}
                    onChange={(e) => {
                      setBtnText("Save Changes");
                      updateSignature(field, e.target.value);
                    }}
                    rows={(value?.toString().length || 0) / 80 + 2}
                  />
                </>
              );
            case "divider":
              return (
                <>
                  <hr />
                </>
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
      <div>
        <Form.Group className="mb-3" controlId="badgeUrls">
          <Form.Label>
            <strong>
              Custom Badge URLs (optional). Please separate badge urls with
              enter
            </strong>
          </Form.Label>
          {employee?.badgeUrls?.map((badge, index) => {
            return (
              <div>
                <Row>
                  <Col md={6}>
                    <Form.Control
                      value={badge.url?.toString() || ""}
                      onChange={(e) => {
                        setBtnText("Save Changes");
                        const badgeInput = e.target.value;
                        let updatedBadgeUrls = cloneDeep(
                          employee?.badgeUrls || []
                        );
                        if (index < updatedBadgeUrls.length)
                          badge = {
                            url: badgeInput,
                            isActive: badge.isActive || false,
                          };
                        updatedBadgeUrls[index] = badge;
                        updateSignature("badgeUrls", updatedBadgeUrls);
                      }}
                    />
                  </Col>
                  <Col md={4} className="d-flex align-items-center">
                    <Form.Switch
                      label="Enable Badge"
                      checked={badge.isActive}
                      onChange={() => {
                        let updatedBadgeUrls = cloneDeep(
                          employee?.badgeUrls || []
                        );
                        updatedBadgeUrls[index] = {
                          url: badge.url,
                          isActive: !badge.isActive,
                        };
                        updateSignature("badgeUrls", updatedBadgeUrls);
                      }}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="link"
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        setBtnText("Save Changes");
                        let updatedBadgeUrls = cloneDeep(
                          employee?.badgeUrls || []
                        );
                        if (index > -1 && index < updatedBadgeUrls.length)
                          updatedBadgeUrls.splice(index, 1);
                        updateSignature("badgeUrls", [...updatedBadgeUrls]);
                      }}
                    >
                      <GrClose></GrClose>
                    </Button>
                  </Col>
                </Row>
                <br />
              </div>
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
        <Form.Group>
          <Form.Label>
            <strong>Minted Badges</strong>
          </Form.Label>
          {mintedBadgeUrls?.map((badge, index) => {
            return (
              <Row>
                <Col md={6}>
                  <img src={badge.url} alt="" height={"100px"} width="auto" />
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <Form.Switch
                    label="Enable Badge"
                    checked={badge.isActive}
                    onChange={() => {
                      let updatedBadgeUrls = cloneDeep(mintedBadgeUrls || []);
                      updatedBadgeUrls[index] = {
                        url: badge.url,
                        isActive: !badge.isActive,
                      };
                      setMintedBadgeUrls(updatedBadgeUrls);
                      updateSignature("mintedBadgeUrls", updatedBadgeUrls);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
        </Form.Group>
      </div>
    );
  };

  const title =
    selectedEmployee && employee
      ? `${employee.firstName} ${employee.lastName} Info:`
      : "Employee Info";

  const clearFileInput = () => {
    const oldInput = document.getElementById(fileInputId);
    if (oldInput) {
      // create new input
      const newInput = document.createElement("input");
      newInput.type = "file";
      newInput.id = fileInputId;
      newInput.onchange = (e: any) => {
        handleImageUpload(e);
        setBtnText("Save Changes");
      };
      newInput.setAttribute("style", "display:none;");
      oldInput.parentNode?.replaceChild(newInput, oldInput);

      // component reset
      setUploadedImage(undefined);
      if (employee?.uploadedProfileUrl) {
        setProfileImageUrl(employee.uploadedProfileUrl);
        updateSignature("profileUrl", employee.uploadedProfileUrl);
      } else {
        setProfileImageUrl(undefined);
        updateSignature("profileUrl", "");
      }
    } else {
      setImageError("please try again");
    }
  };

  const dividerObj = {
    field: "divider",
    label: "divider",
    fieldData: undefined,
    inputType: "divider",
  };

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
                <Col md={6}>
                  {employee && (
                    <div>
                      <strong>Signature Preview</strong>
                      <Preview
                        data={employee}
                        signatureStyle={signatureStyle}
                      />
                    </div>
                  )}
                  <br />
                  <div>
                    <Row>
                      <Col md={5}>
                        <strong>Minted Avatar Preview</strong>
                        {mintedAvatarUrl && mintedAvatarUrl !== "" ? (
                          <img
                            src={mintedAvatarUrl}
                            alt={""}
                            height={"100px"}
                            width="auto"
                            style={{
                              display: "block",
                            }}
                          />
                        ) : (
                          <p>Minted Avatar Not Found</p>
                        )}
                      </Col>
                      <Col md={7}>
                        <strong>Custom Avatar Preview</strong>
                        {employee.avatarUrl && employee.avatarUrl !== "" ? (
                          <img
                            src={employee.avatarUrl}
                            alt={""}
                            height={"100px"}
                            width="auto"
                            style={{
                              display: "block",
                            }}
                          />
                        ) : (
                          <p>Enter Avatar Url Below</p>
                        )}
                        <br />
                        <Form.Control
                          placeholder="Enter Avatar Url Here"
                          value={employee.avatarUrl || ""}
                          onChange={(e) => {
                            setBtnText("Save Changes");
                            updateSignature("avatarUrl", e.target.value);
                            if (imageSelection === "Custom Avatar") {
                              setImageSelection("No Image");
                              updateSignature("profileUrl", "");
                            }
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <Row>
                      <Col md={6}>
                        <strong>Profile Picture</strong>
                        {profileImageUrl && profileImageUrl !== "" ? (
                          <img
                            src={
                              profileImageUrl.includes(PROFILE_IMAGE_S3_URL)
                                ? `${profileImageUrl}?${performance.now()}`
                                : `${profileImageUrl}`
                            }
                            alt={""}
                            height={"100px"}
                            width="auto"
                            style={{
                              display: "block",
                            }}
                          />
                        ) : (
                          <p>Upload Profile Image Below</p>
                        )}
                        <br />
                        <div>
                          <input
                            type="file"
                            id={fileInputId}
                            onChange={(e) => {
                              handleImageUpload(e);
                              setBtnText("Save Changes");
                            }}
                            style={{ display: "none" }}
                          />
                        </div>
                        <Button
                          onClick={() => {
                            setImageError("");
                            const btn =
                              document.getElementById("upload-file-btn");
                            if (!btn) setImageError("please try again");
                            else btn.click();
                          }}
                        >
                          {employee.uploadedProfileUrl || uploadedImage
                            ? "Update Profile"
                            : "Upload Profile"}
                        </Button>
                        {uploadedImage && (
                          <Button
                            onClick={() => {
                              setImageError("");
                              clearFileInput();
                            }}
                            variant={"link"}
                            disabled={isSaving}
                            style={{ textDecoration: "none" }}
                          >
                            <GrClose></GrClose>
                          </Button>
                        )}
                        {imageError && imageError !== "" && <p>{imageError}</p>}
                      </Col>
                      <Col md={6}></Col>
                    </Row>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <strong>Microsoft Teams' Profile Image</strong>
                    <div>
                      {[
                        {
                          label: "Uploaded Profile",
                          value: profileImageUrl,
                          display: !!profileImageUrl,
                        },
                        {
                          label: "Custom Avatar",
                          value: employee?.avatarUrl,
                          display:
                            employee.avatarUrl && employee.avatarUrl !== "",
                        },
                        {
                          label: "Minted Avatar",
                          value: mintedAvatarUrl,
                          display: mintedAvatarUrl && mintedAvatarUrl !== "",
                        },
                      ].map((btnConfig, index) => {
                        return btnConfig.display ? (
                          <Button
                            variant={
                              employee.teamsProfileUrl === btnConfig.value
                                ? "primary"
                                : "outline-primary"
                            }
                            key={`image-option-${index}`}
                            style={{ marginRight: "10px" }}
                            onClick={() => {
                              updateSignature(
                                "teamsProfileUrl",
                                btnConfig.value
                              );
                              setMsImageSelection(btnConfig.label as any);
                            }}
                          >
                            {btnConfig.label}
                          </Button>
                        ) : (
                          <></>
                        );
                      })}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className="px-2"
                    style={{
                      maxHeight: "480px",
                      overflowY: "scroll",
                      maxWidth: "100%",
                      overflowX: "hidden",
                    }}
                  >
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
                        // {
                        //   field: "teamsProfileUrl",
                        //   label: "Teams Profile URL",
                        //   fieldData: employee.teamsProfileUrl,
                        // },
                        dividerObj,
                        {
                          field: "displayPhoneNumber",
                          label: "Display phone number and website link?",
                          fieldData:
                            employee.displayPhoneNumber === undefined
                              ? true
                              : employee.displayPhoneNumber,
                          inputType: "switch",
                        },
                        {
                          field: "phoneNumber",
                          label: "Phone Number (Enter numbers only)",
                          fieldData: Helpers.filterWithNumberOnly(
                            employee.phoneNumber
                          ),
                        },
                        dividerObj,
                        {
                          field: "displayLandlinePhoneNumber",
                          label: "Display landline only phone number?",
                          fieldData: !!employee.displayLandlinePhoneNumber,
                          inputType: "switch",
                        },
                        {
                          field: "landlinePhoneNumber",
                          label:
                            "Landline Only Phone Number (Enter numbers only)",
                          fieldData: Helpers.filterWithNumberOnly(
                            employee.landlinePhoneNumber || ""
                          ),
                        },
                        dividerObj,
                        {
                          field: "displayTextPhoneNumber",
                          label: "Display text only phone number?",
                          fieldData: !!employee.displayTextPhoneNumber,
                          inputType: "switch",
                        },
                        {
                          field: "textPhoneNumber",
                          label: "Text Only Phone Number (Enter numbers only)",
                          fieldData: Helpers.filterWithNumberOnly(
                            employee.textPhoneNumber || ""
                          ),
                        },
                        dividerObj,
                        {
                          field: "displayMailingAddress",
                          label: "Display company address?",
                          fieldData: employee.displayMailingAddress,
                          inputType: "switch",
                        },
                        {
                          field: "isMoveLinkToTop",
                          label: "Display Calendar Link at the top?",
                          fieldData: employee.isMoveLinkToTop,
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
                    {/* Profile Pic Selection */}
                    <div>
                      <strong>Select an image for signature profile</strong>
                      {/* disabled={
                            !!profileImageUrl &&
                            (!employee.avatarUrl || employee.avatarUrl === "")
                          } */}
                      <div>
                        {[
                          {
                            label: "No Image",
                            value: "",
                            display: true,
                          },
                          {
                            label: "Uploaded Profile",
                            value: profileImageUrl,
                            display: !!profileImageUrl,
                          },
                          {
                            label: "Custom Avatar",
                            value: employee?.avatarUrl,
                            display:
                              employee.avatarUrl && employee.avatarUrl !== "",
                          },
                          {
                            label: "Minted Avatar",
                            value: mintedAvatarUrl,
                            display: mintedAvatarUrl && mintedAvatarUrl !== "",
                          },
                        ].map((btnConfig, index) => {
                          return btnConfig.display ? (
                            <Button
                              variant={
                                imageSelection === btnConfig.label
                                  ? "primary"
                                  : "outline-primary"
                              }
                              key={`image-option-${index}`}
                              style={{ marginRight: "10px" }}
                              onClick={() => {
                                updateSignature("profileUrl", btnConfig.value);
                                setImageSelection(btnConfig.label as any);
                              }}
                            >
                              {btnConfig.label}
                            </Button>
                          ) : (
                            <></>
                          );
                        })}
                      </div>
                    </div>
                    {/* Badge Section */}
                    <div>{createBadgeSet()}</div>
                    <div>
                      {createFieldSet(
                        "note",
                        "Note",
                        employee.note || "",
                        "textarea"
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            {/* Button Section */}
            <div
              style={{
                float: "right",
                display: "flex",
                marginTop: "5px",
              }}
            >
              <Button
                onClick={() => handleGetEmployeeData()}
                variant={"link"}
                disabled={isSaving}
                style={{ textDecoration: "none" }}
              >
                <span className="gradient-text">Reset</span>
              </Button>
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
