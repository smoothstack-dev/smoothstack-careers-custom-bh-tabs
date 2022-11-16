import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styled from "styled-components";
import { Icons } from "./Icons";
import useSignature from "./store/signature";
import useSignatureStyle from "./store/signatureStyle";
import * as _t from "./store/types";

export const Preview: React.FC<{}> = ({}) => {
  const { signature } = useSignature();
  const { signatureStyle, getConvertedStyleValue } = useSignatureStyle();

  const PreviewContainer = styled.div`
    display: flex;
    background-color: lightgray;
    justify-content: center;
    align-items: center;
    padding: 80px;
    min-height: 700px;
  `;

  const CardContainer = styled.div`
    display: flex;
    border: 0.1px;
    background-color: white;
    border-radius: 1%;
    padding: 10px;
    width: 600px;
    height: 200px;
  `;

  const NameSection = styled.span`
    color: ${signatureStyle.employeeName.color};
    font-size: ${getConvertedStyleValue(
      "size",
      signatureStyle.employeeName.size
    )}px;
    font-weight: ${getConvertedStyleValue(
      "weight",
      signatureStyle.employeeName.weight
    )};
    font-family: ${signatureStyle.employeeName.font};
  `;

  const TitleSection = styled.span`
    color: ${signatureStyle.title.color};
    font-size: ${getConvertedStyleValue("size", signatureStyle.title.size)}px;
    font-weight: ${getConvertedStyleValue(
      "weight",
      signatureStyle.title.weight
    )};
    font-family: ${signatureStyle.title.font};
  `;

  const AdditionalSection = styled.span`
    color: ${signatureStyle.additionalFields.color};
    font-size: ${getConvertedStyleValue(
      "size",
      signatureStyle.additionalFields.size
    )}px;
    font-weight: ${getConvertedStyleValue(
      "weight",
      signatureStyle.additionalFields.weight
    )};
    font-family: ${signatureStyle.additionalFields.font};
  `;

  const SocialSection = styled.span`
    color: ${signatureStyle.socials.color};
    font-size: ${getConvertedStyleValue("size", signatureStyle.socials.size)}px;
    font-weight: ${getConvertedStyleValue(
      "weight",
      signatureStyle.socials.weight
    )};
    font-family: ${signatureStyle.socials.font};
  `;

  return (
    <PreviewContainer>
      <Container>
        <Row>
          <strong>Signature Preview</strong>
        </Row>
        <Row>
          <CardContainer>
            <Container>
              <Row>
                <Col md={5}>
                  <div
                    style={{
                      height: "175px",
                      maxWidth: "225px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={signature.companyLogoUrl}
                      style={{
                        padding: "2px",
                        display: "block",
                        height: "170px",
                        width: "auto",
                      }}
                    />
                  </div>
                </Col>
                <Col md={7}>
                  <div>
                    <NameSection>{signature.employeeName}</NameSection>
                    <br />
                    <TitleSection>{signature.title}</TitleSection>
                    <br />
                    {signature.additionalFields
                      .filter(
                        (af: _t.AdditionalField) =>
                          af.fieldValue && af.fieldName !== "Address"
                      )
                      .map((af: _t.AdditionalField, index) => {
                        return (
                          <>
                            {!!index && " | "}
                            <Icons icon={af.id} />
                            <AdditionalSection>
                              {" "}
                              {af.fieldValue}
                            </AdditionalSection>
                          </>
                        );
                      })}
                    <br />
                    {signature.additionalFields
                      .filter(
                        (af: _t.AdditionalField) =>
                          af.fieldValue && af.fieldName === "Address"
                      )
                      .map((af: _t.AdditionalField, index) => {
                        return (
                          <>
                            <Icons icon={af.id} />
                            <AdditionalSection>
                              {" "}
                              {af.fieldValue}
                            </AdditionalSection>
                            <br />
                          </>
                        );
                      })}
                    {signature.socials
                      .filter((s: _t.Social) => s.socialLink)
                      .map((s: _t.Social) => {
                        return (
                          <a href={s.socialLink} target="_blank">
                            <Icons icon={s.id} />
                          </a>
                        );
                      })}
                    <Image
                      src={signature.companyLogoUrl}
                      style={{
                        marginTop: "5px",
                        height: "25px",
                        width: "auto",
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </CardContainer>
        </Row>
      </Container>
    </PreviewContainer>
  );
};
