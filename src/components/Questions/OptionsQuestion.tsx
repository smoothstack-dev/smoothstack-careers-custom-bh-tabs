import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  AnswerItem,
  QuestionItem,
  AnswerType,
} from "../Prescreen/prescreen.constant";
import { cloneDeep } from "lodash";
import { checkToShowOtherTextInput } from "../Prescreen/prescreenHelper";

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
        return updateAnser({
          questionId: question.questionId,
          answer: updatedAnswer,
          otherAnswer: question.otherAnswer,
        });
      }
      case "REMOVE": {
        const optionIndex = updatedAnswer.indexOf(optionKey);
        if (index > -1) updatedAnswer.splice(optionIndex, 1);
        if (optionKey === "Other") question.otherAnswer = undefined;
        return updateAnser({
          questionId: question.questionId,
          answer: updatedAnswer,
          otherAnswer: question.otherAnswer,
        });
      }
    }
  };

  const isRequireScaleText = ["candidateRank", "communicationSkills"];
  const textCountLimit = 100;

  switch (question.answerType) {
    case AnswerType.SINGLE:
      return (
        <>
          <div>
            {isRequireScaleText.includes(question.questionId) && (
              <span>(Lowest)</span>
            )}
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
                      let otherAnswer = option.key === "Other" ? "" : undefined;
                      if (
                        checkToShowOtherTextInput(
                          question.questionId,
                          option.key
                        )
                      )
                        otherAnswer = "";
                      setOtherAnswerText(otherAnswer);
                      updateAnser({
                        questionId: question.questionId,
                        answer: option.key,
                        otherAnswer: otherAnswer,
                      });
                    }
                  }}
                >
                  {option.value}
                </Button>
              );
            })}
            {isRequireScaleText.includes(question.questionId) && (
              <span>(Highest)</span>
            )}
          </div>
          {otherAnswerText !== undefined && (
            <>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Please enter your response here"
                onChange={(e: any) => {
                  const ans = e.target.value;
                  if (e.target.value.length <= textCountLimit) {
                    setOtherAnswerText(ans);
                    updateAnser({
                      questionId: question.questionId,
                      answer: question.answer,
                      otherAnswer: ans,
                    });
                  }
                }}
                value={otherAnswerText}
              ></input>
              <span className="text-count">{`${
                question.otherAnswer?.length || 0
              }/${textCountLimit}`}</span>
              <br />
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
                  updateAnser({
                    questionId: question.questionId,
                    answer: question.answer,
                    otherAnswer: value,
                  });
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
