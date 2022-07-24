import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { QuestionItem } from "../Prescreen/prescreen.constant";

export const DropdownQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ index, question, updateAnser }) => {
  const title =
    question.options && question.answer
      ? question.options.find((i) => i.key === question.answer)?.value
      : "Select State";
  return (
    <>
      <DropdownButton
        id={`dropdown-${question.questionId}`}
        variant="light"
        title={title}
      >
        {question.options &&
          question.options.map((option) => {
            return (
              <Dropdown.Item
                key={`dropdownItem-${question.questionId}-${option.key}`}
                onClick={() =>
                  updateAnser({
                    questionId: question.questionId,
                    answer: option.key,
                  })
                }
              >
                {option.value}
              </Dropdown.Item>
            );
          })}
      </DropdownButton>
      <br />
    </>
  );
};
