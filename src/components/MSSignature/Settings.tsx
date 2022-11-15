import React from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  FloatingLabel,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import useSignature from "./store/signature";
import useSignatureStyle from "./store/signatureStyle";
import { AdditionalField, Social } from "./store/types";
import { FontList } from "./store/literal";

const SettingContainer = styled.div`
  max-height: 650px;
  overflow-y: scroll;
`;

export const Settings: React.FC<{}> = ({}) => {
  return (
    <div>
      <Tabs defaultActiveKey="details" transition={false} className="mb-3">
        <Tab eventKey="details" title="Details">
          <DetailSection />
        </Tab>
        <Tab eventKey="socail" title="Social">
          <SocialSection />
        </Tab>
        <Tab eventKey="design" title="Design">
          <DesignSection />
        </Tab>
      </Tabs>
    </div>
  );
};

const DetailSection: React.FC<{}> = ({}) => {
  const { signature, updateSignature, updateAdditionalField } = useSignature();
  return (
    <div>
      <p>
        <strong>Employee Info:</strong>
      </p>
      <FloatingLabel label="Employee Name" className="fieldLabel">
        <Form.Control
          placeholder="Employee Name"
          value={signature.employeeName}
          onChange={(e) => {
            updateSignature("employeeName", e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel label="Title" className="fieldLabel">
        <Form.Control
          placeholder="Title"
          value={signature.title}
          onChange={(e) => {
            updateSignature("title", e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel label="Profile Url" className="fieldLabel">
        <Form.Control
          placeholder="http://"
          value={signature.profileUrl}
          onChange={(e) => {
            updateSignature("profileUrl", e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel label="Company Logo Url" className="fieldLabel">
        <Form.Control
          placeholder="http://"
          value={signature.companyLogoUrl}
          onChange={(e) => {
            updateSignature("companyLogoUrl", e.target.value);
          }}
        />
      </FloatingLabel>
      <p>
        <strong>Additional Fields:</strong>
      </p>
      {signature.additionalFields.map((af: AdditionalField) => {
        return (
          <FloatingLabel label={af.fieldName} className="fieldLabel">
            <Form.Control
              placeholder={af.fieldName}
              value={af.fieldValue || undefined}
              onChange={(e) => {
                updateAdditionalField(af.id, e.target.value);
              }}
            />
          </FloatingLabel>
        );
      })}
    </div>
  );
};

const SocialSection: React.FC<{}> = ({}) => {
  const { signature, updateSocial } = useSignature();
  return (
    <div>
      {signature.socials.map((social: Social) => {
        return (
          <FloatingLabel label={social.socialTitle} className="fieldLabel">
            <Form.Control
              placeholder={social.socialTitle}
              value={social.socialLink || undefined}
              onChange={(e) => {
                updateSocial(social.id, e.target.value);
              }}
            />
          </FloatingLabel>
        );
      })}
    </div>
  );
};

const DesignSection: React.FC<{}> = ({}) => {
  const { signatureStyle, updateStyle } = useSignatureStyle();

  const colorPopover = (
    field: "employeeName" | "title" | "additionalFields" | "socials"
  ) => {
    return (
      <Popover id="popover-basic">
        <ChromePicker
          color={signatureStyle[field].color}
          onChangeComplete={(color) => updateStyle(field, "color", color.hex)}
        />
      </Popover>
    );
  };

  const DesignSubsection = (
    field: "employeeName" | "title" | "additionalFields" | "socials"
  ) => {
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
                  <Dropdown.Item onClick={() => updateStyle(field, "font", f)}>
                    <span style={{ fontFamily: f }}>{f}</span>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>Size</Col>
            <Col md={9}>
              <Form.Range
                onChange={(e) => {
                  updateStyle(field, "size", +e.target.value);
                }}
                value={signatureStyle[field].size}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>Weight</Col>
            <Col md={9}>
              <Form.Range
                onChange={(e) => {
                  const rawSize = +e.target.value;
                  updateStyle(field, "weight", +e.target.value);
                }}
                value={signatureStyle[field].weight}
              />
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
        </Container>
        <hr />
      </>
    );
  };

  return (
    <SettingContainer>
      <div>
        <p>
          <strong>Photo (TODO)</strong>
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
      <div>
        <p>
          <strong>Social Links</strong>
        </p>
        {DesignSubsection("socials")}
      </div>
    </SettingContainer>
  );
};
