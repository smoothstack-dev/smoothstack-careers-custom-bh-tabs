import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as FaIcon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";
import styled from "styled-components";
import useSignature from "./store/signature";
import useSignatureStyle from "./store/signatureStyle";
import * as _t from "./store/types";

export const Preview: React.FC<{}> = ({}) => {
  const { signature } = useSignature();
  const { signatureStyle } = useSignatureStyle();
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
    weight: 800;
    font-size: 20px;
  `;

  const NameSection = styled.span`
    color: ${signatureStyle.employeeName.color};
    font-size: ${signatureStyle.employeeName.size};
    weight: ${signatureStyle.employeeName.weight};
  `;

  const TitleSection = styled.span`
    color: ${signatureStyle.title.color};
    font-size: ${signatureStyle.title.size};
    weight: ${signatureStyle.title.weight};
  `;

  const AdditionalSection = styled.span`
    color: ${signatureStyle.additionalFields.color};
    font-size: ${signatureStyle.additionalFields.size};
    weight: ${signatureStyle.additionalFields.weight};
  `;

  const SocialSection = styled.span`
    color: ${signatureStyle.socials.color};
    font-size: ${signatureStyle.socials.size};
    weight: ${signatureStyle.socials.weight};
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
                  <Photo>photo</Photo>
                </Col>
                <Col md={9}>
                  <NameSection>{signature.employeeName}</NameSection>
                  <br />
                  <TitleSection>{signature.title}</TitleSection>
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
                      return <Icons icon={s.id} />;
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

const Icons: React.FC<{ icon: _t.Icons }> = ({ icon }) => {
  switch (icon) {
    case "linkedin":
      return <FaIcon.FaLinkedin />;
    case "youtube":
      return <FaIcon.FaFacebookSquare />;
    case "instagram":
      return <FaIcon.FaInstagram />;
    case "twitter":
      return <FaIcon.FaTwitter />;
    case "facebook":
      return <FaIcon.FaFacebook />;
    case "website":
      return <AiIcon.AiOutlineGlobal />;
    case "phone":
      return <AiIcon.AiOutlinePhone />;
    case "address":
      return <AiIcon.AiOutlineHome />;
    case "mobile":
      return <AiIcon.AiOutlineMobile />;
  }
};
