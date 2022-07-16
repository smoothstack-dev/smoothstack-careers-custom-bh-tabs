import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { AnswerItem, QuestionItem, AnswerType } from "./prescreen.constant";
import { cloneDeep } from "lodash";

export const PrescreenQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ index, question, updateAnser }) => {
  /* for question that allows multiple answers, 
  instead of saving answer values, store answer key first and then 
  convert it to value before sending payload to backend */
  const updateMultipleAnswer = (
    action: "ADD" | "REMOVE",
    optionKey: string
  ) => {
    let updatedAnswer = Array.isArray(question.answer)
      ? cloneDeep(question.answer)
      : [];
    switch (action) {
      case "ADD": {
        updatedAnswer.push(optionKey);
        return updateAnser(question.questionId, updatedAnswer);
      }
      case "REMOVE": {
        const optionIndex = updatedAnswer.indexOf(optionKey);
        if (index > -1) updatedAnswer.splice(optionIndex, 1);
        return updateAnser(question.questionId, updatedAnswer);
      }
    }
  };
  switch (question.answerType) {
    case AnswerType.TEXT:
      return (
        <input
          type="text"
          className="form-control"
          onChange={(e: any) =>
            updateAnser(question.questionId, e.target.value)
          }
          value={question.answer || ""}
        ></input>
      );
    case AnswerType.TEXTBLOCK:
      return (
        <textarea
          className="form-control"
          onChange={(e: any) =>
            updateAnser(question.questionId, e.target.value)
          }
          value={question.answer || ""}
        ></textarea>
      );
    case AnswerType.SINGLE:
      return (
        <div>
          {question.options?.map((option: AnswerItem, id) => {
            const isSelected =
              question.answer && question.answer === option.key;
            return (
              <Button
                id={`${question.questionId}-${id}`}
                key={`${question.questionId}-${id}`}
                variant="outline-primary"
                size="sm"
                className={
                  isSelected
                    ? "option-button option-button-selected"
                    : "option-button"
                }
                onClick={() => {
                  updateAnser(question.questionId, option.key);
                }}
              >
                {option.value}
              </Button>
            );
          })}
        </div>
      );
    case AnswerType.MULTIPLE:
      return (
        <div>
          {question.options?.map((option: AnswerItem, id) => {
            const isSelected =
              question.answer &&
              Array.isArray(question.answer) &&
              question.answer.includes(option.key);
            return (
              <Button
                id={`${question.questionId}-${id}`}
                key={`${question.questionId}-${id}`}
                variant="outline-primary"
                size="sm"
                className={
                  isSelected
                    ? "option-button option-button-selected"
                    : "option-button"
                }
                onClick={() => {
                  updateMultipleAnswer(
                    isSelected ? "REMOVE" : "ADD",
                    option.key
                  );
                }}
              >
                {option.value}
              </Button>
            );
          })}
        </div>
      );
    case AnswerType.DATE: {
      const date = question.answer
        ? new Date(question.answer as string)
        : undefined;
      return (
        <>
          <DatePicker
            selected={date}
            onChange={(date) => {
              updateAnser(question.questionId, date);
            }}
          />
          <br />
        </>
      );
    }
    case AnswerType.DROPDOWN: {
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
                    onClick={() => updateAnser(question.questionId, option.key)}
                  >
                    {option.value}
                  </Dropdown.Item>
                );
              })}
          </DropdownButton>
          <br />
        </>
      );
    }
    default:
      return null;
  }
};
