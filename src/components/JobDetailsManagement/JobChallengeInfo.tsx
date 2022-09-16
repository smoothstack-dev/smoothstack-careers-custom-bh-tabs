import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import {
  CORP_TYPE,
  JobChallengeDetailsType,
  saveJobChallengeInfoHelper,
} from "./jobDetailsManagementHelper";
import { cloneDeep } from "lodash";
import { JobChallengeInfoDetails } from "./JobChallengeInfoDetails";

export const JobChallengeInfo: React.FC<{
  jobCorpType: CORP_TYPE;
  jobId: number;
  jobChallenge: JobChallengeDetailsType[];
  setJobChallenge: any;
}> = ({ jobCorpType, jobId, jobChallenge, setJobChallenge }) => {
  const [isSavingJobChallenge, setSavingJobChallenge] =
    useState<boolean>(false);
  const [savingJobChallengeMsg, setSavingJobChallengeMsg] =
    useState<string>("");

  const udpateChallengeInfoDetails = (
    action: "ADD" | "UPDATE" | "REMOVE",
    index?: number,
    value?: JobChallengeDetailsType
  ) => {
    if (savingJobChallengeMsg !== "") setSavingJobChallengeMsg("");
    const updatedJobChallenge = cloneDeep(jobChallenge);
    switch (action) {
      case "UPDATE": {
        if (!value || index === undefined) return;
        updatedJobChallenge[index] = value;
        setJobChallenge(updatedJobChallenge);
        break;
      }
      case "REMOVE": {
        if (index === undefined) return;
        updatedJobChallenge.splice(index, 1);
        setJobChallenge(updatedJobChallenge);
        break;
      }
      case "ADD": {
        updatedJobChallenge.push({} as JobChallengeDetailsType);
        setJobChallenge(updatedJobChallenge);
        break;
      }
    }
  };

  const handleSaveJobChallenge = async () => {
    setSavingJobChallenge(true);
    const constructed = jobChallenge.map((info) => {
      if (info.contentType === "PARAGRAPH") {
        return {
          contentType: info.contentType,
          contents: info.stringContents,
        };
      } else {
        return {
          contentType: info.contentType,
          contents: info.listContents,
        };
      }
    });
    const response = await saveJobChallengeInfoHelper(constructed, jobId);
    setSavingJobChallenge(false);
    setSavingJobChallengeMsg("Saved!");
  };

  const onDragEnd = (result: any) => {
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;

    if (
      jobChallenge === undefined ||
      sourceIndex === undefined ||
      destinationIndex === undefined
    )
      return;

    const updatedJobDescription = cloneDeep(jobChallenge);
    const draggedObj = cloneDeep(updatedJobDescription[sourceIndex]);

    // remove first
    updatedJobDescription.splice(sourceIndex, 1);
    // Put it back
    updatedJobDescription.splice(destinationIndex, 0, draggedObj);
    setJobChallenge(updatedJobDescription);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`challenge-section`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {jobChallenge.map((challenge, index) => {
                return (
                  <JobChallengeInfoDetails
                    jobChallengeInfoDetails={challenge}
                    index={index}
                    udpateChallengeInfoDetails={udpateChallengeInfoDetails}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        className="float-left button-input"
        size="sm"
        variant="outline-primary"
        onClick={() => udpateChallengeInfoDetails("ADD")}
      >
        Add Challenge Info Section
      </Button>
      <br />
      <Button
        variant="outline-primary"
        className="float-right"
        size="sm"
        onClick={() => handleSaveJobChallenge()}
        disabled={isSavingJobChallenge}
      >
        {isSavingJobChallenge ? "Saving..." : "Save your changes"}
      </Button>
      {savingJobChallengeMsg && (
        <span className="float-right">{savingJobChallengeMsg}</span>
      )}
    </div>
  );
};
