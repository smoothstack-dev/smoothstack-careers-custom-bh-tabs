import React, { useEffect } from "react";
import useSignatureStyle from "./store/signatureStyle";
import * as _t from "./store/types";
import * as TfiIcon from "react-icons/tfi";
import * as HiIcon from "react-icons/hi";
import * as AiIcon from "react-icons/ai";
import useSignature from "./store/signature";

export const Preview: React.FC<{ data?: _t.Signature }> = ({ data }) => {
  const { signatureStyle } = useSignatureStyle();
  const { signature } = useSignature();
  const previewData = data ?? signature;

  const CardContainerStyle = {
    display: "flex",
    border: "0.1px",
    "background-color": "white",
    "border-radius": "1%",
    padding: "10px",
    width: "600px",
    height: "200px",
  };

  const NameSectionStyle = {
    color: signatureStyle.employeeName.color,
    "font-size": `${signatureStyle.employeeName.size}px`,
    "font-weight": signatureStyle.employeeName.weight,
    "font-family": signatureStyle.employeeName.font,
  };

  const TitleSectionStyle = {
    color: signatureStyle.title.color,
    "font-size": `${signatureStyle.title.size}px`,
    "font-weight": signatureStyle.title.weight,
    "font-family": signatureStyle.title.font,
  };

  const AdditionalSectionStyle = {
    color: signatureStyle.additionalFields.color,
    "font-size": `${signatureStyle.additionalFields.size}px`,
    "font-weight": signatureStyle.additionalFields.weight,
    "font-family": signatureStyle.additionalFields.font,
  };

  const BreakStyleSmall = {
    display: "block",
    "margin-bottom": "-.8em",
  };

  const BreakStyleMedium = {
    display: "block",
    "margin-bottom": "0em",
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
              <img
                src={previewData.profileUrl ?? signatureStyle.profileDefualtUrl}
                style={{
                  display: "block",
                  height: "175px",
                  width: "auto",
                }}
              />
            </div>
          </th>
        </tr>
        <tr>
          <th style={{ verticalAlign: "top" }}>
            {" "}
            {/* Name and Title */}
            <span style={NameSectionStyle}>{employeeName}</span>
            <span style={BreakStyleSmall} />
            <span style={TitleSectionStyle}>{previewData.title}</span>
          </th>
        </tr>
        <tr>
          <th style={{ verticalAlign: "top", height: "50px" }}>
            {/* Additional Fields */}
            <div style={AdditionalSectionStyle}>
              <>
                {previewData.phoneNumber && (
                  <span>
                    <TfiIcon.TfiMobile /> {previewData.phoneNumber}
                  </span>
                )}
                {previewData.calendarUrl && previewData.phoneNumber && <> | </>}
                {previewData.calendarUrl && (
                  <span>
                    <AiIcon.AiOutlineGlobal />{" "}
                    <a href={previewData.calendarUrl} target="_blank">
                      {previewData.calendarUrl}
                    </a>
                  </span>
                )}
                <span style={BreakStyleMedium} />
              </>
              {previewData.mailingAddress && (
                <>
                  {" "}
                  <span>
                    <HiIcon.HiOutlineOfficeBuilding />{" "}
                    {previewData.mailingAddress}
                  </span>
                  <span style={BreakStyleMedium} />
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{previewData.mailingAddress2}
                  </span>
                </>
              )}
            </div>
          </th>
        </tr>
        <tr>
          <th>
            {/* Comp Logo */}
            <div>
              <img
                src={signatureStyle.companyLogoUrl}
                style={{
                  height: "25px",
                  width: "auto",
                }}
              />
            </div>
            <div>
              {previewData.badgeUrls?.map((badge) => {
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
