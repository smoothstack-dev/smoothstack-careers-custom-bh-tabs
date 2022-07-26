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
                  <label className="question-title">{item.question}</label>
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
      const nick = prescreenData?.get("nickName")?.answer || "";

      // Address
      const address1 = prescreenData?.get("address1")?.answer || "";
      const address2 = prescreenData?.get("address2")?.answer || "";
      const city = prescreenData?.get("city")?.answer || "";
      const state = prescreenData?.get("state")?.answer || "";
      const zip = prescreenData?.get("zip")?.answer || "";
      const addressLine1 = address2 ? `${address1} ${address2}` : address1;
      const addressLine2 = [city, state, zip]
        .filter((i) => i !== "")
        .join(", ");
      const county = prescreenData?.get("county")?.answer || "";

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
          <div>
            <strong>First Name: </strong>
            {first} <br />
            <strong>Last Name: </strong> {last} <br />
            <strong>Nick Name: </strong> {nick} <br />
          </div>
          <br />
          <div>
            <span>
              <strong>Address: </strong>
            </span>
            <div>
              {addressLine1}
              {addressLine1 && addressLine2 && <br />}
              {addressLine2}
            </div>
            <br />
            <strong>County: </strong>
            {county}
          </div>
        </div>
      );
    }
  }
};
