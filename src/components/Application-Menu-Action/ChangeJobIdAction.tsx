import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { updateApplicationJobId } from "../../helpers/api";
import { getJobList, JobType } from "./applicationHelper";
import "./changeJobIdAction.css";

export const ChangeJobIdAction: React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [jobId, setJobId] = useState<number>();
  const [jobList, setJobList] = useState<JobType[]>([]);
  const [applications, setApplications] = useState<string>("");
  const [dropdownTitle, setDropDownTitle] = useState<string>("Select a job");
  const [search, setSearch] = useState("");

  const loadJobList = async () => {
    const jobListData = await getJobList();
    setJobList(jobListData);
    setIsLoading(false);
  };

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    const queryParams = new URLSearchParams(window.location.search);
    const ids = queryParams.get("EntityID");
    setApplications(ids || "");
    loadJobList();
  }, []);

  const save = async () => {
    if (jobId && applications) {
      setIsSaving(true);
      const response = await updateApplicationJobId(jobId, applications);
      console.log("response", response);
      setIsSaving(false);
    }
  };

  return (
    <div className="action-container">
      <p>
        <strong>
          Please select a job you want to move these applications to:
        </strong>
      </p>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-autoclose-inside"
          className="dropdown-box"
          disabled={isLoading}
        >
          {isLoading ? "Loading Jobs..." : dropdownTitle}
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
              .map((job: JobType) => {
                return (
                  <Dropdown.Item
                    key={`job-${job.id}`}
                    onClick={() => {
                      setJobId(job.id);
                      setDropDownTitle(`#${job.id} ${job.title}`);
                    }}
                  >
                    {job.label}
                  </Dropdown.Item>
                );
              })}
        </Dropdown.Menu>
      </Dropdown>
      <br />
      <Button
        variant="outline-primary"
        className="save-btn"
        size="sm"
        onClick={() => {
          save();
        }}
        disabled={!jobId || !applications || isSaving}
      >
        Save
      </Button>
    </div>
  );
};
