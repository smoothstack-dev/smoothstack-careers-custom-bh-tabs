import React from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import useSignatureStyle from "./store/signatureStyle";
import * as _t from "./store/types";
import * as TfiIcon from "react-icons/tfi";
import * as HiIcon from "react-icons/hi";
import * as AiIcon from "react-icons/ai";

export const Preview: React.FC<{ data: _t.Employee }> = ({ data }) => {
  const { signatureStyle } = useSignatureStyle();

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

  const employeeName = `${data.firstName} ${
    data.middleNameInitial ? data.middleNameInitial + ". " : ""
  }
  ${data.lastName}`;

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
                src={data.profileUrl ?? signatureStyle.profileDefualtUrl}
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
          <th>
            {" "}
            {/* Name and Title */}
            <span style={NameSectionStyle}>{employeeName}</span>
            <span style={BreakStyleSmall} />
            <span style={TitleSectionStyle}>{data.title}</span>
          </th>
        </tr>
        <tr>
          <th>
            {/* Additional Fields */}
            <div style={AdditionalSectionStyle}>
              <>
                {data.calendarUrl && (
                  <span>
                    <TfiIcon.TfiMobile /> {data.phoneNumber}
                  </span>
                )}
                {data.calendarUrl && data.phoneNumber && <> | </>}
                {data.calendarUrl && (
                  <span>
                    <AiIcon.AiOutlineGlobal />{" "}
                    <a href={data.calendarUrl} target="_blank">
                      {data.calendarUrl}
                    </a>
                  </span>
                )}
                <span style={BreakStyleMedium} />
              </>
              {data.mailingAddress && (
                <>
                  {" "}
                  <span>
                    <HiIcon.HiOutlineOfficeBuilding /> {data.mailingAddress}
                  </span>
                  <span style={BreakStyleMedium} />
                  <span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.mailingAddress2}
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
              {data.badgeUrls?.map((badge) => {
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
