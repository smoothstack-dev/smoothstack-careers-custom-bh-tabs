import React from "react";
import * as _t from "./store/types";
import * as TfiIcon from "react-icons/tfi";
import * as HiIcon from "react-icons/hi";
import * as AiIcon from "react-icons/ai";
import {
  INITIAL_SIGNATURE_STYLE,
  SIGNATURE_IMAGE_CONFIG,
} from "./store/literal";

export const Preview: React.FC<{
  data: _t.Signature;
  signatureStyle: _t.SignatureStyles;
  isGenerateSignatureFrame?: boolean;
}> = ({ data: previewData, signatureStyle, isGenerateSignatureFrame }) => {
  const { cardW, cardH, picH, logoH } = SIGNATURE_IMAGE_CONFIG;

  const CardContainerStyle = {
    display: "flex",
    border: "0.1px",
    backgroundColor: isGenerateSignatureFrame ? "transparent" : "white",
    borderRadius: "1%",
    padding: "3px",
    width: `${cardW}px`,
    height: `${cardH}px`,
  };

  const FirstNameSectionStyle = {
    color: signatureStyle.employeeFirstName.color,
    fontSize: `${signatureStyle.employeeFirstName.size}px`,
    fontWeight: signatureStyle.employeeFirstName.weight,
    fontFamily: signatureStyle.employeeFirstName.font,
  };

  const LastNameSectionStyle = {
    color: signatureStyle.employeeLastName.color,
    fontSize: `${signatureStyle.employeeLastName.size}px`,
    fontWeight: signatureStyle.employeeLastName.weight,
    fontFamily: signatureStyle.employeeLastName.font,
  };

  const TitleSectionStyle = {
    color: signatureStyle.title.color,
    fontSize: `${signatureStyle.title.size}px`,
    fontWeight: signatureStyle.title.weight,
    fontFamily: signatureStyle.title.font,
  };

  const AdditionalSectionStyle = {
    color: signatureStyle.additionalFields.color,
    fontSize: `${signatureStyle.additionalFields.size}px`,
    fontWeight: signatureStyle.additionalFields.weight,
    fontFamily: signatureStyle.additionalFields.font,
  };

  const BreakStyleSmall = {
    display: "block",
    marginBottom: "-.8em",
  };

  const BreakStyleMedium = {
    display: "block",
    marginBottom: "0em",
  };

  if (!previewData) return <>No Data to Show</>;
  return (
    <div style={CardContainerStyle}>
      <table
        style={{
          height: `${picH}px`,
        }}
      >
        <tr>
          <th rowSpan={4}>
            <div
              style={{
                height: `${picH}px`,
                maxWidth: `${picH}px`,
                marginRight: "5px",
                overflow: "hidden",
              }}
            >
              {/* Profile Section Img */}
              {isGenerateSignatureFrame ? (
                `[INSERT PROFILE_IMG]`
              ) : (
                <img
                  src={
                    previewData.profileUrl ?? signatureStyle.profileDefaultUrl
                  }
                  alt={signatureStyle.profileDefaultUrl}
                  height={`${picH}px`}
                  width="auto"
                  style={{
                    display: "block",
                  }}
                />
              )}
            </div>
          </th>
        </tr>
        <tr>
          <th style={{ verticalAlign: "top", textAlign: "left" }}>
            {" "}
            {/* Name and Title */}
            <span style={FirstNameSectionStyle}>
              {" "}
              {isGenerateSignatureFrame
                ? `[INSERT EMPLOYEE_FIRST_NAME]`
                : previewData.firstName}
            </span>
            <span style={LastNameSectionStyle}>
              {" "}
              {isGenerateSignatureFrame
                ? `[INSERT EMPLOYEE_LAST_NAME]`
                : previewData.lastName}
            </span>
            {isGenerateSignatureFrame ? (
              <div style={TitleSectionStyle}>
                {isGenerateSignatureFrame
                  ? `[INSERT EMPLOYEE_TITLE]`
                  : previewData.title}
              </div>
            ) : (
              <>
                <span style={BreakStyleSmall} />
                <span style={TitleSectionStyle}>
                  {isGenerateSignatureFrame
                    ? `[INSERT EMPLOYEE_TITLE]`
                    : previewData.title}
                </span>
              </>
            )}
          </th>
        </tr>
        <tr>
          <th
            style={{
              verticalAlign: "top",
              textAlign: "left",
              height: `${+AdditionalSectionStyle.fontSize * 2}px`,
            }}
          >
            {/* Additional Fields */}
            <div style={AdditionalSectionStyle}>
              {isGenerateSignatureFrame ? (
                `[INSERT ADDITIONAL_FIELDS]`
              ) : (
                <>
                  {previewData.phoneNumber && (
                    <span>
                      <TfiIcon.TfiMobile /> {previewData.phoneNumber}
                    </span>
                  )}
                  {signatureStyle.companyWebsiteUrl &&
                    previewData.phoneNumber && <> | </>}
                  {signatureStyle.companyWebsiteUrl && (
                    <span>
                      <AiIcon.AiOutlineGlobal />{" "}
                      <a
                        href={signatureStyle.companyWebsiteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {signatureStyle.companyWebsiteUrl}
                      </a>
                    </span>
                  )}
                  {previewData.mailingAddress && (
                    <>
                      {" "}
                      <span style={BreakStyleMedium} />
                      <span>
                        <HiIcon.HiOutlineOfficeBuilding />{" "}
                        {previewData.mailingAddress}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </th>
        </tr>
        <tr>
          <th
            style={{
              verticalAlign: "top",
              textAlign: "left",
            }}
          >
            {/* Comp Logo */}
            <div>
              {isGenerateSignatureFrame ? (
                `[INSERT COMPANY_LOGO_IMG]`
              ) : (
                <div>
                  <img
                    src={signatureStyle.companyLogoUrl}
                    alt={INITIAL_SIGNATURE_STYLE.companyLogoUrl}
                    height={`${logoH}px`}
                    width="auto"
                  />
                </div>
              )}
              {isGenerateSignatureFrame && <br />}
              <div style={{ maxWidth: `${logoH * 12}px` }}>
                {isGenerateSignatureFrame
                  ? `[INSERT BADGE_IMG]`
                  : previewData.badgeUrls?.map((badge) => {
                      return (
                        <img
                          src={badge}
                          alt=""
                          height={`${logoH}px`}
                          width={`${logoH}px`}
                        />
                      );
                    })}
              </div>
              <div style={AdditionalSectionStyle}>
                {isGenerateSignatureFrame
                  ? `[INSERT CALENDAR_URL]`
                  : previewData.calendarUrl && (
                      <span>
                        <AiIcon.AiOutlineGlobal />{" "}
                        <a
                          href={previewData.calendarUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {previewData.calendarUrl}
                        </a>
                      </span>
                    )}
              </div>
            </div>
          </th>
        </tr>
      </table>
    </div>
  );
};
