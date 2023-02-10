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
const signatureUserData = usrMgtEndpoint + "signature/user";
const signatureConfigData = usrMgtEndpoint + "signature/config";
const signatureImageUpload = usrMgtEndpoint + "resources/profile-image";
const msUsersGet = usrMgtEndpoint + "ms/user";
const sfdcUsersGet = usrMgtEndpoint + "sfdc/user?includeInactive=true";

const TOKEN_TYPE = "Bearer";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const getUserToken = () => sessionStorage.getItem(SESSION_USER_TOKEN);

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
    let token;
    while (sessionStorage.getItem(SESSION_USER_TOKEN) === null) {
      await delay(1000);
    }
    token = getUserToken();
    const response: AxiosResponse = await axios.get(
      `${jobDescriptionManagement}?${queryString}`,
      {
        headers: { Authorization: `${TOKEN_TYPE} ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error("retry getJobDescirptionList", err);
    await delay(1500);
    getJobDescirptionList(queryString);
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
      {
        headers: {
          Authorization: `${TOKEN_TYPE} ${getUserToken()}`,
        },
      }
    );
    if (response.status && response.status < 300) return true;
    else return false;
  } catch (err) {
    console.error("Error updating job description", err);
    return false;
  }
};

// const batchUpdate = async () => {
//   let uploadCount = 0;
//   let data: any = [];
//   await Promise.all(
//     data.map(async (d: any) => {
//       await saveEmployeeSignatureData(d);
//       uploadCount++;
//       console.log("Saving...#", uploadCount);
//     })
//   );
// };

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
