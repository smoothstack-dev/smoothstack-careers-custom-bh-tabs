import React from "react";
import { QuestionItem, AnswerType } from "../Prescreen/prescreen.constant";

export const TextQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ question, updateAnser }) => {
  switch (question.answerType) {
    case AnswerType.TEXT:
      return (
        <input
          type="text"
          className="form-control"
          onChange={(e: any) =>
            updateAnser({
              questionId: question.questionId,
              answer: e.target.value,
            })
          }
          value={question.answer || ""}
        ></input>
      );
    case AnswerType.TEXTBLOCK:
      return (
        <textarea
          className="form-control"
          onChange={(e: any) =>
            updateAnser({
              questionId: question.questionId,
              answer: e.target.value,
            })
          }
          rows={(question.answer?.length || 0) / 80 + 2}
          value={question.answer || ""}
        ></textarea>
      );
    default:
      return null;
  }
};
