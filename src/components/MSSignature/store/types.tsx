export type Employee = {
  employeeId: number;
  firstName: string;
  lastName: string;
  middleNameInitial?: string;
  title: string;
  profileUrl: string;
  phoneNumber: string;
  mailingAddress?: string;
  mailingAddress2?: string;
  calendarUrl?: string;
  badgeUrls?: string[];
};

export type SignatureStyleFields =
  | "employeeName"
  | "title"
  | "additionalFields";

export type SignatureStyles = {
  companyLogoUrl: string;
  profileDefualtUrl: string;
  employeeName: Styles;
  title: Styles;
  additionalFields: Styles;
};

export type Styles = {
  font: string;
  size: number;
  weight: number;
  color: string;
};

export type Update = {
  key: string;
  value: any;
};
