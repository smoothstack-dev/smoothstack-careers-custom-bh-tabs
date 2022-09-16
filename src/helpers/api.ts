import axios, { AxiosResponse } from "axios";
import { FORM, FORM_TYPE, PrescreenForm, TechScreenForm } from "../types/forms";

// const endpoint = "https://1syp4w9c5h.execute-api.us-east-1.amazonaws.com/prod/";
const endpoint = "http://localhost:3000/local/";
const prescreenUrl = endpoint + "prescreen";
const prescreenPost = endpoint + "form-events";
const jobDescriptionManagement = endpoint + "jobDescriptionDetail";

export const getPrescreenData = async (candidateId: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${prescreenUrl}?candidateId=${candidateId}`
    );
    return response.data;
  } catch (err) {
    console.error("Error getting prescreen data", err);
    return undefined;
  }
};

export const savePrescreenForm = async (
  formType: FORM_TYPE,
  form: PrescreenForm | TechScreenForm
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${prescreenPost}?formType=${FORM[formType].type}`,
      form
    );
    return response.data;
  } catch (err) {
    console.error("Error saving prescreen data", err);
    throw err;
  }
};

export const getJobDescirptionList = async (queryString: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${jobDescriptionManagement}?${queryString}`
    );
    return response.data;

    // return [
    //   {
    //     id: 37,
    //     title: "Entry Level Software Engineer",
    //     isPublic: 1,
    //     isDeleted: false,
    //     customTextBlock2:
    //       '{\n   "sections":[\n      [\n         {\n            "title":"Training & Career Opportunity for Entry Level Software Engineer",\n            "contentType":"PARAGRAPH",\n            "contents":[\n               "Are you looking to join an elite team of Software Developers, trained by the best, creating the products and services that transform our world for the better?",\n               "The path to a successful technology career can be confusing and unclear. You bring the talent and the motivation, and Smoothstack will provide the training, mentorship, network, and access to extremely desirable roles to launch your career!",\n               "Once selected and hired as a W-2 employee of Smoothstack, you will receive 12-14 weeks of paid, remote training in an Agile environment, complete with scrum masters, product owners, code reviewers, and more. Trainees will be paid a biweekly stipend (plus benefits) to train and will start with a salary of $60,000+/year while working on client projects."\n            ]\n         }\n      ],\n      [\n         {\n            "title":"Successful Applicants Must:",\n            "contentType":"LIST",\n            "contents":[\n               "Pass a Coding Challenge",\n               "Be legally authorized to work in the U.S., without employer sponsorship",\n               "Be willing to relocate"\n            ]\n         },\n         {\n            "title":"Qualifications:",\n            "contentType":"LIST",\n            "contents":[\n               "Must have hands-on coding experience, equivalent training or course work.",\n               "No prior professional experience required.",\n               "Excitement, eagerness, and ability to learn new technologies quickly."\n            ]\n         },\n         {\n            "contentType":"VIDEO",\n            "videoUrl":"https://www.youtube.com/embed/NKwFP5SwUEw"\n         }\n      ],\n      [\n         {\n            "title":"Benefits:",\n            "contentType":"LIST",\n            "contents":[\n               "Paid Training",\n               "Health Insurance including Vision and Dental",\n               "Matching 401K",\n               "Voluntary Life Insurance",\n               "Relocation Reimbursement",\n               "10 paid days off a year (Federal holidays)",\n               "Industry Certifications",\n               "Tuition Reimbursement assistance",\n               "Amazing company culture!"\n            ]\n         },\n         {\n            "title":"Entry Level Software Engineer Responsibilities:",\n            "contentType":"LIST",\n            "contents":[\n               "Development in Java, Spring Boot, Microservices, API while providing expertise in the full software development lifecycle, from concept and design to testing, designing, developing and delivering high-volume, low-latency applications for mission-critical systems.",\n               "Participate in technical solution and design discussions.",\n               "Perform proofs of concept and comprehensive solutions throughout the development lifecycle.",\n               "Add new features while improving efficiency, reliability, and scalability to address client needs."\n            ]\n         },\n         {\n            "contentType":"SALARY"\n         }\n      ],\n      [\n         {\n            "title":"",\n            "contentType":"PARAGRAPH",\n            "contents":[\n               "Our internal training is designed to prepare you to get valuable hands-on field experience in simulated environments that mimic client environments.",\n               "Smoothstack is 100% technology-focused.  We specialize in Full Stack Java development, Cloud, DevSecOps, Networking, Cyber Security, Artificial Intelligence (AI), Business Intelligence (BI), Data Science, and Machine Learning related initiatives.",\n               "Smoothstack  is dedicated to removing bias in hiring and increasing representation and diversity in IT. Smoothstack is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees."\n            ]\n         },\n         {\n            "title":"Essential Duties:",\n            "contentType":"LIST",\n            "contents":[\n               "Must be legally authorized to work in the U.S., without employer sponsorship.",\n               "Must pass background check and drug screening.",\n               "Must be vaccinated against Covid-19 unless you need a reasonable accommodation for religion or a health-related need."\n            ]\n         },\n         {\n            "title":"",\n            "contentType":"PARAGRAPH",\n            "contents":[\n               "Principles only. Recruiters please do not contact this job poster.",\n               "Do NOT contact us with unsolicited services or offers."\n            ]\n         }\n      ]\n   ]\n}',
    //     salary: 60000,
    //     customTextBlock1:
    //       '{\n  "details": [\n    {\n      "contentType": "PARAGRAPH",\n      "contents": [\n        "Your coding challenge will consist of the following:"\n      ]\n    },\n    {\n      "contentType": "LIST",\n      "contents": [\n        {\n          "title": "Question 1:",\n          "content": "Choose your own language"\n        },\n        {\n          "title": "Question 2:",\n          "content": "SQL"\n        },\n        {\n          "title": "Question 3:",\n          "content": "General command language (Bash)"\n        },\n        {\n          "title": "Question 4-13:",\n          "content": "Multiple choice"\n        }\n      ]\n    },\n    {\n      "contentType": "PARAGRAPH",\n      "contents": [\n        "Time to complete: 90-120 minutes."\n      ]\n    }\n  ]\n}',
    //     _score: 1,
    //   },
    // ];
  } catch (err) {
    console.error("Error getting job list", err);
    throw err;
  }
};

export const saveJobDescription = async (
  queryString: string,
  udpateData: any
) => {
  try {
    const response: AxiosResponse = await axios.put(
      `${jobDescriptionManagement}?${queryString}`,
      udpateData
    );
    if (response.status && response.status < 300) return true;
    else return false;
  } catch (err) {
    console.error("Error updating job description", err);
    return false;
  }
};
