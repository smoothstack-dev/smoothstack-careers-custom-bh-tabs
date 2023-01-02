import axios, { AxiosResponse } from "axios";
import { SignatureStyles } from "../components/MSSignature/store/types";
import { FORM, FORM_TYPE, PrescreenForm, TechScreenForm } from "../types/forms";

// const carearApiEndpoint = "http://localhost:3000/local/";

// smoothstack-careers-api
const carearApiEndpoint =
  "https://1syp4w9c5h.execute-api.us-east-1.amazonaws.com/prod/";
const prescreenUrl = carearApiEndpoint + "prescreen";
const prescreenPost = carearApiEndpoint + "form-events";
const jobDescriptionManagement = carearApiEndpoint + "jobDescriptionDetail";

// smoothstack-auth-api
const authApiEndpoint =
  "https://tjco3r5z49.execute-api.us-east-1.amazonaws.com/prod/";
const msEmailValidationPost = authApiEndpoint + "jobManageAllowedEmailList";
const msUsersGet = authApiEndpoint + "users";

//  smoothstack-signature-api
const signatureEndpoint =
  " https://njbmha3pnf.execute-api.us-east-1.amazonaws.com/prod/";
const signatureUserData = signatureEndpoint + "user";
const signatureConfigData = signatureEndpoint + "config";

// Prescreen
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

// Job Description
export const getJobDescirptionList = async (queryString: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${jobDescriptionManagement}?${queryString}`
    );
    return response.data;
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

export const validateMSEmailAccess = async (email: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${msEmailValidationPost}?email=${email}`
    );
    if (response.status && response.status < 300) {
      return response.data.body?.isAllowed;
    } else return false;
  } catch (err) {
    console.error("Error validating MS Email Access", err);
    return false;
  }
};

// Microsoft Signature
export const getEmployeeList = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${msUsersGet}`);
    return response.data;
  } catch (err) {
    console.error("Error retrieveing employee list", err);
    return [];
  }
};

// Signature Api
export const getEmployeeSignatureData = async (primaryEmail: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${signatureUserData}?primaryEmail=${primaryEmail}`
    );
    return response.data;
  } catch (err) {
    console.error("Error getting employee signature data", primaryEmail, err);
  }
};

export const saveEmployeeSignatureData = async (data: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${signatureUserData}`,
      data
    );
    return response.data;
  } catch (err) {
    console.error("Error saving employee signature data");
  }
};

export const getSignatureConfig = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${signatureConfigData}`);
    return response.data;
  } catch (err) {
    console.error("Error getting signature config data", err);
  }
};

export const saveSignatureConfigData = async (data: SignatureStyles) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${signatureConfigData}`,
      data
    );
    return response.data;
  } catch (err) {
    console.error("Error saving signature config data");
  }
};
