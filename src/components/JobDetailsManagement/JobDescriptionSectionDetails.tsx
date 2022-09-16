import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import {
  DescriptionContentType,
  JobDescriptionDetailsType,
} from "./jobDetailsManagementHelper";
import { cloneDeep } from "lodash";

export const JobDescriptionSectionDetails: React.FC<{
  sectionDetails: JobDescriptionDetailsType;
  sectionIndex: number;
  index: number;
  updateSectionDetails: any;
  salary?: string;
}> = ({
  sectionDetails,
  sectionIndex,
  index,
  updateSectionDetails,
  salary,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const detailId = `${sectionIndex}-${index}`;
  return (
    <Draggable draggableId={detailId} index={index} isDragDisabled={isEdit}>
      {(provided, snapshot) => {
        return (
          <div
            className="jobDetails-container float-div"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {!isEdit ? (
              <ViewOnlySectionDetails
                sectionDetails={sectionDetails}
                detailId={detailId}
                setIsEdit={setIsEdit}
                salary={salary}
              />
            ) : (
              <EditSectionDetails
                details={cloneDeep(sectionDetails)}
                setIsEdit={setIsEdit}
                sectionIndex={sectionIndex}
                index={index}
                updateSectionDetails={updateSectionDetails}
                salary={salary}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

const ViewOnlySectionDetails: React.FC<{
  sectionDetails: JobDescriptionDetailsType;
  detailId: string;
  setIsEdit: any;
  salary?: string;
}> = ({ sectionDetails, detailId, setIsEdit, salary }) => {
  return (
    <div>
      <div>
        <Button
          className="float-right"
          size="sm"
          variant="outline-primary"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </Button>
      </div>
      <div className="detail-section">
        {!sectionDetails.contentType && (
          <>
            <p>Please start editing this new part!</p>
          </>
        )}
        {sectionDetails.title && (
          <>
            <span>
              <strong>{sectionDetails.title}</strong>
            </span>
            <br />
          </>
        )}
        {sectionDetails.contents && sectionDetails.contentType === "PARAGRAPH" && (
          <div>
            {sectionDetails.contents.map((content, pIndex) => {
              return <p key={`p-${detailId}-${pIndex}`}>{content}</p>;
            })}
          </div>
        )}
        {sectionDetails.contents && sectionDetails.contentType === "LIST" && (
          <ul>
            {sectionDetails.contents.map((content, listIndex) => {
              return <li key={`list-${detailId}-${listIndex}`}>{content}</li>;
            })}
          </ul>
        )}
        {!!salary && sectionDetails.contentType === "SALARY" && (
          <p>
            <strong>{`Salary: $${salary}`}</strong>
          </p>
        )}
        {sectionDetails.videoUrl && (
          <iframe
            width="560"
            height="315"
            src={sectionDetails.videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}
      </div>
    </div>
  );
};

const EditSectionDetails: React.FC<{
  details: JobDescriptionDetailsType;
  setIsEdit: any;
  sectionIndex: number;
  index: number;
  updateSectionDetails: any;
  salary?: string;
}> = ({
  details,
  setIsEdit,
  sectionIndex,
  index,
  updateSectionDetails,
  salary,
}) => {
  const [contentType, setContentType] = useState<DescriptionContentType>(
    details.contentType
  );
  const [title, setTitle] = useState<string>(details.title);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(
    details.videoUrl
  );
  const [contents, setContents] = useState<string[]>(details.contents || []);

  const saveContent = () => {
    let newContent: JobDescriptionDetailsType;
    switch (contentType) {
      case "PARAGRAPH": {
        newContent = {
          contentType: "PARAGRAPH",
          contents: contents.filter((c) => c !== ""),
          title: title,
        };
        break;
      }
      case "LIST": {
        newContent = {
          contentType: "LIST",
          contents: contents.filter((c) => c !== ""),
          title: title,
        };
        break;
      }
      case "VIDEO": {
        newContent = {
          contentType: "VIDEO",
          videoUrl: videoUrl || "",
          title: "",
          contents: [],
        };
        break;
      }
      case "SALARY": {
        newContent = {
          contentType: "SALARY",
          title: "",
          contents: [],
        };
        break;
      }
    }
    updateSectionDetails("UPDATE", sectionIndex, index, newContent);
    setIsEdit(false);
  };

  const contentTypeList: DescriptionContentType[] = [
    "PARAGRAPH",
    "LIST",
    "SALARY",
    "VIDEO",
  ];

  const updateTextContent = (textIndex: number, value: string) => {
    const updatedContents = cloneDeep(contents);
    updatedContents[textIndex] = value;
    setContents(updatedContents);
  };

  const removeTextContent = (textIndex: number) => {
    const updatedContents = cloneDeep(contents);
    updatedContents.splice(textIndex, 1);
    setContents(updatedContents);
  };

  const editSectionDetailContents = () => {
    switch (contentType) {
      case "VIDEO": {
        return (
          <input
            type="text"
            placeholder="Please enter the youtube sharing url"
            className="form-control"
            onChange={(e: any) => {
              setVideoUrl(e.target.value);
            }}
            value={videoUrl || ""}
          ></input>
        );
      }
      case "LIST": {
        return (
          <div className="float-div">
            <span>
              <strong>(Optional) List Title/Header</strong>
            </span>
            <input
              type="text"
              className="form-control text-input float-left"
              placeholder="(Optional) List Title/Header"
              onChange={(e: any) => setTitle(e.target.value || "")}
              value={title || ""}
            ></input>
            <br />
            <span>
              <strong>Contents:</strong>
            </span>
            {contents.map((c, cIndex) => {
              return (
                <div>
                  <input
                    type="text"
                    className="form-control text-input float-left"
                    onChange={(e: any) =>
                      updateTextContent(cIndex, e.target.value || "")
                    }
                    value={c || ""}
                  ></input>
                  <Button
                    className="float-right remove-btn"
                    size="sm"
                    variant="light"
                    onClick={() => removeTextContent(cIndex)}
                  >
                    X
                  </Button>
                </div>
              );
            })}
            <Button
              className="float-left button-input"
              size="sm"
              variant="outline-primary"
              onClick={() => updateTextContent(contents.length, "")}
            >
              Add content
            </Button>
          </div>
        );
      }
      case "PARAGRAPH": {
        return (
          <div className="float-div">
            <span>
              <strong>(Optional) Paragraph Title/Header:</strong>
            </span>
            <input
              type="text"
              className="form-control text-input float-left"
              placeholder="(Optional) Paragraph Title/Header"
              onChange={(e: any) => setTitle(e.target.value || "")}
              value={title || ""}
            ></input>
            <br />
            <span>
              <strong>Contents:</strong>
            </span>
            {contents.map((c, cIndex) => {
              return (
                <div>
                  <textarea
                    className="form-control text-input float-left"
                    onChange={(e: any) =>
                      updateTextContent(cIndex, e.target.value || "")
                    }
                    rows={(c.length || 0) / 80 + 1}
                    value={c || ""}
                  ></textarea>
                  <Button
                    className="float-right remove-btn"
                    size="sm"
                    variant="light"
                    onClick={() => removeTextContent(cIndex)}
                  >
                    X
                  </Button>
                </div>
              );
            })}
            <Button
              className="float-left button-input"
              size="sm"
              variant="outline-primary"
              onClick={() => updateTextContent(contents.length, "")}
            >
              Add content
            </Button>
          </div>
        );
      }
      case "VIDEO": {
      }
      case "SALARY": {
        return (
          <p>
            {salary
              ? `Salary: $${salary}`
              : "Salary will be retrieved from Bullhorn and shown on the job website"}
          </p>
        );
      }
      default: {
        return (
          <p>Please select a content type from the dropdown above first!</p>
        );
      }
    }
  };

  return (
    <div className="edit-sectionDetail-container">
      <div>
        <Button
          className="float-right button-input"
          size="sm"
          variant="outline-primary"
          onClick={() => {
            setIsEdit(false);
            updateSectionDetails("REMOVE", sectionIndex, index);
          }}
        >
          Remove Section
        </Button>
        <Button
          className="float-right button-input"
          size="sm"
          variant="outline-primary"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </Button>
        <Button
          className="float-right button-input"
          size="sm"
          variant="outline-primary"
          onClick={() => saveContent()}
        >
          Save
        </Button>
      </div>
      <div>
        <Dropdown className="dropdown-box">
          <Dropdown.Toggle id="dropdown-auto close-inside">
            {contentType ? contentType : "Select a content type"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {contentTypeList.map((type) => {
              return (
                <Dropdown.Item
                  onClick={() => {
                    setContentType(type);
                  }}
                >
                  {type}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <div className="detail-section">{editSectionDetailContents()}</div>
      </div>
    </div>
  );
};
