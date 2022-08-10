import React from "react";
import { QuestionItem, AnswerType } from "../Prescreen/prescreen.constant";

export const TextQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ question, updateAnser }) => {
  const textCountLimit = question.textCountLimit || 100;
  switch (question.answerType) {
    case AnswerType.TEXT:
      return (
        <>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => {
              if (e.target.value.length <= textCountLimit)
                updateAnser({
                  questionId: question.questionId,
                  answer: e.target.value,
                });
            }}
            value={question.answer || ""}
          ></input>
          <span className="text-count">{`${
            question.answer?.length || 0
          }/${textCountLimit}`}</span>
          <br />
        </>
      );
    case AnswerType.TEXTBLOCK:
      return (
        <>
          <textarea
            className="form-control"
            onChange={(e: any) => {
              if (e.target.value.length <= textCountLimit)
                updateAnser({
                  questionId: question.questionId,
                  answer: e.target.value,
                });
            }}
            rows={(question.answer?.length || 0) / 80 + 2}
            value={question.answer || ""}
          ></textarea>
          <span className="text-count">{`${
            question.answer?.length || 0
          }/${textCountLimit}`}</span>
          <br />
        </>
      );
    default:
      return null;
  }
};
