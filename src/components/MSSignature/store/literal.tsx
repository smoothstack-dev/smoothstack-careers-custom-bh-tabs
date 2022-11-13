import * as _t from "./types";

export const INITIAL_SIGNATURE: _t.Signature = {
  employeeId: 1,
  employeeName: "Derek Chou",
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
  employeeName: { size: 18, weight: 500, color: "black" },
  title: { size: 18, weight: 500, color: "black" },
  additionalFields: { size: 18, weight: 500, color: "black" },
  socials: { size: 18, weight: 500, color: "black" },
};
