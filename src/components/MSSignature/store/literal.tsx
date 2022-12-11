import * as _t from "./types";

export const INITIAL_SIGNATURE: _t.Employee = {
  employeeId: 1,
  firstName: "First",
  lastName: "Last",
  middleNameInitial: "M",
  title: "Software Engineer",
  profileUrl: "https://smoothstack.com/smoothstack-2020-logo/",
  phoneNumber: "111-222-3333",
  calendarUrl: "smoothstack.com",
  mailingAddress: "8200 Greensboro Drive, Suite 900",
  mailingAddress2: "McLean Virginia 22102",
  badgeUrls: [],
};

export const INITIAL_SIGNATURE_STYLE: _t.SignatureStyles = {
  companyLogoUrl: "https://smoothstack.com/smoothstack-2020-logo/",
  profileDefualtUrl: "https://smoothstack.com/smoothstack-2020-logo/",
  employeeName: { font: "Arial", size: 35, weight: 800, color: "#000000" },
  title: { font: "Arial", size: 16, weight: 800, color: "#000000" },
  additionalFields: { font: "Arial", size: 12, weight: 100, color: "#000000" },
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
