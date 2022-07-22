import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  AnswerItem,
  QuestionItem,
  AnswerType,
} from "../Prescreen/prescreen.constant";
import { cloneDeep } from "lodash";

export const OptionsQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ index, question, updateAnser }) => {
  /* for question that allows multiple answers, 
  instead of saving answer values, store answer key first and then 
  convert it to value before sending payload to backend */

  const [otherAnswerText, setOtherAnswerText] = React.useState<
    string | undefined
  >(cloneDeep(question.otherAnswer));

  useEffect(() => {
    setOtherAnswerText(question.otherAnswer);
  }, [question.otherAnswer, question.answer]);

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
        if (optionKey === "Other") question.otherAnswer = "";
        return updateAnser(
          question.questionId,
          updatedAnswer,
          question.otherAnswer
        );
      }
      case "REMOVE": {
        const optionIndex = updatedAnswer.indexOf(optionKey);
        if (index > -1) updatedAnswer.splice(optionIndex, 1);
        if (optionKey === "Other") question.otherAnswer = undefined;
        return updateAnser(
          question.questionId,
          updatedAnswer,
          question.otherAnswer
        );
      }
    }
  };

  switch (question.answerType) {
    case AnswerType.SINGLE:
      return (
        <>
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
                    if (question.answer !== option.key) {
                      const otherAnswer =
                        option.key === "Other" ? "" : undefined;
                      setOtherAnswerText(otherAnswer);
                      updateAnser(question.questionId, option.key, otherAnswer);
                    }
                  }}
                >
                  {option.value}
                </Button>
              );
            })}
          </div>
          {otherAnswerText !== undefined && (
            <>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Please enter other answer here"
                onChange={(e: any) => {
                  const ans = e.target.value;
                  setOtherAnswerText(ans);
                  updateAnser(question.questionId, question.answer, ans);
                }}
                value={otherAnswerText}
              ></input>
            </>
          )}
        </>
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
          {otherAnswerText !== undefined && (
            <>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Please enter other answer here"
                onChange={(e: any) => {
                  const value = e.target.value;
                  setOtherAnswerText(e.target.value);
                  updateAnser(question.questionId, question.answer, value);
                }}
                value={otherAnswerText}
              ></input>
            </>
          )}
        </div>
      );
    default:
      return null;
  }
};
