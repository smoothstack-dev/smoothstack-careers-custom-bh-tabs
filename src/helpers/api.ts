import axios, { AxiosResponse } from "axios";
import { FORM, FORM_TYPE, PrescreenForm, TechScreenForm } from "../types/forms";

// const endpoint =
// "https://1syp4w9c5h.execute-api.us-east-1.amazonaws.com/prod/form-events";
const endpoint = "http://localhost:3000/local/";
const saveUrl = endpoint + "form-events";
const getUrl = endpoint + "prescreenRetriever";

export const getPrescreenData = async (candidateId: string) => {
  let prescreenData;
  try {
    const response: AxiosResponse = await axios.get(
      `${getUrl}?candidateId=${candidateId}`
    );
    prescreenData = response.data?.body;
  } catch (err) {
    console.error("Error getting prescreen data", err);
  }
  return prescreenData;
};

export const saveForm = async (
  formType: FORM_TYPE,
  form: PrescreenForm | TechScreenForm
) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${saveUrl}?formType=${FORM[formType].type}`,
      form
    );
    return response.data;
  } catch (err) {
    console.error("Error getting prescreen data", err);
    throw err;
  }
};
