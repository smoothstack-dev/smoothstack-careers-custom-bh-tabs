import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Modal } from "react-bootstrap";
import {
  CORP_TYPE,
  JobDescriptionDetailsType,
  saveJobDescriptionListHelper,
} from "./jobDetailsManagementHelper";
import { cloneDeep } from "lodash";
import { JobDescriptionSection } from "./JobDescirptionSection";
import stringify from "json-stringify-pretty-compact";

export const JobDescirpiton: React.FC<{
  jobCorpType: CORP_TYPE;
  jobId: number;
  jobDescription: JobDescriptionDetailsType[][];
  setJobDescription: any;
  salary?: string;
}> = ({ jobCorpType, jobId, jobDescription, setJobDescription, salary }) => {
  const [isSavingJobDescription, setSavingJobDescription] =
    useState<boolean>(false);
  const [savingJobDescriptionMsg, setSavingJobDescriptionMsg] =
    useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSaveJobDescription = async () => {
    setSavingJobDescription(true);
    await saveJobDescriptionListHelper(jobCorpType, jobDescription, jobId);
    setSavingJobDescription(false);
    setSavingJobDescriptionMsg("Saved!");
  };

  // handle react-beautiful-dnd
  const updateDescriptionSectionDetails = (
    action: "ADD" | "UPDATE" | "REMOVE",
    sectionIndex: number,
    detailIndex?: number,
    detail?: JobDescriptionDetailsType
  ) => {
    if (!jobDescription) return;
    if (savingJobDescriptionMsg !== "") setSavingJobDescriptionMsg("");
    switch (action) {
      case "ADD": {
        let updatedJobDescription = cloneDeep(jobDescription);
        updatedJobDescription[sectionIndex].push(
          {} as JobDescriptionDetailsType
        );
        setJobDescription(updatedJobDescription);
        break;
      }
      case "UPDATE": {
        if (detailIndex !== undefined && detail) {
          let updatedJobDescription = cloneDeep(jobDescription);
          updatedJobDescription[sectionIndex][detailIndex] = detail;
          setJobDescription(updatedJobDescription);
        }
        break;
      }
      case "REMOVE": {
        if (detailIndex !== undefined) {
          let updatedJobDescription = cloneDeep(jobDescription);
          updatedJobDescription[sectionIndex].splice(detailIndex, 1);
          setJobDescription(updatedJobDescription);
        }
        break;
      }
    }
  };

  const updateDescriptionSections = (
    action: "ADD" | "REMOVE",
    sectionIndex?: number
  ) => {
    if (!jobDescription) return;
    switch (action) {
      case "ADD": {
        let updatedJobDescription = cloneDeep(jobDescription);
        updatedJobDescription.push([] as JobDescriptionDetailsType[]);
        setJobDescription(updatedJobDescription);
        break;
      }
      case "REMOVE": {
        if (sectionIndex !== undefined) {
          let updatedJobDescription = cloneDeep(jobDescription);
          updatedJobDescription.splice(sectionIndex, 1);
          setJobDescription(updatedJobDescription);
          break;
        }
        break;
      }
    }
  };

  const onDragEnd = (result: any) => {
    const [sourceSectionIndex, sourceIndex] = result?.draggableId?.split("-");
    const destinationSectionIndex =
      result?.destination?.droppableId?.split("-")[1];
    const destinationIndex = result?.destination?.index;

    if (
      jobDescription === undefined ||
      sourceSectionIndex === undefined ||
      sourceIndex === undefined ||
      destinationSectionIndex === undefined ||
      destinationIndex === undefined
    )
      return;

    if (
      sourceSectionIndex === destinationSectionIndex &&
      sourceIndex === destinationIndex
    )
      return;

    const updatedJobDescription = cloneDeep(jobDescription);
    const draggedObj = cloneDeep(
      updatedJobDescription[sourceSectionIndex][sourceIndex]
    );
    const sourceList = updatedJobDescription[sourceSectionIndex];
    const destinationList = updatedJobDescription[destinationSectionIndex];

    // remove from original position
    sourceList.splice(sourceIndex, 1);

    // add to new position
    destinationList.splice(destinationIndex, 0, draggedObj);

    setJobDescription(updatedJobDescription);
  };

  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          {jobDescription.map((section, index) => {
            return (
              <JobDescriptionSection
                key={index}
                section={section}
                sectionIndex={index}
                updateSections={updateDescriptionSections}
                updateSectionDetails={updateDescriptionSectionDetails}
                salary={salary}
                setShowModal={setShowModal}
              />
            );
          })}
        </DragDropContext>
        <Button
          className="float-left button-input"
          size="sm"
          variant="outline-primary"
          onClick={() => updateDescriptionSections("ADD")}
        >
          Add Section
        </Button>
        <br />
        <Button
          variant="outline-primary"
          className="float-right"
          size="sm"
          onClick={() => handleSaveJobDescription()}
          disabled={isSavingJobDescription}
        >
          {isSavingJobDescription ? "Saving..." : "Save your changes"}
        </Button>
        {savingJobDescriptionMsg && (
          <span className="float-right">{savingJobDescriptionMsg}</span>
        )}
      </div>
      <JobDescirpitonModal
        jobDescription={jobDescription}
        salary={salary}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

const JobDescirpitonModal: React.FC<{
  jobDescription: JobDescriptionDetailsType[][];
  salary: string | undefined;
  showModal: boolean;
  setShowModal: any;
}> = ({ jobDescription, salary, showModal, setShowModal }) => {
  // reconstruct job description for display purpose
  const jdObject: { [k: string]: any } = {};
  const noTitlePrefix = "NO TITLE PARAGRAPH";
  let noTitleIndex = 0;
  jobDescription.forEach(
    (jdSection: JobDescriptionDetailsType[], sectionIndex) => {
      jdSection.forEach((jd: JobDescriptionDetailsType, jdIndex) => {
        if (jd.contentType === "LIST" || jd.contentType === "PARAGRAPH") {
          if (jd.title) {
            jdObject[jd.title] = jd.contents;
          } else {
            jdObject[`${noTitlePrefix}${++noTitleIndex}`] = jd.contents;
          }
        } else if (jd.contentType === "SALARY") {
          jdObject["salary"] = salary;
        } else if (jd.contentType === "VIDEO") {
          if (jd.videoUrl) jdObject["video"] = jd.videoUrl;
        }
      });
    }
  );
  // remove last part
  jdObject[`${noTitlePrefix}${noTitleIndex}`] = undefined;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} size="lg">
      <Modal.Header>
        <strong>JSON Format:</strong>
      </Modal.Header>
      <Modal.Body>
        <div>
          {/* <pre>{JSON.stringify(jdObject, null, 2)}</pre> */}
          <pre>{stringify(jdObject, { maxLength: 50 })}</pre>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
