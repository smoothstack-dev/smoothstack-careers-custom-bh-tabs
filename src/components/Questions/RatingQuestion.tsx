import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AnswerItem, QuestionItem } from "../Prescreen/prescreen.constant";
import { IconContext } from "react-icons";
import { AiFillStar } from "react-icons/ai";

export const RatingQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ index, question, updateAnser }) => {
  const renderTooltip = (label: string) => (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        color: "blakc",
        fontWeight: 600,
        fontSize: "0.8rem",
      }}
    >
      {label}
    </div>
  );
  return (
    <>
      <div>
        {question.options?.map((option: AnswerItem, id) => {
          const isSelected = question.answer && +question.answer >= +option.key;
          const iconColor = isSelected ? "#f2f20d" : "#f2f2f2";
          return (
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip(option.value)}
            >
              <label
                onClick={() => {
                  updateAnser({
                    questionId: question.questionId,
                    answer: option.key,
                  });
                }}
                style={{ margin: "4px" }}
              >
                <IconContext.Provider
                  value={{
                    color: iconColor,
                    size: "35px",
                  }}
                >
                  <div>
                    <AiFillStar />
                  </div>
                </IconContext.Provider>
              </label>
            </OverlayTrigger>
          );
        })}
      </div>
    </>
  );
};
