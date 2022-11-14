import React from "react";
import { Container, Row, Col } from "react-bootstrap";
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
    border: 0.1px;
    background-color: white;
    border-radius: 1%;
    padding: 10px;
    width: 500px;
    height: 200px;
  `;

  const Photo = styled.div`
    color: blue;
    font-weight: 800;
    font-size: 20px;
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
  `;

  const TitleSection = styled.span`
    color: ${signatureStyle.title.color};
    font-size: ${getConvertedStyleValue("size", signatureStyle.title.size)}px;
    font-weight: ${getConvertedStyleValue(
      "weight",
      signatureStyle.title.weight
    )};
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
  `;

  const SocialSection = styled.span`
    color: ${signatureStyle.socials.color};
    font-size: ${getConvertedStyleValue("size", signatureStyle.socials.size)}px;
    font-weight: ${getConvertedStyleValue(
      "weight",
      signatureStyle.socials.weight
    )};
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
                <Col md={3}>
                  <Photo>Photo Shown Here</Photo>
                </Col>
                <Col md={9}>
                  <NameSection>{signature.employeeName}</NameSection>
                  <br />
                  <TitleSection>
                    {signature.title}, {signature.company}
                  </TitleSection>
                  <br />
                  {signature.additionalFields
                    .filter((af: _t.AdditionalField) => af.fieldValue)
                    .map((af: _t.AdditionalField) => {
                      return (
                        <>
                          <Icons icon={af.id} />
                          <AdditionalSection>
                            {" "}
                            {af.fieldValue}
                          </AdditionalSection>
                          <br />{" "}
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
                </Col>
              </Row>
            </Container>
          </CardContainer>
        </Row>
      </Container>
    </PreviewContainer>
  );
};
