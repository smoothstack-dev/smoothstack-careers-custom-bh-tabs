import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  ToggleButton,
} from "react-bootstrap";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import useSignatureStyle from "./store/signatureStyle";
import { FontList, MOCK_SIGNATURE } from "./store/literal";
import { Preview } from "./Preview";
import { SignatureStyleFields } from "./store/types";
import ReactDOMServer from "react-dom/server";
import * as TfiIcon from "react-icons/tfi";
import * as HiIcon from "react-icons/hi";
import * as AiIcon from "react-icons/ai";

const SettingContainer = styled.div`
  max-height: 650px;
  overflow-y: scroll;
`;

const PreviewContainer = styled.div`
  display: flex;
  background-color: lightgray;
  justify-content: center;
  align-items: center;
  padding: 80px;
  min-height: 700px;
`;

const mockGenerateSignatureFunc = (data: any) => {
  const { companyLogoUrl, profileDefualtUrl } = data;
  const {
    signatureLayout,
    profileImageSection,
    phoneNumberSection,
    calendarSection,
    addressSection,
    companyLogoSection,
    badgeSection,
  } = data.signatureHtml;

  // 1. start with layout
  const employeeData = MOCK_SIGNATURE;
  let updatedLayout = signatureLayout;

  // 2. replace profile image
  const profileUrl = employeeData.profileUrl || profileDefualtUrl;
  const profileImg = profileImageSection.replace(
    "[INSERT PROFILE_URL]",
    profileUrl
  );
  updatedLayout = updatedLayout.replace("[INSERT PROFILE_IMG]", profileImg);

  // 3. replace employee name and title
  const employeeName = `${employeeData.firstName} ${
    employeeData.middleNameInitial ? employeeData.middleNameInitial + ". " : ""
  }
  ${employeeData.lastName}`;
  updatedLayout = updatedLayout.replace("[INSERT EMPLOYEE_NAME]", employeeName);
  updatedLayout = updatedLayout.replace(
    "[INSERT EMPLOYEE_TITLE]",
    employeeData.title
  );

  // 4. replace additional fields
  const phoneNumber = employeeData.phoneNumber
    ? phoneNumberSection.replace(
        "[INSERT PHONE_NUMBER]",
        employeeData.phoneNumber
      )
    : undefined;
  const calendar = employeeData.calendarUrl
    ? calendarSection
        .replace("[INSERT CALENDAR_URL]", employeeData.calendarUrl)
        .replace("[INSERT CALENDAR_URL]", employeeData.calendarUrl)
    : undefined;
  let address = employeeData.mailingAddress
    ? addressSection.replace(
        "[INSERT MAILING_ADDRESS_1]",
        employeeData.mailingAddress
      )
    : // .replace(
      //   "[INSERT MAILING_ADDRESS_2]",
      //   employeeData.mailingAddress2 || " "
      // )
      undefined;

  const additionalFieldSection = [phoneNumber, calendar].join(" | ") + address;
  updatedLayout = updatedLayout.replace(
    "[INSERT ADDITIONAL_FIELDS]",
    additionalFieldSection
  );

  // 5. replace company logo
  const companyLogo = companyLogoSection.replace(
    "[INSERT COMPANY_LOGO_URL]",
    companyLogoUrl || ""
  );
  updatedLayout = updatedLayout.replace(
    "[INSERT COMPANY_LOGO_IMG]",
    companyLogo
  );

  // 6. replace badges
  let badges = "";
  employeeData.badgeUrls?.forEach((b) => {
    badges += badgeSection.replace("[INSERT BADGE_URL]", b);
  });
  updatedLayout = updatedLayout.replace("[INSERT BADGE_IMG]", badges);
};

export const SignatureDesign: React.FC<{}> = ({}) => {
  const { signatureStyle } = useSignatureStyle();
  const BreakStyleMedium = {
    display: "block",
    marginBottom: "0em",
  };

  const handleSave = () => {
    const signatureLayout = ReactDOMServer.renderToString(
      <Preview
        data={MOCK_SIGNATURE}
        signatureStyle={signatureStyle}
        isGenerateSignatureFrame={true}
      />
    );
    const profileImageSection = ReactDOMServer.renderToString(
      <img
        src="[INSERT PROFILE_URL]"
        style={{
          display: "block",
          height: "175px",
          width: "auto",
        }}
      />
    );
    const phoneNumberSection = ReactDOMServer.renderToString(
      <span>
        <TfiIcon.TfiMobile /> [INSERT PHONE_NUMBER]
      </span>
    );
    const calendarSection = ReactDOMServer.renderToString(
      <span>
        <AiIcon.AiOutlineGlobal />{" "}
        <a href="[INSERT CALENDAR_URL]" target="_blank">
          [INSERT CALENDAR_URL]
        </a>
      </span>
    );
    const addressSection = ReactDOMServer.renderToString(
      <>
        <span style={BreakStyleMedium} />{" "}
        <span>
          <HiIcon.HiOutlineOfficeBuilding />
          [INSERT MAILING_ADDRESS_1]
        </span>
        {/* <span style={BreakStyleMedium} />
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [INSERT MAILING_ADDRESS_2]</span> */}
      </>
    );
    const companyLogoSection = ReactDOMServer.renderToString(
      <img
        src="[INSERT COMPANY_LOGO_URL]"
        style={{
          height: "25px",
          width: "auto",
        }}
      />
    );
    const badgeSection = ReactDOMServer.renderToString(
      <img
        src="[INSERT BADGE_URL]"
        style={{
          height: "25px",
          width: "25px",
        }}
      />
    );
    const signatureHtml = {
      signatureLayout,
      profileImageSection,
      phoneNumberSection,
      calendarSection,
      addressSection,
      companyLogoSection,
      badgeSection,
    };
    const requestData = {
      ...signatureStyle,
      signatureHtml,
    };
    mockGenerateSignatureFunc(requestData);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <DesignSection handleSave={handleSave} />
          </Col>
          <Col md={8}>
            <PreviewContainer>
              <Container>
                <Row>
                  <strong>Signature Preview</strong>
                </Row>
                {/* Actual Signature Starting Point */}
                <Preview
                  data={MOCK_SIGNATURE}
                  signatureStyle={signatureStyle}
                />
              </Container>
            </PreviewContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const DesignSection: React.FC<{ handleSave: any }> = ({ handleSave }) => {
  const { signatureStyle, updateStyle, updateSubStyle } = useSignatureStyle();

  const colorPopover = (field: SignatureStyleFields) => {
    return (
      <Popover id="popover-basic">
        <ChromePicker
          color={signatureStyle[field].color}
          onChangeComplete={(color) =>
            updateSubStyle(field, "color", color.hex)
          }
        />
      </Popover>
    );
  };

  const DesignSubsection = (field: SignatureStyleFields) => {
    return (
      <>
        <Container>
          <Row>
            <Col md={3}>Font</Col>
            <Col md={9}>
              <DropdownButton
                id="dropdown-basic-button"
                title={signatureStyle[field].font}
                size="sm"
              >
                {FontList.map((f) => (
                  <Dropdown.Item
                    onClick={() => updateSubStyle(field, "font", f)}
                  >
                    <span style={{ fontFamily: f }}>{f}</span>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>Color</Col>
            <Col md={9}>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={colorPopover(field)}
              >
                <Button
                  size="sm"
                  style={{ background: signatureStyle[field].color }}
                >
                  {signatureStyle[field].color}
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>Weight</Col>
            <Col md={9}>
              <ButtonGroup>
                <ToggleButton
                  key={`radio-${field}-1`}
                  id={`radio-${field}-1`}
                  type="checkbox"
                  variant={"outline-primary"}
                  name="checkbox"
                  value={"normal"}
                  size="sm"
                  checked={signatureStyle[field].weight === "normal"}
                  onChange={() => updateSubStyle(field, "weight", "normal")}
                >
                  Regular
                </ToggleButton>
                <ToggleButton
                  key={`radio-${field}-2`}
                  id={`radio-${field}-2`}
                  type="checkbox"
                  variant={"outline-primary"}
                  name="checkbox"
                  value={"bold"}
                  size="sm"
                  checked={signatureStyle[field].weight === "bold"}
                  onChange={() => updateSubStyle(field, "weight", "bold")}
                >
                  <strong>Bold</strong>
                </ToggleButton>
              </ButtonGroup>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>{`Size (${signatureStyle[field].size}px)`}</Col>
            <Col md={9}>
              <Form.Range
                onChange={(e) => {
                  updateSubStyle(field, "size", +e.target.value / 2);
                }}
                value={signatureStyle[field].size * 2}
              />
            </Col>
          </Row>
          <br />
        </Container>
        <hr />
      </>
    );
  };

  return (
    <div>
      <SettingContainer>
        <div>
          <p>
            <strong>Company Logo Url</strong>
            <Form.Control
              value={signatureStyle.companyLogoUrl || ""}
              onChange={(e) => {
                updateStyle("companyLogoUrl", e.target.value);
              }}
            />
          </p>
          <p>
            <strong>Pofile Defualt Url</strong>
            <Form.Control
              value={signatureStyle.profileDefualtUrl || ""}
              onChange={(e) => {
                updateStyle("profileDefualtUrl", e.target.value);
              }}
            />
          </p>
        </div>
        <div>
          <p>
            <strong>Employee Name</strong>
          </p>
          {DesignSubsection("employeeName")}
        </div>
        <div>
          <p>
            <strong>Title</strong>
          </p>
          {DesignSubsection("title")}
        </div>
        <div>
          <p>
            <strong>Additional Fields</strong>
          </p>
          {DesignSubsection("additionalFields")}
        </div>
      </SettingContainer>
      <br />
      <Button onClick={() => handleSave()}>Save Changes</Button>
    </div>
  );
};
