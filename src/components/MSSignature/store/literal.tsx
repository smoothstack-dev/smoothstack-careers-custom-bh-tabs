import * as _t from "./types";

export const PROFILE_IMAGE_S3_URL = "https://dwkfogbh8lfl9.cloudfront.net/";

export const MOCK_SIGNATURE: _t.Signature = {
  isActive: true,
  primaryEmail: "defaultemail@smoothstack.com",
  firstName: "Firstname",
  lastName: "Lastname",
  middleNameInitial: "M",
  title: "Software Engineer",
  displayMailingAddress: true,
  profileUrl:
    "https://smoothstack.com/wp-content/uploads/2023/01/image-placeholder.png",
  phoneNumber: "123-456-7890",
  calendarUrlLabel: "Calendar Link",
  calendarUrl: "https://calender.link",
  badgeUrls: [
    "https://storage.googleapis.com/minted-nfts/smoothstack/memberships/images/0.png",
    "https://storage.googleapis.com/minted-nfts/smoothstack/skills/images/0.png",
    "https://storage.googleapis.com/minted-nfts/smoothstack/avatars/images/1.png",
  ],
};

export const INITIAL_SIGNATURE_STYLE: _t.SignatureStyles = {
  companyLogoUrl: "https://smoothstack.com/smoothstack-2020-logo/",
  companyWebsiteUrlLabel: "smoothstack.com",
  companyWebsiteUrl: "https://smoothstack.com",
  profileDefaultUrl:
    "https://smoothstack.com/wp-content/uploads/2018/07/cropped-favicon.png",
  mailingAddress: "8200 Greensboro Drive, Suite 900 McLean Virginia 22102",
  profileSize: 175,
  badgeSize: 23,
  companyLogoSize: 23,
  employeeFirstName: {
    font: "Arial",
    size: 16,
    weight: "bold",
    color: "#7521a7",
  },
  employeeLastName: {
    font: "Arial",
    size: 16,
    weight: "bold",
    color: "#3246dd",
  },
  title: { font: "Arial", size: 12, weight: "bold", color: "#000000" },
  additionalFields: {
    font: "Arial",
    size: 12,
    weight: "normal",
    color: "#000000",
  },
};

const cardH = 150;
export const SIGNATURE_IMAGE_CONFIG = {
  cardW: cardH * 3,
  cardH: cardH,
  picH: Math.round(cardH * 0.75),
  logoH: Math.round(cardH * 0.13),
};

export const FontList: string[] = [
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
