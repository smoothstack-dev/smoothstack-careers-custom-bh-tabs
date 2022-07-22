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
};
