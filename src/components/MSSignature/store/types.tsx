export type Signature = {
  primaryEmail: string;
  firstName: string;
  lastName: string;
  middleNameInitial?: string;
  title: string;
  phoneNumber: string;
  profileUrl?: string;
  mailingAddress?: string;
  mailingAddress2?: string;
  calendarUrl?: string;
  badgeUrls?: string[];
};

// From Microsoft
export type EmployeeData = {
  mail: string;
  givenName: string;
  surname: string;
  jobTitle: string;
  mobilePhone: string;
};

export type SignatureStyleFields =
  | "employeeName"
  | "title"
  | "additionalFields";

export type SignatureStyles = {
  companyLogoUrl: string;
  profileDefualtUrl: string;
  profileSize: number;
  badgeSize: number;
  companyLogoSize: number;
  employeeName: Styles;
  title: Styles;
  additionalFields: Styles;
};

export type Styles = {
  font: string;
  size: number;
  weight: string; // bold or normal
  color: string;
  italic?: boolean;
};

export type Update = {
  key: string;
  value: any;
};
