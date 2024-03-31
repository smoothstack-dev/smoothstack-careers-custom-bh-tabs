import React, { useEffect, useState } from "react";
import { Accordion, Dropdown, Form } from "react-bootstrap";
import {
  CORPORATION,
  CORP_TYPE,
  JobDetailType,
  getJobDescriptionListHelper,
  generateJobDescriptionObject,
  generateJobChallengeObject,
  JobDescriptionDetailsType,
  JobChallengeDetailsType,
} from "./jobDetailsManagementHelper";
import "./jobDetailsManagement.css";
import { JobDescirpiton } from "./JobDescription";
import { JobChallengeInfo } from "./JobChallengeInfo";

export const JobDetailsManagement: React.FC<{}> = () => {
  const [isLoadingJobList, setLoadingJobList] = useState<boolean>(false);

  const [jobCorpType, setJobCorpType] = useState<CORP_TYPE>();
  const [jobList, setJobList] = useState<JobDetailType[]>();
  const [selectedJob, setSelectedJob] = useState<JobDetailType | undefined>();
  const [search, setSearch] = useState<string>("");

  const [jobDescription, setJobDescription] =
    useState<JobDescriptionDetailsType[][]>();
  const [jobChallenge, setJobChallenge] = useState<JobChallengeDetailsType[]>();

  const loadJobList = async (corpType: CORP_TYPE) => {
    setLoadingJobList(true);
    const response = await getJobDescriptionListHelper(corpType);
    setJobList(response);
    setLoadingJobList(false);
  };

  useEffect(() => {
    if (jobCorpType) {
      loadJobList(jobCorpType);
    }
  }, [jobCorpType]);

  useEffect(() => {
    if (selectedJob) {
      setJobDescription(generateJobDescriptionObject(selectedJob.description));
      if (jobCorpType === CORP_TYPE.APPRENTICESHIP)
        setJobChallenge(generateJobChallengeObject(selectedJob.challengeInfo));
    }
  }, [selectedJob, jobCorpType]);

  return (
    <div className="">
      <div className="action-container">
        <p>
          <strong>Please select the job type:</strong>
        </p>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-autoclose-inside"
            className="dropdown-box"
          >
            {jobCorpType
              ? `Jobs for ${CORPORATION[jobCorpType].label}`
              : "Select job type"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setJobCorpType(CORP_TYPE.APPRENTICESHIP);
                setSelectedJob(undefined);
              }}
            >
              {CORPORATION[CORP_TYPE.APPRENTICESHIP].label}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setJobCorpType(CORP_TYPE.STAFF_AUG);
                setSelectedJob(undefined);
              }}
            >
              {CORPORATION[CORP_TYPE.STAFF_AUG].label}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {jobCorpType && (
        <div className="action-container">
          <br />
          <p>
            <strong>Please select a job you want to modify:</strong>
          </p>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-autoclose-inside"
              className="dropdown-box"
              disabled={isLoadingJobList}
            >
              {isLoadingJobList
                ? "Loading Jobs..."
                : selectedJob
                ? selectedJob?.title
                : "Select a job"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Form.Control
                autoFocus
                className="mx-3 my-2 w-auto"
                placeholder="Type to filter..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              {jobList &&
                jobList
                  .filter((job) => {
                    if (search === "") return job.isPublic === 1;
                    else return job.label.includes(search);
                  })
                  .map((job: JobDetailType) => {
                    return (
                      <Dropdown.Item
                        key={`job-${job.id}`}
                        onClick={() => {
                          setSelectedJob(job);
                        }}
                      >
                        {job.label}
                      </Dropdown.Item>
                    );
                  })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
      <br />

      {jobCorpType && selectedJob && jobDescription !== undefined && (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <strong>Job Description Details</strong>
            </Accordion.Header>
            <Accordion.Body className="float-div">
              <JobDescirpiton
                jobCorpType={jobCorpType}
                jobId={selectedJob.id}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                salary={selectedJob.salary}
              />
            </Accordion.Body>
          </Accordion.Item>
          {jobCorpType === "APPRENTICESHIP" && (
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <strong>Challenge Information Details</strong>
              </Accordion.Header>
              <Accordion.Body className="float-div">
                <JobChallengeInfo
                  jobCorpType={jobCorpType}
                  jobId={selectedJob.id}
                  jobChallenge={
                    jobChallenge || ([] as JobChallengeDetailsType[])
                  }
                  setJobChallenge={setJobChallenge}
                />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      )}
      <br />
    </div>
  );
};
