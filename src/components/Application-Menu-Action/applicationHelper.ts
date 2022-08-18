import * as API from "./../../helpers/api";

export type JobType = {
  id: number;
  title: string;
  isPublic: number;
  label: string;
};

export const getJobList = async () => {
  let params: any = {};
  params.query = `(isDeleted:0) || !(isDeleted:0)`;
  params.fields = ["id", "title", "isOpen", "isPublic", "isDeleted"];

  let queryArray = [];
  for (let key in params) {
    queryArray.push(`${key}=${params[key]}`);
  }
  let queryString: string = queryArray.join("&");

  const jobList = await API.getJobList(queryString);
  return jobList.map((job: JobType) => {
    return {
      ...job,
      label: `#${job.id} ${job.title}`,
    } as JobType;
  });
};
