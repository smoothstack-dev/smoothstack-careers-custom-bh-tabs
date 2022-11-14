import * as _t from "./types";

export const INITIAL_SIGNATURE: _t.Signature = {
  photo: undefined,
  employeeId: 1,
  employeeName: "Derek Chou",
  company: "Smoothstack",
  title: "Software Engineer",
  additionalFields: [
    { id: "phone", fieldName: "Phone", fieldValue: "1112223333" },
    { id: "website", fieldName: "Website", fieldValue: "" },
    { id: "address", fieldName: "Address", fieldValue: "" },
  ],
  socials: [
    { id: "facebook", socialTitle: "Facebook", socialLink: "" },
    { id: "linkedin", socialTitle: "LinkedIn", socialLink: "" },
    { id: "youtube", socialTitle: "Youtube", socialLink: "" },
    { id: "instagram", socialTitle: "Instagram", socialLink: "" },
  ],
};

export const INITIAL_SIGNATURE_STYLE: _t.SignatureStyles = {
  employeeName: { size: 80, weight: 80, color: "#000000" },
  title: { size: 40, weight: 50, color: "#000000" },
  additionalFields: { size: 20, weight: 30, color: "#000000" },
  socials: { size: 20, weight: 30, color: "#000000" },
};

export const SIZE_RANGE = {
  size: { min: 12, max: 28 },
  weight: { min: 300, max: 900 },
};
