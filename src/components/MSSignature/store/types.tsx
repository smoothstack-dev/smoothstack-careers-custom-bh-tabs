export type Signature = {
  isActive: boolean;
  displayMailingAddress?: boolean;
  displayCustomAddress?: boolean;
  customAddress?: string;
  primaryEmail: string;
  firstName: string;
  lastName: string;
  middleNameInitial?: string;
  title: string;
  displayPhoneNumber?: boolean;
  phoneNumber: string;
  displayTextPhoneNumber?: boolean;
  textPhoneNumber?: string;
  displayLandlinePhoneNumber?: boolean;
  landlinePhoneNumber?: string;
  avatarUrl?: string;
  defaultAvatar?: string;
  uploadedProfileUrl?: string;
  profileUrl?: string;
  teamsProfileUrl?: string;
  calendarUrlLabel?: string;
  calendarUrl?: string;
  badgeUrls?: Badge[];
  mintedBadgeUrls?: Badge[];
  note?: string;
  primaryStatus?: string;
  trainPlaceTotalHours?: number;
  isMoveLinkToTop?: boolean;
  signatureProfileImage?: string;
};

// From Microsoft
export type EmployeeData = {
  displayName?: string;
  mail: string;
  givenName: string;
  surname: string;
  jobTitle: string;
  mobilePhone: string;
  primaryStatus?: string;
  trainPlaceTotalHours?: number;
};

export type Badge = {
  url: string;
  isActive: boolean;
};

export type SignatureStyleFields =
  | "employeeFirstName"
  | "employeeLastName"
  | "title"
  | "additionalFields";

export type SignatureStyles = {
  companyLogoUrl: string;
  companyWebsiteUrlLabel: string;
  companyWebsiteUrl: string;
  profileDefaultUrl?: string;
  profileSize: number;
  mailingAddress: string;
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
