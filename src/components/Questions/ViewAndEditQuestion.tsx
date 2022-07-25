import React from "react";
import { Button } from "react-bootstrap";
import { QuestionItem } from "../Prescreen/prescreen.constant";
import { Questions } from "./Questions";

export const ViewAndEditQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
  prescreenData?: Map<string, QuestionItem>;
}> = ({ question, updateAnser, prescreenData }) => {
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

  switch (isEditMode) {
    case true: {
      return (
        <div className="view-and-edit-container">
          <div className="float-div">
            <Button
              variant="outline-primary"
              onClick={() => setIsEditMode(false)}
              className="float-right"
              size="sm"
            >
              Close
            </Button>
          </div>
          {question.viewGroupIds &&
            question.viewGroupIds.map((itemId: string, index) => {
              const item: QuestionItem | undefined = prescreenData?.get(itemId);
              if (!item) return null;
              return (
                <div key={`question-${index}`}>
                  <label>
                    <strong>{item.question}</strong>
                  </label>
                  <Questions
                    index={index}
                    question={item}
                    updateAnser={updateAnser}
                    prescreenData={prescreenData}
                  ></Questions>
                  <br />
                </div>
              );
            })}
        </div>
      );
    }
    case false: {
      // Name
      const first = prescreenData?.get("firstName")?.answer || "";
      const last = prescreenData?.get("lastName")?.answer || "";
      const nick = prescreenData?.get("nickName")?.answer
        ? `(${prescreenData?.get("nickName")?.answer})`
        : "";
      const name = `${first} ${last} ${nick}`;

      // Address
      const address1 = prescreenData?.get("address1")?.answer || "";
      const address2 = prescreenData?.get("address2")?.answer || "";
      const city = prescreenData?.get("city")?.answer || "";
      const state = prescreenData?.get("state")?.answer || "";
      const zip = prescreenData?.get("zip")?.answer || "";
      const address = `${address1} ${address2}, ${city}, ${state}, ${zip}`;

      return (
        <div className="view-and-edit-container">
          <div className="float-div">
            <Button
              variant="outline-primary"
              onClick={() => setIsEditMode(true)}
              className="float-right"
              size="sm"
            >
              Edit
            </Button>
          </div>
          <span>
            <strong>Name: </strong>
            {name}
          </span>
          <br />
          <span>
            <strong>Address: </strong>
            {address}
          </span>
        </div>
      );
    }
  }
};
