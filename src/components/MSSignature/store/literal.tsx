import * as _t from "./types";

export const INITIAL_SIGNATURE: _t.Employee = {
  employeeId: 1,
  firstName: "Firstname",
  lastName: "Lastname",
  middleNameInitial: "M",
  title: "Software Engineer",
  profileUrl:
    "https://smoothstack.com/wp-content/uploads/2018/07/cropped-favicon.png",
  phoneNumber: "111-222-3333",
  calendarUrl: "smoothstack.com",
  mailingAddress: "8200 Greensboro Drive, Suite 900",
  mailingAddress2: "McLean Virginia 22102",
  badgeUrls: [
    "https://storage.googleapis.com/minted-nfts/smoothstack/memberships/images/0.png",
    "https://storage.googleapis.com/minted-nfts/smoothstack/skills/images/0.png",
    "https://storage.googleapis.com/minted-nfts/smoothstack/avatars/images/1.png",
  ],
};

export const INITIAL_SIGNATURE_STYLE: _t.SignatureStyles = {
  companyLogoUrl: "https://smoothstack.com/smoothstack-2020-logo/",
  profileDefualtUrl:
    "https://smoothstack.com/wp-content/uploads/2018/07/cropped-favicon.png",
  profileSize: 175,
  badgeSize: 25,
  companyLogoSize: 25,
  employeeName: { font: "Arial", size: 31, weight: "bold", color: "#000000" },
  title: { font: "Arial", size: 16, weight: "bold", color: "#000000" },
  additionalFields: {
    font: "Arial",
    size: 12,
    weight: "normal",
    color: "#000000",
  },
};

export const INITIAL_EMPLOYEES: _t.Employee[] = [
  INITIAL_SIGNATURE,
  {
    employeeId: 2,
    firstName: "Test",
    lastName: "Test",
    title: "Java Developer",
    profileUrl: "https://smoothstack.com/smoothstack-2020-logo/",
    phoneNumber: "111-222-3333",
    calendarUrl: "smoothstack.com",
    badgeUrls: [],
  },
];

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
