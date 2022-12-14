import React from "react";
import * as _t from "./store/types";
import * as TfiIcon from "react-icons/tfi";
import * as HiIcon from "react-icons/hi";
import * as AiIcon from "react-icons/ai";

export const Preview: React.FC<{
  data: _t.Signature;
  signatureStyle: _t.SignatureStyles;
  isGenerateSignatureFrame?: boolean;
}> = ({ data: previewData, signatureStyle, isGenerateSignatureFrame }) => {
  const CardContainerStyle = {
    display: "flex",
    border: "0.1px",
    backgroundColor: "white",
    borderRadius: "1%",
    padding: "10px",
    width: "600px",
    height: "200px",
  };

  const NameSectionStyle = {
    color: signatureStyle.employeeName.color,
    fontSize: `${signatureStyle.employeeName.size}px`,
    fontWeight: signatureStyle.employeeName.weight,
    fontFamily: signatureStyle.employeeName.font,
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

  const employeeName = `${previewData.firstName} ${
    previewData.middleNameInitial ? previewData.middleNameInitial + ". " : ""
  }
  ${previewData.lastName}`;

  return (
    <div style={CardContainerStyle}>
      <table
        style={{
          height: "175px",
        }}
      >
        <tr>
          <th rowSpan={4}>
            <div
              style={{
                height: "175px",
                maxWidth: "175px",
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
                    previewData.profileUrl ?? signatureStyle.profileDefualtUrl
                  }
                  style={{
                    display: "block",
                    height: "175px",
                    width: "auto",
                  }}
                />
              )}
            </div>
          </th>
        </tr>
        <tr>
          <th style={{ verticalAlign: "top" }}>
            {" "}
            {/* Name and Title */}
            <span style={NameSectionStyle}>
              {" "}
              {isGenerateSignatureFrame
                ? `[INSERT EMPLOYEE_NAME]`
                : employeeName}
            </span>
            <span style={BreakStyleSmall} />
            <span style={TitleSectionStyle}>
              {isGenerateSignatureFrame
                ? `[INSERT EMPLOYEE_TITLE]`
                : previewData.title}
            </span>
          </th>
        </tr>
        <tr>
          <th style={{ verticalAlign: "top", height: "50px" }}>
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
                  {previewData.calendarUrl && previewData.phoneNumber && (
                    <> | </>
                  )}
                  {previewData.calendarUrl && (
                    <span>
                      <AiIcon.AiOutlineGlobal />{" "}
                      <a href={previewData.calendarUrl} target="_blank">
                        {previewData.calendarUrl}
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
                      <span style={BreakStyleMedium} />
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {previewData.mailingAddress2}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </th>
        </tr>
        <tr>
          <th>
            {/* Comp Logo */}
            <div>
              {isGenerateSignatureFrame ? (
                `[INSERT COMPANY_LOGO_IMG]`
              ) : (
                <img
                  src={signatureStyle.companyLogoUrl}
                  style={{
                    height: "25px",
                    width: "auto",
                  }}
                />
              )}
            </div>
            <div>
              {isGenerateSignatureFrame
                ? `[INSERT BADGE_IMG]`
                : previewData.badgeUrls?.map((badge) => {
                    return (
                      <img
                        src={badge}
                        style={{
                          height: "25px",
                          width: "25px",
                        }}
                      />
                    );
                  })}
            </div>
          </th>
        </tr>
      </table>
    </div>
  );
};
