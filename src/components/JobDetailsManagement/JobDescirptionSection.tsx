import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import { JobDescriptionDetailsType } from "./jobDetailsManagementHelper";
import { JobDescriptionSectionDetails } from "./JobDescriptionSectionDetails";

export const JobDescriptionSection: React.FC<{
  section: JobDescriptionDetailsType[];
  sectionIndex: number;
  updateSections: any;
  updateSectionDetails: any;
  setShowModal: any;
  salary?: string;
}> = ({
  section,
  sectionIndex,
  updateSections,
  updateSectionDetails,
  setShowModal,
  salary,
}) => {
  return (
    <div className="section-container float-div">
      <div className="float-div">
        <p className="float-left">
          <strong>Section {sectionIndex + 1}</strong>
        </p>
        <Button
          className="float-right button-input"
          size="sm"
          variant="outline-primary"
          onClick={() => updateSections("REMOVE", sectionIndex)}
        >
          Remove Section
        </Button>
        <Button
          variant="outline-primary"
          className="float-right"
          size="sm"
          onClick={() => setShowModal(true)}
        >
          Show JD Data
        </Button>
      </div>
      <Droppable droppableId={`section-${sectionIndex}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {section.map((sectionDetails, detailIndex) => {
              return (
                <JobDescriptionSectionDetails
                  key={`${sectionIndex}-${detailIndex}`}
                  sectionDetails={sectionDetails}
                  sectionIndex={sectionIndex}
                  index={detailIndex}
                  updateSectionDetails={updateSectionDetails}
                  salary={salary}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button
        className="float-left button-input"
        size="sm"
        variant="outline-primary"
        onClick={() => updateSectionDetails("ADD", sectionIndex)}
      >
        Add Part
      </Button>
    </div>
  );
};
