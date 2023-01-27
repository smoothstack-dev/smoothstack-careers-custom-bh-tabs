import axios, { AxiosResponse } from "axios";
import { SESSION_USER_TOKEN } from "../components/MSLoginBtn/store/literal";
import { PROFILE_IMAGE_S3_URL } from "../components/MSSignature/store/literal";
import { SignatureStyles } from "../components/MSSignature/store/types";
import { FORM, FORM_TYPE, PrescreenForm, TechScreenForm } from "../types/forms";

// smoothstack-careers-api
const carearApiEndpoint =
  "https://1syp4w9c5h.execute-api.us-east-1.amazonaws.com/prod/";
const prescreenUrl = carearApiEndpoint + "prescreen";
const prescreenPost = carearApiEndpoint + "form-events";
const jobDescriptionManagement = carearApiEndpoint + "jobDescriptionDetail";

//  smoothstack-user-mgt-api
const usrMgtEndpoint =
  "https://8043o9dkbl.execute-api.us-east-1.amazonaws.com/prod/";
const signatureUserData = usrMgtEndpoint + "ms/user";
const signatureConfigData = usrMgtEndpoint + "signature/config";
const signatureImageUpload = usrMgtEndpoint + "resources/profile-image";
const msUsersGet = usrMgtEndpoint + "ms/user";
const sfdcUsersGet = usrMgtEndpoint + "sfdc/user";

const TOKEN_TYPE = "Bearer";
const getUserToken = () => sessionStorage.getItem(SESSION_USER_TOKEN);
const getAuthenticationHeader = {
  headers: {
    Authorization: `${TOKEN_TYPE} ${getUserToken()}`,
  },
};

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
      `${jobDescriptionManagement}?${queryString}`,
      getAuthenticationHeader
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
      udpateData,
      getAuthenticationHeader
    );
    if (response.status && response.status < 300) return true;
    else return false;
  } catch (err) {
    console.error("Error updating job description", err);
    return false;
  }
};

// Microsoft Signature
export const getEmployeeList = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${msUsersGet}`, {
      headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error retrieving employee list", err);
    return [];
  }
};

export const getSFDCUserList = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${sfdcUsersGet}`, {
      headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error retrieving sfdc users list", err);
    return [];
  }
};

// Authentication
export const checkUserAuthentication = async (token?: string) => {
  const userToken = token || getUserToken();
  try {
    const response: AxiosResponse = await axios.get(`${signatureConfigData}`, {
      headers: { Authorization: `${TOKEN_TYPE} ${userToken}` },
    });
    if (!response) {
      sessionStorage.clear();
      window.location.reload();
    }
    return !!response;
  } catch (err) {
    sessionStorage.clear();
    return false;
  }
};

// Signature Api
export const getAllEmployeeSignatureData = async () => {
  try {
    const response: AxiosResponse = await axios.get(signatureUserData, {
      headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
    });
    return response.data;
  } catch (err) {
    // console.error("Error getting employee signature data", primaryEmail, err);
  }
};

export const getEmployeeSignatureData = async (primaryEmail: string) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${signatureUserData}?primaryEmail=${primaryEmail}`,
      {
        headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
      }
    );
    return response.data;
  } catch (err) {
    // console.error("Error getting employee signature data", primaryEmail, err);
  }
};

export const saveEmployeeSignatureData = async (data: any) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${signatureUserData}`,
      data,
      {
        headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error();
  }
};

export const getSignatureConfig = async () => {
  try {
    const response: AxiosResponse = await axios.get(`${signatureConfigData}`, {
      headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error getting signature config data", err);
  }
};

export const saveSignatureConfigData = async (data: SignatureStyles) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${signatureConfigData}`,
      data,
      {
        headers: { Authorization: `${TOKEN_TYPE} ${getUserToken()}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error saving signature config data");
  }
};

export const uploadProfileImage = async (
  file: FormData,
  primaryEmail: string
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${signatureImageUpload}?primaryEmail=${primaryEmail}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${TOKEN_TYPE} ${getUserToken()}`,
        },
      }
    );
    return `${PROFILE_IMAGE_S3_URL}${response.data.fileName}`;
  } catch (err) {
    console.error("Error saving signature config data");
    throw new Error();
  }
};
