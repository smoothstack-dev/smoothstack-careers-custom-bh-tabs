import axios, { AxiosResponse } from "axios";
import { FORM, FORM_TYPE, PrescreenForm, TechScreenForm } from "../types/forms";

const endpoint = "https://1syp4w9c5h.execute-api.us-east-1.amazonaws.com/prod/";
// const endpoint = "http://localhost:3000/local/";
const prescreenUrl = endpoint + "prescreen";
const prescreenPost = endpoint + "form-events";

export const getPrescreenData = async (
  candidateId: string,
  retry: number = 0
) => {
  try {
    const response: AxiosResponse = await axios.get(
      `${prescreenUrl}?candidateId=${candidateId}`
    );
    return response.data;
  } catch (err) {
    if (retry < 3) {
      console.log("retry to retrieve prescreen data", retry);
      getPrescreenData(candidateId, retry + 1);
    } else {
      console.error("Error getting prescreen data", err);
      return undefined;
    }
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
