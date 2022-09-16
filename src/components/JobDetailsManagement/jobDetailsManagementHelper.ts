import * as API from "./../../helpers/api";

export enum CORP_TYPE {
  STAFF_AUG = "STAFF_AUG",
  APPRENTICESHIP = "APPRENTICESHIP",
}

export const CORPORATION = {
  STAFF_AUG: {
    label: "Staff Aug",
    corpId: "8yy144",
  },
  APPRENTICESHIP: {
    label: "HTD",
    corpId: "7xjpg0",
  },
  // TODO: add corporate with filter
};

export type JobDetailType = {
  id: number;
  title: string;
  isPublic: number;
  label: string;
  description: string;
  challengeInfo?: string;
  salary?: string;
};

export type JobChallengeListType = { title: string; content: string };

export type JobChallengeDetailsType = {
  contentType: "PARAGRAPH" | "LIST";
  stringContents?: string[];
  listContents?: JobChallengeListType[];
};

export type DescriptionContentType = "PARAGRAPH" | "LIST" | "SALARY" | "VIDEO";
export type ChallengeInfoContentType = "PARAGRAPH" | "LIST";

export type JobDescriptionDetailsType = {
  contentType: DescriptionContentType;
  title: string;
  contents: string[];
  videoUrl?: string;
};

export const getJobDescirptionListHelper = async (corpType: CORP_TYPE) => {
  let params: any = {};
  params.query = `(isDeleted:0)`;
  params.fields = [
    "id",
    "title",
    "isPublic",
    "isDeleted",
    "customTextBlock2",
    "salary",
  ];
  if (corpType === CORP_TYPE.APPRENTICESHIP)
    params.fields.push("customTextBlock1");

  params.corpType = CORPORATION[corpType].corpId;

  let queryArray = [];
  for (let key in params) {
    queryArray.push(`${key}=${params[key]}`);
  }
  let queryString: string = queryArray.join("&");

  const jobDescriptionList = await API.getJobDescirptionList(queryString);
  return jobDescriptionList.map((job: any) => {
    return {
      id: job.id,
      title: job.title,
      isPublic: job.isPublic,
      label: `#${job.id} ${job.title}`,
      description: job.customTextBlock2,
      challengeInfo: job.customTextBlock1,
      salary: job.salary ? numberWithCommas(+job.salary) : undefined,
    } as JobDetailType;
  });
};

export const saveJobDescirptionListHelper = async (
  corpType: CORP_TYPE,
  jobDescription: JobDescriptionDetailsType[][],
  jobId: number
) => {
  const jsonJobDescription = JSON.stringify({ sections: jobDescription });
  let params: any = {};
  params.corpType = CORPORATION[corpType].corpId;
  params.jobId = jobId;

  let queryArray = [];
  for (let key in params) {
    queryArray.push(`${key}=${params[key]}`);
  }
  let queryString: string = queryArray.join("&");

  const updateData = { customTextBlock2: jsonJobDescription };

  return await API.saveJobDescription(queryString, updateData);
};

export const saveJobChallengeInfoHelper = async (
  jobChallenge: JobChallengeDetailsType[],
  jobId: number
) => {
  const jsonJobDescription = JSON.stringify({
    details: jobChallenge,
  });
  let params: any = {};
  params.corpType = CORPORATION[CORP_TYPE.APPRENTICESHIP].corpId;
  params.jobId = jobId;

  let queryArray = [];
  for (let key in params) {
    queryArray.push(`${key}=${params[key]}`);
  }
  let queryString: string = queryArray.join("&");

  const updateData = { customTextBlock1: jsonJobDescription };

  return await API.saveJobDescription(queryString, updateData);
};

export const generateJobDescriptionObject = (
  description: string | undefined
): JobDescriptionDetailsType[][] => {
  if (description && tryParseJSONObject(description)) {
    const descriptionParsed = JSON.parse(description);
    return descriptionParsed.sections as JobDescriptionDetailsType[][];
  }
  return [] as JobDescriptionDetailsType[][];
};

export const generateJobChallengeObject = (
  challenge: string | undefined
): JobChallengeDetailsType[] => {
  if (challenge && tryParseJSONObject(challenge)) {
    const challengeParsed = JSON.parse(challenge);
    const constructedChallenge =
      challengeParsed.details?.map((info: any) => {
        return {
          contentType: info.contentType,
          stringContents:
            info.contentType === "PARAGRAPH" ? info.contents : undefined,
          listContents: info.contentType === "LIST" ? info.contents : undefined,
        } as JobChallengeDetailsType;
      }) || [];
    return constructedChallenge as JobChallengeDetailsType[];
  }
  return [] as JobChallengeDetailsType[];
};

const tryParseJSONObject = (jsonString: string | undefined) => {
  if (jsonString) {
    try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
        return o;
      }
    } catch (e) {}
  }
  return false;
};

const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
