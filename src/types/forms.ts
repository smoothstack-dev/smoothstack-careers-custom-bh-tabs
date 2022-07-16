export enum FORM_TYPE {
  PRESCREEN = "PRESCREEN",
  TECHSCREEN = "TECHSCREEN",
}

export const FORM = {
  PRESCREEN: {
    type: "prescreen",
  },
  TECHSCREEN: {
    type: "techscreen",
  },
};

export interface FormSNSMsg {
  type: FORM_TYPE;
  formData: PrescreenForm | TechScreenForm;
}

export interface FormEntry {
  question: string;
  answer: string;
}

export interface PrescreenForm {
  candidateName: FormEntry;
  candidateEmail: FormEntry;
  relocation: FormEntry;
  newRelocation: FormEntry;
  aboutYourself: FormEntry;
  otherApplications: FormEntry;
  expectedDegree: FormEntry;
  expectedGraduationDate: FormEntry;
  highestDegree: FormEntry;
  graduationDate: FormEntry;
  projects: FormEntry;
  monthsOfExperience: FormEntry;
  programmingLanguages: FormEntry;
  goodFit: FormEntry;
  referral: FormEntry;
  commitment: FormEntry;
  abilityToLearn: FormEntry;
  challengingSituation: FormEntry;
  opportunityRank: FormEntry;
  workAuthorization: FormEntry;
  backgroundCheck: FormEntry;
  githubLink: FormEntry;
  linkedinLink: FormEntry;
  canCommit: FormEntry;
  questions: FormEntry;
  communicationSkills: FormEntry;
  result: FormEntry;
  additionalNotes: FormEntry;
  isVaccinated: FormEntry;
  willVaccinate: FormEntry;
  vaccinationNotes: FormEntry;
  county: FormEntry;
  address1: FormEntry;
  address2: FormEntry;
  city: FormEntry;
  state: FormEntry;
  zip: FormEntry;
}

export interface TechScreenForm {
  respondentEmail: FormEntry;
  submissionId: FormEntry;
  githubLink: FormEntry;
  onTime: FormEntry;
  dressedProfessionally: FormEntry;
  technicalQuestions: FormEntry[];
  behavioralQuestions: FormEntry[];
  projectQuestions: FormEntry[];
  screenerRecommendation: FormEntry;
  communicationSkills: FormEntry;
}
