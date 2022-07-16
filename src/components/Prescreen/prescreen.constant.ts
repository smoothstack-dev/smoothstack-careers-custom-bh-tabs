export enum AnswerType {
  "LABEL" = "LABEL",
  "TEXT" = "TEXT",
  "TEXTBLOCK" = "TEXTBLOCK",
  "SINGLE" = "SINGLE",
  "MULTIPLE" = "MULTIPLE",
  "DATE" = "DATE",
  "DROPDOWN" = "DROPDOWN",
}

export type dependenceField = {
  questionId: string;
  expectedAnswer?: string[];
};

export type QuestionItem = {
  question: string;
  options?: AnswerItem[];
  questionId: string;
  answer?: string | string[];
  answerType: AnswerType;
  dependenceIds?: dependenceField[];
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

export const newRelocationOptions: AnswerItem[] = [
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

export const monthsOfExperienceOptions: AnswerItem[] = [
  { key: "<20", value: "<20" },
  { key: ">=20", value: ">=20" },
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

export const isVaccinatedOptions: AnswerItem[] = [
  { key: "booster", value: "Booster" },
  { key: "full", value: "Full" },
  { key: "partial", value: "Partial" },
  { key: "no", value: "No" },
  { key: "undisclosed", value: "Undisclosed" },
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
  { key: "0", value: "0-Poor" },
  { key: "1", value: "1-Satisfactory" },
  { key: "2", value: "2-Good" },
  { key: "3", value: "3-Excellent" },
];

export const resultOptions: AnswerItem[] = [
  { key: "Pass", value: "Pass" },
  { key: "Snooze-Timing", value: "Snooze-Timing" },
  { key: "Snooze-Education", value: "Snooze-Education" },
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

// Only show as lable - not changable
export const prescreenLabelOrder: string[] = [
  "candidateName",
  "candidateEmail",
  "relocation",
];

export const prescreenQuestionOrder: string[] = [
  "showOnTime",
  "newRelocation",
  "aboutYourself",
  "otherApplications",
  "isStudent",
  "expectedDegree",
  "expectedGraduationDate",
  "highestDegree",
  "graduationDate",
  "projects",
  "monthsOfExperience",
  "programmingLanguages",
  "goodFit",
  "referral",
  "commitment",
  "abilityToLearn",
  "challengingSituation",
  "opportunityRank",
  "workAuthorization",
  "backgroundCheck",
  "drugScreen",
  "isVaccinated",
  "willVaccinate",
  "vaccinationNotes",
  "githubLink",
  "linkedinLink",
  "canCommit",
  "address1",
  "address2",
  "city",
  "state",
  "zip",
  "county",
  "questions",
  "referFriend",
  "communicationSkills",
  "result",
  "additionalNotes",
];

const showOnTimeDependence: dependenceField = {
  questionId: "showOnTime",
  expectedAnswer: ["Yes", "Late"],
};

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
    "candidateName",
    {
      questionId: "candidateName",
      question: "Candidate Name",
      answerType: AnswerType.LABEL,
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
    "relocation",
    {
      questionId: "relocation",
      question: "Willingness to Relocate from the application",
      answerType: AnswerType.LABEL,
    },
  ],
  [
    "showOnTime",
    {
      questionId: "showOnTime",
      question: "Does candidate show up for prescreen on time?",
      options: showOnTimeOptions,
      answerType: AnswerType.SINGLE,
    },
  ],
  [
    "newRelocation",
    {
      questionId: "newRelocation",
      question:
        "To get to this point in the interview process, you have previously indicated your willingness to relocate. Once things open up, post COVID, our clients will expect our employees to be back on the client site. Are you actually prepared to relocate?",
      options: newRelocationOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "aboutYourself",
    {
      questionId: "aboutYourself",
      question:
        "Tell me about yourself and what influenced you to pursue a career in IT.",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "otherApplications",
    {
      questionId: "otherApplications",
      question:
        "Where else have you applied & what roadblocks, if any, have you been experiencing?",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "isStudent",
    {
      questionId: "isStudent",
      question: "Are you currently a student?",
      options: isStudentOption,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "expectedDegree",
    {
      questionId: "expectedDegree",
      question: "If you are currently a student, what degree are you pursuing?",
      options: expectedDegreeOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [
        showOnTimeDependence,
        { questionId: "isStudent", expectedAnswer: ["Yes"] },
      ],
    },
  ],
  [
    "expectedGraduationDate",
    {
      questionId: "expectedGraduationDate",
      question: "If you are a student, what is your expected graduation date?",
      answerType: AnswerType.DATE,
      dependenceIds: [
        showOnTimeDependence,
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
      dependenceIds: [
        showOnTimeDependence,
        { questionId: "isStudent", expectedAnswer: ["No"] },
      ],
    },
  ],
  [
    "graduationDate",
    {
      questionId: "graduationDate",
      question: "What was your Graduation Date?",
      answerType: AnswerType.DATE,
      dependenceIds: [
        showOnTimeDependence,
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
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "monthsOfExperience",
    {
      questionId: "monthsOfExperience",
      question:
        "Recruiter: # of Months of Experience (Recruiter will determine this based on previous answer)",
      options: monthsOfExperienceOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
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
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "goodFit",
    {
      questionId: "goodFit",
      question: "Why do you feel like you would be a good fit for Smoothstack?",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "referral",
    {
      questionId: "referral",
      question: "How did you hear about us?",
      answerType: AnswerType.TEXT, // TODO: options
      dependenceIds: [showOnTimeDependence],
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
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "abilityToLearn",
    {
      questionId: "abilityToLearn",
      question:
        "Can you give me an example of time when you had to learn a lot in a short period of time?",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "challengingSituation",
    {
      questionId: "challengingSituation",
      question:
        "Tell me about a challenging situation that you have found yourself in?",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
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
      dependenceIds: [showOnTimeDependence],
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
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "backgroundCheck",
    {
      questionId: "backgroundCheck",
      question: "Do you have any concerns about passing a background check?",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "drugScreen",
    {
      questionId: "drugScreen",
      question:
        "Our clients require drug screening, do you have any concerns passing a drug screen even if certain drugs are legal in your state?",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "isVaccinated",
    {
      questionId: "isVaccinated",
      question: "Are you currently vaccinated?",
      options: isVaccinatedOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "willVaccinate",
    {
      questionId: "willVaccinate",
      question: "Vaccination Notes",
      options: willVaccinateOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "vaccinationNotes",
    {
      questionId: "vaccinationNotes",
      question: "Vaccination Notes",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "githubLink",
    {
      questionId: "githubLink",
      question: "GitHub Link",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "linkedinLink",
    {
      questionId: "linkedinLink",
      question: "LinkedIn Link",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
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
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "address1",
    {
      questionId: "address1",
      question: "Address Line 1",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "address2",
    {
      questionId: "address2",
      question: "Address Line 2 (Optional)",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "city",
    {
      questionId: "city",
      question: "City",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "state",
    {
      questionId: "state",
      question: "State",
      options: stateOptions,
      answerType: AnswerType.DROPDOWN,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "zip",
    {
      questionId: "zip",
      question: "Zip Code",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "county",
    {
      questionId: "county",
      question: "What county do you live in?",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "questions",
    {
      questionId: "questions",
      question:
        "Do you have any outstanding questions regarding this opportunity that I may help clarify?",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "referFriend",
    {
      questionId: "referFriend",
      question:
        "Is there anyone you can think of that would be a good fit for this program?",
      answerType: AnswerType.TEXT,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "communicationSkills",
    {
      questionId: "communicationSkills",
      question: "Recruiter: Please rank candidates communication skills.",
      options: communicationSkillsOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "result",
    {
      questionId: "result",
      question: "Recruiter: Please select pre-screen result below.",
      options: resultOptions,
      answerType: AnswerType.SINGLE,
      dependenceIds: [showOnTimeDependence],
    },
  ],
  [
    "additionalNotes",
    {
      questionId: "additionalNotes",
      question:
        "Recruiter: Please include any additional notes that you feel may be useful.",
      answerType: AnswerType.TEXTBLOCK,
      dependenceIds: [showOnTimeDependence],
    },
  ],
]);
