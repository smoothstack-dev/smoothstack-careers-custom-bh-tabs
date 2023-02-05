import React, { useEffect } from "react";
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
import {
  FontList,
  INITIAL_SIGNATURE_STYLE,
  MOCK_SIGNATURE,
  SIGNATURE_IMAGE_CONFIG,
} from "./store/literal";
import { Preview } from "./Preview";
import { SignatureStyleFields } from "./store/types";
import ReactDOMServer from "react-dom/server";
import * as API from "./../../helpers/api";
import { cloneDeep } from "lodash";

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

export const SignatureDesign = () => {
  const { signatureStyle } = useSignatureStyle();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [btnText, setBtnText] = React.useState<string>("Save Changes");

  useEffect(() => {
    setBtnText("Save Changes");
  }, [signatureStyle, setBtnText]);

  // Hepler function to convert react component to htmlstring
  const convertHtmlToString = (
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  ) => {
    return ReactDOMServer.renderToString(element);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setBtnText("Saving your changes....");
    const { picH, linkH } = SIGNATURE_IMAGE_CONFIG;
    const signatureLayout = ReactDOMServer.renderToString(
      <Preview
        data={MOCK_SIGNATURE}
        signatureStyle={signatureStyle}
        isGenerateSignatureFrame={true}
      />
    );
    const profileImageSection = convertHtmlToString(
      <td>
        <div
          style={{
            height: `${picH}px`,
            maxWidth: `${picH}px`,
            marginRight: "5px",
            overflow: "hidden",
          }}
        >
          <img
            src="[INSERT PROFILE_URL]"
            alt=""
            height={`${picH}`}
            width={`${picH}`}
            style={{
              height: `${picH}px`,
              width: `${picH}px`,
            }}
          />
        </div>
      </td>
    );
    const phoneNumberSection = convertHtmlToString(
      <span>[INSERT PHONE_NUMBER]</span>
    );
    const companyWebsiteSection = convertHtmlToString(
      <span>
        <a href="[INSERT COMPANY_WEBSITE_URL]" target="_blank">
          [INSERT COMPANY_WEBSITE_URL_LABEL]
        </a>
      </span>
    );
    const addressSection = convertHtmlToString(
      <>
        <br />
        <span>[INSERT MAILING_ADDRESS]</span>
      </>
    );
    const companyLogoSection = convertHtmlToString(
      <a href="[INSERT COMPANY_WEBSITE_URL]" target="_blank" rel="noreferrer">
        <img
          src="[INSERT COMPANY_LOGO_URL]"
          alt=""
          height={`${signatureStyle.companyLogoSize}`}
          style={{
            height: `${signatureStyle.companyLogoSize}px`,
          }}
        />
      </a>
    );
    const badgeSection = convertHtmlToString(
      <img
        src="[INSERT BADGE_URL]"
        alt=""
        height={`${signatureStyle.badgeSize}`}
        width={`${signatureStyle.badgeSize}`}
        style={{
          height: `${signatureStyle.badgeSize}px`,
          width: `${signatureStyle.badgeSize}px`,
          marginLeft: "1px",
          marginBottom: "1px",
        }}
      />
    );

    const calendarSectionTop = convertHtmlToString(
      <div style={{ height: `${linkH}px` }}>
        <span>
          <a href="[INSERT CALENDAR_URL]" target="_blank" rel="noreferrer">
            [INSERT CALENDAR_URL_LABEL]
          </a>
        </span>
      </div>
    );
    const calendarSection = convertHtmlToString(
      <span>
        <a href="[INSERT CALENDAR_URL]" target="_blank" rel="noreferrer">
          [INSERT CALENDAR_URL_LABEL]
        </a>
      </span>
    );
    const signatureHtml = {
      signatureLayout,
      profileImageSection,
      phoneNumberSection,
      companyWebsiteSection,
      addressSection,
      companyLogoSection,
      badgeSection,
      calendarSection,
      calendarSectionTop,
    };
    const requestData = {
      ...signatureStyle,
      sections: signatureHtml,
    };
    try {
      await API.saveSignatureConfigData(requestData);
      setIsSaving(false);
      setBtnText("Saved");
    } catch {
      setIsSaving(false);
      setBtnText("Something when wrong, please save it again!");
    }
  };

  const previewData = { ...MOCK_SIGNATURE };

  return (
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <DesignSection
              handleSave={handleSave}
              btnText={btnText}
              isSaving={isSaving}
            />
          </Col>
          <Col md={8}>
            <PreviewContainer>
              <Container>
                <Row>
                  <strong>Signature Preview</strong>
                </Row>
                {/* Actual Signature Starting Point */}
                <Preview data={previewData} signatureStyle={signatureStyle} />
              </Container>
            </PreviewContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const DesignSection: React.FC<{
  handleSave: any;
  btnText: string;
  isSaving: boolean;
}> = ({ handleSave, btnText, isSaving }) => {
  const { signatureStyle, updateStyle, updateSubStyle, setStyle } =
    useSignatureStyle();

  const handleSetToDefault = () => {
    setStyle(() => {
      let defaultStyle = cloneDeep(INITIAL_SIGNATURE_STYLE);
      defaultStyle.mailingAddress = signatureStyle.mailingAddress;
      return defaultStyle;
    });
  };

  /**
   * Color popover to allow user to select a color or enter color code
   * @param field
   * @returns
   */
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

  /**
   * This is the generic function to generate styling design for font, size, bold, and color
   * Currently it is taking fields including: employeeFirstName, employeeLastName, title, additionalFields
   * @param field
   * @returns
   */
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
        {/* Input Box Sections */}
        <div>
          {[
            {
              label: "Company Logo Url",
              field: "companyLogoUrl",
              value: signatureStyle.companyLogoUrl,
            },
            {
              label: "Company Website Url Label",
              field: "companyWebsiteUrlLabel",
              value: signatureStyle.companyWebsiteUrlLabel,
              isDisabled: true,
            },
            {
              label: "Company Website Url",
              field: "companyWebsiteUrl",
              value: signatureStyle.companyWebsiteUrl,
              isDisabled: true,
            },
            {
              label: "Company Mailing Address",
              field: "mailingAddress",
              value: signatureStyle.mailingAddress,
            },
            // {
            //   label: "Profile Image Defualt Url",
            //   field: "profileDefaultUrl",
            //   value: signatureStyle.profileDefaultUrl,
            // },
          ].map((item, index) => {
            return (
              <p tabIndex={index}>
                <strong>{item.label}</strong>
                <Form.Control
                  value={item.value || ""}
                  onChange={(e) => {
                    updateStyle(item.field, e.target.value);
                  }}
                  disabled={!!item.isDisabled}
                />
              </p>
            );
          })}
        </div>
        {/* Stylling Sections that use DesignSubsection() */}
        <div>
          {[
            { label: "Employee First Name", fieldName: "employeeFirstName" },
            { label: "Employee Last Name", fieldName: "employeeLastName" },
            { label: "Title", fieldName: "title" },
            { label: "Additional Fields", fieldName: "additionalFields" },
          ].map((item, index) => {
            return (
              <div tabIndex={index}>
                <p>
                  <strong>{item.label}</strong>
                </p>
                {DesignSubsection(item.fieldName as SignatureStyleFields)}
              </div>
            );
          })}
        </div>
        <div>
          {[
            {
              label: "Badge Size",
              field: "badgeSize",
              value: signatureStyle.badgeSize,
            },
            {
              label: "Company Logo Size",
              field: "companyLogoSize",
              value: signatureStyle.companyLogoSize,
            },
          ].map((item, index) => {
            return (
              <div>
                <p>
                  <strong>{item.label}</strong>
                </p>
                <Container>
                  <Row>
                    <Col md={3}>{`Size (${item.value}px)`}</Col>
                    <Col md={9}>
                      <Form.Range
                        onChange={(e) => {
                          const size = +e.target.value;
                          if (size >= 10 && size <= 40)
                            updateStyle(item.field, e.target.value);
                        }}
                        value={item.value}
                      />
                    </Col>
                  </Row>
                </Container>
                <hr />
              </div>
            );
          })}
        </div>
      </SettingContainer>
      <br />
      <Button onClick={() => handleSave()} disabled={isSaving}>
        {btnText}
      </Button>
      <Button
        variant="link"
        onClick={() => handleSetToDefault()}
        disabled={isSaving}
      >
        Reset to Default
      </Button>
    </div>
  );
};
