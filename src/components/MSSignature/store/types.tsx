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
