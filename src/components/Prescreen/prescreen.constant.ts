export enum AnswerType {
  "LABEL" = "LABEL",
  "TEXT" = "TEXT",
  "TEXTBLOCK" = "TEXTBLOCK",
  "SINGLE" = "SINGLE",
  "MULTIPLE" = "MULTIPLE",
  "DATE" = "DATE",
  "DROPDOWN" = "DROPDOWN",
  "PROJECT" = "PROJECT",
  "VIEWANDEDIT" = "VIEWANDEDIT",
}

export type dependenceField = {
  questionId: string;
  expectedAnswer?: string[];
};

export type QuestionItem = {
  question: string;
  questionId: string;
  answerType: AnswerType;
  answer?: string | string[];
  options?: AnswerItem[]; // for SINGLE/MULTIPLE
  otherAnswer?: string; // for SINGLE/MULTIPLE fields that has "Other" option
  dependenceIds?: dependenceField[]; // for fields that depend on other fields' answer to display or hide
  viewGroupIds?: string[]; // for VIEWANDEDIT to group fields and view/edit in one block
};

export type AnswerItem = {
  key: string;
  value: string;
};

export const showOnTimeOptions: AnswerItem[] = [
  { key: "Yes", value: "Yes" },
  { key: "Late", value: "Late" },
  { key: "NoShow", value: "No Show" },
];

export const relocationOptions: AnswerItem[] = [
  { key: "Yes", value: "Yes" },
  { key: "No", value: "No" },
  { key: "Undecided", value: "Undecided" },
];

export const isStudentOption: AnswerItem[] = [
  { key: "Yes", value: "Yes" },
  { key: "No", value: "No" },
];

export const expectedDegreeOptions: AnswerItem[] = [
  { key: "High School", value: "High School" },
  { key: "Associate's", value: "Associate's" },
  { key: "Bachelor's", value: "Bachelor's" },
  { key: "Master's", value: "Master's" },
  { key: "PhD", value: "PhD" },
];

export const highestDegreeOptions = [
  { key: "None", value: "None" },
  { key: "GED", value: "GED" },
  { key: "HighSchool", value: "High School" },
  { key: "Associate's", value: "Associate's" },
  { key: "Bachelor's", value: "Bachelor's" },
  { key: "Master's", value: "Master's" },
  { key: "PhD", value: "PhD" },
];

export const programmingLanguagesOptions: AnswerItem[] = [
  { key: "Java", value: "Java" },
  { key: "C", value: "C" },
  { key: "C++", value: "C++" },
  { key: "C#", value: "C#" },
  { key: "JavaScript", value: "JavaScript" },
  { key: "Python", value: "Python" },
  { key: "Ruby", value: "Ruby" },
  { key: "HTML", value: "HTML" },
  { key: "CSS", value: "CSS" },
  { key: "React", value: "React" },
  { key: "SQL", value: "SQL" },
  { key: "Other", value: "Other" },
];

export const referralOptions: AnswerItem[] = [
  { key: "Indeed", value: "Indeed" },
  { key: "Zip Recruiter", value: "Zip Recruiter" },
  { key: "Glassdoor", value: "Glassdoor" },
  { key: "LinkedIn", value: "LinkedIn" },
  { key: "Internal Referral", value: "Internal Referral" },
  { key: "Sourced by Recruiter", value: "Sourced by Recruiter" },
  { key: "Handshake", value: "Handshake" },
  { key: "Monster", value: "Monster" },
  { key: "Career Builder", value: "Career Builder" },
  { key: "Dice", value: "Dice" },
  { key: "Website", value: "Website" },
  { key: "Facebook", value: "Facebook" },
  { key: "Twitter", value: "Twitter" },
  { key: "Instagram", value: "Instagram" },
  { key: "Resume Library", value: "Resume Library" },
  { key: "Free Job Board", value: "Free Job Board" },
  { key: "Referral", value: "Referral" },
  { key: "Trilogy", value: "Trilogy" },
  { key: "Flat Iron", value: "Flat Iron" },
  { key: "APUS", value: "APUS" },
  { key: "George Mason", value: "George Mason" },
  { key: "Corporate Web Site", value: "Corporate Web Site" },
  { key: "Job Fair", value: "Job Fair" },
  { key: "Partner Resumes", value: "Partner Resumes" },
  { key: "Reddit", value: "Reddit" },
  { key: "Other", value: "Other" },
];

export const commitmentOptions: AnswerItem[] = [
  { key: "Yes", value: "Can Commit" },
  { key: "No", value: "Will be a Challenge" },
];

export const opportunityRankOptions: AnswerItem[] = [
  { key: "Top Choic", value: "Top Choice" },
  { key: "Middle Choice", value: "Middle Choice" },
  { key: "Bottom Choice", value: "Bottom Choice" },
  { key: "Last Resort", value: "Last Resort" },
];

export const workAuthorizationOptions: AnswerItem[] = [
  { key: "US Citizen", value: "US Citizen" },
  { key: "Permanent Resident", value: "Permanent Resident" },
  { key: "DACA", value: "DACA" },
  { key: "H-1B", value: "H-1B" },
  { key: "OPT/EAD", value: "OPT/EAD" },
  { key: "EAD", value: "EAD" },
  { key: "H-4/EAD", value: "H-4/EAD" },
  { key: "Other", value: "Other" },
  { key: "Not authorized", value: "Not authorized" },
];

export const clearanceStatusOptions: AnswerItem[] = [
  { key: "Potentially Eligible", value: "Potentially Eligible" },
  { key: "Submitted", value: "Submitted" },
  { key: "Provisional", value: "Provisional" },
  { key: "Public Trust", value: "Public Trust" },
  { key: "Confidential", value: "Confidential" },
  { key: "Secret", value: "Secret" },
  { key: "Top Secret", value: "Top Secret" },
  { key: "Compartmented", value: "Compartmented" },
  { key: "Expired", value: "Expired" },
  { key: "Not Eligible", value: "Not Eligible" },
];

export const isVaccinatedOptions: AnswerItem[] = [
  { key: "Boosted", value: "Boosted" },
  { key: "Full", value: "Full" },
  { key: "Partial", value: "Partial" },
  { key: "Not Vaccinated", value: "Not Vaccinated" },
  { key: "Against Vaccination", value: "Against Vaccination" },
  { key: "Undisclosed", value: "Undisclosed" },
];

export const willVaccinateOptions: AnswerItem[] = [
  { key: "Yes", value: "Yes" },
  { key: "Nono", value: "No" },
  { key: "Undisclosed", value: "Undisclosed" },
];

export const canCommitOptions: AnswerItem[] = [
  { key: "Yes", value: "Yes" },
  { key: "Nono", value: "No" },
  { key: "Undisclosed", value: "Undisclosed" },
];

export const stateOptions: AnswerItem[] = [
  { key: "Alaska", value: "AK - Alaska" },
  { key: "Alabama", value: "AL - Alabama" },
  { key: "Arkansas", value: "AR - Arkansas" },
  { key: "American Samoa", value: "AS - American Samoa" },
  { key: "Arizona", value: "AZ - Arizona" },
  { key: "California", value: "CA - California" },
  { key: "Colorado", value: "CO - Colorado" },
  { key: "Connecticut", value: "CT - Connecticut" },
  { key: "District of Columbia", value: "DC - District of Columbia" },
  { key: "Delaware", value: "DE - Delaware" },
  { key: "Florida", value: "FL - Florida" },
  { key: "Georgia", value: "GA - Georgia" },
  { key: "Guam", value: "GU - Guam" },
  { key: "Hawaii", value: "HI - Hawaii" },
  { key: "Iowa", value: "IA - Iowa" },
  { key: "Idaho", value: "ID - Idaho" },
  { key: "Illinois", value: "IL - Illinois" },
  { key: "Indiana", value: "IN - Indiana" },
  { key: "Kansas", value: "KS - Kansas" },
  { key: "Kentucky", value: "KY - Kentucky" },
  { key: "Louisiana", value: "LA - Louisiana" },
  { key: "Massachusetts", value: "MA - Massachusetts" },
  { key: "Maryland", value: "MD - Maryland" },
  { key: "Maine", value: "ME - Maine" },
  { key: "Michigan", value: "MI - Michigan" },
  { key: "Minnesota", value: "MN - Minnesota" },
  { key: "Missouri", value: "MO - Missouri" },
  { key: "Mississippi", value: "MS - Mississippi" },
  { key: "Montana", value: "MT - Montana" },
  { key: "North Carolina", value: "NC - North Carolina" },
  { key: "North Dakota", value: "ND - North Dakota" },
  { key: "Nebraska", value: "NE - Nebraska" },
  { key: "New Hampshire", value: "NH - New Hampshire" },
  { key: "New Jersey", value: "NJ - New Jersey" },
  { key: "New Mexico", value: "NM - New Mexico" },
  { key: "Nevada", value: "NV - Nevada" },
  { key: "New York", value: "NY - New York" },
  { key: "Ohio", value: "OH - Ohio" },
  { key: "Oklahoma", value: "OK - Oklahoma" },
  { key: "Oregon", value: "OR - Oregon" },
  { key: "Pennsylvania", value: "PA - Pennsylvania" },
  { key: "Puerto Rico", value: "PR - Puerto Rico" },
  { key: "Rhode Island", value: "RI - Rhode Island" },
  { key: "South Carolina", value: "SC - South Carolina" },
  { key: "South Dakota", value: "SD - South Dakota" },
  { key: "Tennessee", value: "TN - Tennessee" },
  { key: "Texas", value: "TX - Texas" },
  { key: "Utah", value: "UT - Utah" },
  { key: "Virginia", value: "VA - Virginia" },
  { key: "Virgin Islands", value: "VI - Virgin Islands" },
  { key: "Vermont", value: "VT - Vermont" },
  { key: "Washington", value: "WA - Washington" },
  { key: "Wisconsin", value: "WI - Wisconsin" },
  { key: "West Virginia", value: "WV - West Virginia" },
  { key: "Wyoming", value: "WY - Wyoming" },
];

export const communicationSkillsOptions: AnswerItem[] = [
  { key: "0", value: "Poor" },
  { key: "1", value: "Satisfactory" },
  { key: "2", value: "Good" },
  { key: "3", value: "Excellent" },
];

export const candidateRankOptions: AnswerItem[] = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
  { key: "3", value: "3" },
  { key: "4", value: "4" },
  { key: "5", value: "5" },
  { key: "6", value: "6" },
  { key: "7", value: "7" },
  { key: "8", value: "8" },
  { key: "9", value: "9" },
  { key: "10", value: "10" },
];

export const resultOptions: AnswerItem[] = [
  { key: "Pass", value: "Pass" },
  { key: "Snooze-Timing", value: "Snooze-Timing" },
  { key: "Snooze-Education", value: "Snooze-Education" },
  { key: "Reject-Prescreen No Show", value: "Reject-Prescreen No Show" },
  { key: "Reject-Education", value: "Reject-Education" },
  { key: "Reject-Work Authorization", value: "Reject-Work Authorization" },
  { key: "Reject-Relocation", value: "Reject-Relocation" },
  { key: "Reject-Compensation", value: "Reject-Compensation" },
  { key: "Reject-Contract", value: "Reject-Contract" },
  { key: "Reject-Not Interested", value: "Reject-Not Interested" },
  { key: "Reject-Not a Fit", value: "Reject-Not a Fit" },
  { key: "Reject-Soft Skills", value: "Reject-Soft Skills" },
  { key: "Reject-Non Committal", value: "Reject-Non Committal" },
  { key: "Reject-Prescreen no show", value: "Reject-Prescreen no show" },
  { key: "Reject-Years of Experience", value: "Reject-Years of Experience" },
  { key: "Reject-Vaccination", value: "Reject-Vaccination" },
];

//
export const allPrescreenFields: string[] = [];

export const prescreenQuestionOrder: string[] = [
  // "showOnTime",
  "relocation",
  "aboutYourself",
  "otherApplications",
  "isStudent",
  "expectedDegree",
  "expectedGraduationDate",
  "highestDegree",
  "graduationDate",
  "projects",
  "programmingLanguages",
  "goodFit",
  "referral",
  "commitment",
  "abilityToLearn",
  "challengingSituation",
  "opportunityRank",
  "workAuthorization",
  "backgroundCheck",
  "clearanceStatus",
  "drugScreen",
  "isVaccinated",
  "willVaccinate",
  "vaccinationNotes",
  "githubLink",
  "linkedinLink",
  "canCommit",
  "nameAndAddress",
  "questions",
  "referFriend",
  "communicationSkills",
  "candidateRank",
  "result",
  "additionalNotes",
];

const graduactionDateDependence: dependenceField = {
  questionId: "highestDegree",
  expectedAnswer: [
    "HighSchool",
    "Associate's",
    "Bachelor's",
    "Master's",
    "PhD",
  ],
};

export const prescreenFieldQuestions: Map<string, QuestionItem> = new Map([
  [
    "firstName",
    {
      questionId: "firstName",
      question: "First Name",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "lastName",
    {
      questionId: "lastName",
      question: "Last Name",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "nickName",
    {
      questionId: "nickName",
      question: "Nick Name",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "candidateEmail",
    {
      questionId: "candidateEmail",
      question: "Candidate Email",
      answerType: AnswerType.LABEL,
    },
  ],
  [
    "showOnTime",
    {
      questionId: "showOnTime",
      question: "Did candidate show up for prescreen on time?",
      options: showOnTimeOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "relocation",
    {
      questionId: "relocation", //"newRelocation",
      question:
        "Will you be willing to relocate for this opportunity if necessary?",
      options: relocationOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "aboutYourself",
    {
      questionId: "aboutYourself",
      question:
        "Tell me about yourself and what influenced you to pursue a career in IT.",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "otherApplications",
    {
      questionId: "otherApplications",
      question:
        "Where else have you applied & what roadblocks, if any, have you been experiencing?",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "isStudent",
    {
      questionId: "isStudent",
      question: "Are you currently a student?",
      options: isStudentOption,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "expectedDegree",
    {
      questionId: "expectedDegree",
      question: "What degree are you pursuing?",
      options: expectedDegreeOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [{ questionId: "isStudent", expectedAnswer: ["Yes"] }],
    },
  ],
  [
    "expectedGraduationDate",
    {
      questionId: "expectedGraduationDate",
      question: "What is your expected graduation date?",
      answerType: AnswerType.DATE,
      dependenceIds: [
        { questionId: "isStudent", expectedAnswer: ["Yes"] },
        { questionId: "expectedDegree" },
      ],
    },
  ],
  [
    "highestDegree",
    {
      questionId: "highestDegree",
      question: "What is your highest level of education?",
      options: highestDegreeOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [{ questionId: "isStudent", expectedAnswer: ["No"] }],
    },
  ],
  [
    "graduationDate",
    {
      questionId: "graduationDate",
      question: "What was your Graduation Date?",
      answerType: AnswerType.DATE,
      dependenceIds: [
        { questionId: "isStudent", expectedAnswer: ["No"] },
        graduactionDateDependence,
      ],
    },
  ],
  [
    "projects",
    {
      questionId: "projects",
      question:
        "Any internships? Personal projects? School related projects? Boot Camps? Professional experience (Note: included date ranges)",
      answerType: AnswerType.PROJECT,
    },
  ],
  [
    "monthsOfProjectExperience",
    {
      questionId: "monthsOfProjectExperience",
      question:
        "Recruiter: # of Months of Experience (Recruiter will determine this based on previous answer)",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "programmingLanguages",
    {
      questionId: "programmingLanguages",
      question:
        "What is your strongest object oriented language? What programming languages do you feel the most comfortable with? ",
      options: programmingLanguagesOptions,
      answerType: AnswerType.MULTIPLE,
    },
  ],
  [
    "goodFit",
    {
      questionId: "goodFit",
      question: "Why do you feel like you would be a good fit for Smoothstack?",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "referral",
    {
      questionId: "referral",
      question: "How did you hear about us?",
      options: referralOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "commitment",
    {
      questionId: "commitment",
      question:
        "Our internal training program is pretty intense. If selected, you are going to learn a lot in a short amount of time. Is this something that you feel like you can commit to or will this be a challenge for you?",
      options: commitmentOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "abilityToLearn",
    {
      questionId: "abilityToLearn",
      question:
        "Can you give me an example of time when you had to learn a lot in a short period of time?",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "challengingSituation",
    {
      questionId: "challengingSituation",
      question:
        "Tell me about a challenging situation that you have found yourself in?",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "opportunityRank",
    {
      questionId: "opportunityRank",
      question:
        "Where does Smoothstack rate compared to other companies that you are interested in?",
      options: opportunityRankOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "workAuthorization",
    {
      questionId: "workAuthorization",
      question:
        "Are you authorized to work in the US for any employer? Do you require sponsorship now or in the future? ",
      options: workAuthorizationOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "backgroundCheck",
    {
      questionId: "backgroundCheck",
      question: "Do you have any concerns about passing a background check?",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "clearanceStatus",
    {
      questionId: "clearanceStatus",
      question:
        "In the event that our client requires a security clearance, is there anything that would prevent you from obtaining one?",
      options: clearanceStatusOptions,
      answerType: AnswerType.MULTIPLE,
    },
  ],
  [
    "drugScreen",
    {
      questionId: "drugScreen",
      question:
        "Our clients require drug screening, do you have any concerns passing a drug screen even if certain drugs are legal in your state?",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "isVaccinated",
    {
      questionId: "isVaccinated",
      question: "Are you currently vaccinated?",
      options: isVaccinatedOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "willVaccinate",
    {
      questionId: "willVaccinate",
      question: "Will you get vaccinated?",
      options: willVaccinateOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [{ questionId: "isVaccinated", expectedAnswer: ["No"] }],
    },
  ],
  [
    "vaccinationNotes",
    {
      questionId: "vaccinationNotes",
      question: "Vaccination Notes",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "githubLink",
    {
      questionId: "githubLink",
      question: "GitHub Link",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "linkedinLink",
    {
      questionId: "linkedinLink",
      question: "LinkedIn Link",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "canCommit",
    {
      questionId: "canCommit",
      question:
        "To clarify the opportunity, this is a (2) year commitment. We invest a lot of time and money into our new-hires so that our employees may gain valuable on-the-job work experience working on real projects with real clients. Are you prepared to commit to 2 years as an investment in your future?",
      options: canCommitOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "nameAndAddress",
    {
      questionId: "nameAndAddress",
      question: "Name and Address Verification",
      answerType: AnswerType.VIEWANDEDIT,
      viewGroupIds: [
        "firstName",
        "lastName",
        "nickName",
        "address1",
        "address2",
        "city",
        "state",
        "zip",
        "county",
      ],
    },
  ],
  [
    "address1",
    {
      questionId: "address1",
      question: "Address Line 1",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "address2",
    {
      questionId: "address2",
      question: "Address Line 2 (Optional)",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "city",
    {
      questionId: "city",
      question: "City",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "state",
    {
      questionId: "state",
      question: "State",
      options: stateOptions,
      answerType: AnswerType.DROPDOWN,
    },
  ],
  [
    "zip",
    {
      questionId: "zip",
      question: "Zip Code",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "county",
    {
      questionId: "county",
      question: "What county do you live in?",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "questions",
    {
      questionId: "questions",
      question:
        "Do you have any outstanding questions regarding this opportunity that I may help clarify?",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
  [
    "referFriend",
    {
      questionId: "referFriend",
      question:
        "Is there anyone you can think of that would be a good fit for this program?",
      answerType: AnswerType.TEXT,
    },
  ],
  [
    "communicationSkills",
    {
      questionId: "communicationSkills",
      question: "Recruiter: Please rank candidates communication skills.",
      options: communicationSkillsOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "candidateRank",
    {
      questionId: "candidateRank",
      question: " Rank Candidate from a scale of 1-10.",
      options: candidateRankOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "result",
    {
      questionId: "result",
      question: "Recruiter: Please select pre-screen result below.",
      options: resultOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "additionalNotes",
    {
      questionId: "additionalNotes",
      question:
        "Recruiter: Please include any additional notes that you feel may be useful.",
      answerType: AnswerType.TEXTBLOCK,
    },
  ],
]);
