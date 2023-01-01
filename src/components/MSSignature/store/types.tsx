export type Signature = {
  isActive: boolean;
  primaryEmail: string;
  firstName: string;
  lastName: string;
  middleNameInitial?: string;
  title: string;
  phoneNumber: string;
  profileUrl?: string;
  teamsProfileUrl?: string;
  mailingAddress?: string;
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
  | "employeeFirstName"
  | "employeeLastName"
  | "title"
  | "additionalFields";

export type SignatureStyles = {
  companyLogoUrl: string;
  profileDefaultUrl: string;
  profileSize: number;
  badgeSize: number;
  companyLogoSize: number;
  employeeFirstName: Styles;
  employeeLastName: Styles;
  title: Styles;
  additionalFields: Styles;
  sections?: HtmlSection;
};

export interface HtmlSection {
  signatureLayout: string;
  profileImageSection: string;
  phoneNumberSection: string;
  calendarSection: string;
  addressSection: string;
  companyLogoSection: string;
  badgeSection: string;
}

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
