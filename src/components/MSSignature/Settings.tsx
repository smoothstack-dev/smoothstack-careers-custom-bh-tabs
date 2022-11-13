import React from "react";
import { FloatingLabel, Form, Tab, Tabs } from "react-bootstrap";
import useSignature from "./store/signature";
import { AdditionalField, Social } from "./store/types";

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
  return <div>Design</div>;
};
