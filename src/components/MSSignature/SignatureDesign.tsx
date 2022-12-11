import React from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import useSignatureStyle from "./store/signatureStyle";
import { FontList, INITIAL_SIGNATURE } from "./store/literal";
import { Preview } from "./Preview";
import { SignatureStyleFields } from "./store/types";
import { toInteger } from "lodash";

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

export const SignatureDesign: React.FC<{}> = ({}) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={4}>
            <DesignSection />
          </Col>
          <Col md={8}>
            <PreviewContainer>
              <Container>
                <Row>
                  <strong>Signature Preview</strong>
                </Row>
                {/* Actual Signature Starting Point */}
                <Preview data={INITIAL_SIGNATURE} />
              </Container>
            </PreviewContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const DesignSection: React.FC<{}> = ({}) => {
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
          <Row>
            <Col md={3}>Weight</Col>
            <Col md={9}>
              <Form.Range
                onChange={(e) => {
                  updateSubStyle(
                    field,
                    "weight",
                    toInteger(+e.target.value / 10) * 100
                  );
                }}
                value={signatureStyle[field].weight / 10}
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
      <Button>Save Changes</Button>
    </div>
  );
};
