import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Col, Row } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import {
  ChallengeInfoContentType,
  JobChallengeDetailsType,
  JobChallengeListType,
} from "./jobDetailsManagementHelper";
import { cloneDeep } from "lodash";

export const JobChallengeInfoDetails: React.FC<{
  jobChallengeInfoDetails: JobChallengeDetailsType;
  index: number;
  udpateChallengeInfoDetails: any;
}> = ({ jobChallengeInfoDetails, index, udpateChallengeInfoDetails }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const detailId = `challenge-${index}`;
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
                sectionDetails={jobChallengeInfoDetails}
                detailId={detailId}
                setIsEdit={setIsEdit}
              />
            ) : (
              <EditSectionDetails
                details={cloneDeep(jobChallengeInfoDetails)}
                setIsEdit={setIsEdit}
                index={index}
                udpateChallengeInfoDetails={udpateChallengeInfoDetails}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

const ViewOnlySectionDetails: React.FC<{
  sectionDetails: JobChallengeDetailsType;
  detailId: string;
  setIsEdit: any;
}> = ({ sectionDetails, detailId, setIsEdit }) => {
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
        {sectionDetails.contentType === "PARAGRAPH" &&
          sectionDetails.stringContents && (
            <div>
              {sectionDetails.stringContents.map((content, pIndex) => {
                if (typeof content !== "string") return <></>;
                return <p key={`p-${detailId}-${pIndex}`}>{content}</p>;
              })}
            </div>
          )}
        {sectionDetails.contentType === "LIST" && sectionDetails.listContents && (
          <ul>
            {sectionDetails.listContents.map((content, listIndex) => {
              if (typeof content === "string") return <></>;
              return (
                <>
                  <span key={`list-title-${detailId}-${listIndex}`}>
                    <strong>{content.title}</strong>
                  </span>
                  &nbsp;
                  <span key={`list-content-${detailId}-${listIndex}`}>
                    {content.content}
                  </span>
                  <br />
                </>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const EditSectionDetails: React.FC<{
  details: JobChallengeDetailsType;
  setIsEdit: any;
  index: number;
  udpateChallengeInfoDetails: any;
}> = ({ details, setIsEdit, index, udpateChallengeInfoDetails }) => {
  const [contentType, setContentType] = useState<ChallengeInfoContentType>(
    details.contentType
  );
  const [listContents, setListContents] = useState<JobChallengeListType[]>([]);
  const [stringContents, setStringContents] = useState<string[]>([]);

  useEffect(() => {
    if (details.contentType === "PARAGRAPH")
      setStringContents(details.stringContents || []);
    if (details.contentType === "LIST")
      setListContents(details.listContents || []);
  }, [details]);

  const saveContent = () => {
    if (contentType === "PARAGRAPH") {
      const newContent = {
        contentType: contentType,
        stringContents: stringContents.filter((c: string) => c !== ""),
        listContents: undefined,
      } as JobChallengeDetailsType;
      udpateChallengeInfoDetails("UPDATE", index, newContent);
    } else {
      const newContent = {
        contentType: contentType,
        stringContents: undefined,
        listContents: listContents.filter(
          (c: JobChallengeListType) => c.content !== "" && c.title !== ""
        ),
      } as JobChallengeDetailsType;
      udpateChallengeInfoDetails("UPDATE", index, newContent);
    }
    setIsEdit(false);
  };

  const contentTypeList: ChallengeInfoContentType[] = ["PARAGRAPH", "LIST"];

  const updateTextContent = (textIndex: number, value: string) => {
    if (!stringContents || stringContents.length - 1 < textIndex) return;
    const updatedContents = cloneDeep(stringContents);
    updatedContents[textIndex] = value;
    setStringContents(updatedContents);
  };

  const updateListContent = (
    listIndex: number,
    title: string,
    content: string
  ) => {
    if (!listContents || listContents.length - 1 < listIndex) return;
    const updatedContents = cloneDeep(listContents);
    updatedContents[listIndex] = {
      title: title,
      content: content,
    } as JobChallengeListType;
    setListContents(updatedContents);
  };

  const removeTextContent = (textIndex: number) => {
    if (!stringContents || stringContents.length - 1 < textIndex) return;
    const updatedContents = cloneDeep(stringContents);
    updatedContents.splice(textIndex, 1);
    setStringContents(updatedContents);
  };

  const removeListContent = (listIndex: number) => {
    if (!listContents || listContents.length < listIndex) return;
    const updatedContents = cloneDeep(listContents);
    updatedContents.splice(listIndex, 1);
    setListContents(updatedContents);
  };

  const editSectionDetailContents = () => {
    switch (contentType) {
      case "LIST": {
        return (
          <div className="float-div">
            <span>
              <strong>Contents:</strong>
            </span>
            {listContents.map(
              (c: string | JobChallengeListType, cIndex: number) => {
                if (typeof c === "string") return <></>;
                return (
                  <>
                    <div>
                      <Container>
                        <Row>
                          <Col>
                            <input
                              type="text"
                              className="form-control text-input float-left"
                              placeholder="List Title"
                              onChange={(e: any) =>
                                updateListContent(
                                  cIndex,
                                  e.target.value || "",
                                  c.content
                                )
                              }
                              value={c.title || ""}
                            ></input>
                          </Col>
                          <Col xs={6}>
                            <input
                              type="text"
                              className="form-control text-input float-left"
                              placeholder="List Content"
                              onChange={(e: any) =>
                                updateListContent(
                                  cIndex,
                                  c.title,
                                  e.target.value || ""
                                )
                              }
                              value={c.content || ""}
                            ></input>
                          </Col>
                          <Col>
                            <Button
                              className="float-right remove-btn"
                              size="sm"
                              variant="light"
                              onClick={() => removeListContent(cIndex)}
                            >
                              X
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                    <br />
                  </>
                );
              }
            )}
            <br />
            <br />
            <Button
              className="float-left button-input"
              size="sm"
              variant="outline-primary"
              onClick={() => {
                const udpated = cloneDeep(listContents);
                udpated.push({} as JobChallengeListType);
                setListContents(udpated);
              }}
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
              <strong>Contents:</strong>
            </span>
            {stringContents.map(
              (c: string | JobChallengeListType, cIndex: number) => {
                if (typeof c !== "string") return <></>;
                return (
                  <div>
                    <input
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
              }
            )}
            <br />
            <br />
            <Button
              className="float-left button-input"
              size="sm"
              variant="outline-primary"
              onClick={() => {
                const udpated = cloneDeep(stringContents);
                udpated.push("");
                setStringContents(udpated);
              }}
            >
              Add content
            </Button>
          </div>
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
            udpateChallengeInfoDetails("REMOVE", index);
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
            {contentTypeList.map((type: ChallengeInfoContentType) => {
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
