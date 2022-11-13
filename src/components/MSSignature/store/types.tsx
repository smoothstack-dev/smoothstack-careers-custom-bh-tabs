export type Signature = {
  employeeId: number;
  employeeName: string;
  title: string;
  additionalFields: AdditionalField[];
  socials: Social[];
};

export type SocialId =
  | "linkedin"
  | "youtube"
  | "instagram"
  | "twitter"
  | "facebook";

export type FieldId = "website" | "phone" | "address" | "mobile";

export type Icons = SocialId | FieldId;

export type Social = {
  id: SocialId;
  socialTitle: string;
  socialLink: string;
};

export type AdditionalField = {
  id: FieldId;
  fieldName: string;
  fieldValue: string;
};

export type SignatureStyles = {
  employeeName: Styles;
  title: Styles;
  additionalFields: Styles;
  socials: Styles;
};

export type Styles = {
  size: number;
  weight: number;
  color: string;
};

export type Update = {
  key: string;
  value: any;
};
