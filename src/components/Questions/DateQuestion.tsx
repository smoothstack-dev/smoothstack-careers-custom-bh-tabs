import React from "react";
import DatePicker from "react-datepicker";
import { QuestionItem } from "../Prescreen/prescreen.constant";

export const DateQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ index, question, updateAnser }) => {
  const date = question.answer
    ? new Date(question.answer as string)
    : undefined;
  const startDate =
    question.questionId === "expectedGraduationDate" ? new Date() : undefined;
  const endDate =
    question.questionId === "graduationDate" ? new Date() : undefined;
  return (
    <>
      <DatePicker
        selected={date}
        onChange={(date) => {
          updateAnser({
            questionId: question.questionId,
            answer: date,
          });
        }}
        minDate={startDate}
        maxDate={endDate}
      />
      <br />
    </>
  );
};
