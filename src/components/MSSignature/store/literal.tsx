import * as _t from "./types";

export const INITIAL_SIGNATURE: _t.Signature = {
  photo: undefined,
  employeeId: 1,
  employeeName: "Derek Chou",
  title: "Software Engineer",
  profileUrl: "https://smoothstack.com/smoothstack-2020-logo/",
  companyLogoUrl: "https://smoothstack.com/smoothstack-2020-logo/",
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
  employeeName: { font: "Arial", size: 80, weight: 80, color: "#000000" },
  title: { font: "Arial", size: 40, weight: 50, color: "#000000" },
  additionalFields: { font: "Arial", size: 20, weight: 30, color: "#000000" },
  socials: { font: "Arial", size: 20, weight: 30, color: "#000000" },
};

export const SIZE_RANGE = {
  size: { min: 12, max: 28 },
  weight: { min: 300, max: 900 },
};

export const FontList: _t.Font[] = [
  "Arial",
  "Verdana",
  "Poppins",
  "Trebuchet MS",
  "Georgia",
  "Palatino",
  "Lucida Sans",
  "Times New Roman",
  "Courier New",
];
