import axios, { AxiosResponse } from "axios";
import { FORM, FORM_TYPE, PrescreenForm, TechScreenForm } from "../types/forms";

const endpoint = "https://1syp4w9c5h.execute-api.us-east-1.amazonaws.com/prod/";
// const endpoint = "http://localhost:3000/local/";
const prescreenUrl = endpoint + "prescreen";
const prescreenPost = endpoint + "form-events";
const applicationActionUrl = endpoint + "customActionJobChange";

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

export const getJobList = async (queryString: string) => {
  try {
    const response: AxiosResponse = await axios.get(applicationActionUrl);
    return response.data;
  } catch (err) {
    console.error("Error getting job list", err);
    throw err;
  }
};

export const updateApplicationJobId = async (
  jobId: number,
  applications: string
) => {
  try {
    const response: AxiosResponse = await axios.put(
      `${applicationActionUrl}?jobId=${jobId}&applicationIds=${applications}`
    );
    if (response.status && response.status < 300) return true;
    else return false;
  } catch (err) {
    console.error("Error updating application job id", err);
    return false;
  }
};
