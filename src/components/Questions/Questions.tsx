import React from "react";
import { AnswerType, QuestionItem } from "../Prescreen/prescreen.constant";
import { DateQuestion } from "./DateQuestion";
import { DropdownQuestion } from "./DropdownQuestion";
import { OptionsQuestion } from "./OptionsQuestion";
import { ProjectQuestion } from "./ProjectQuestion";
import { RatingQuestion } from "./RatingQuestion";
import { TextQuestion } from "./TextQuestion";
import { ViewAndEditQuestion } from "./ViewAndEditQuestion";

export const Questions: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
  setSubmitBtnDisabled: (disabled: boolean) => void;
  prescreenData?: Map<string, QuestionItem>;
}> = ({
  index,
  question,
  updateAnser,
  setSubmitBtnDisabled,
  prescreenData,
}) => {
  switch (question.answerType) {
    case AnswerType.TEXT:
    case AnswerType.TEXTBLOCK: {
      return (
        <TextQuestion
          index={index}
          question={question}
          updateAnser={updateAnser}
        ></TextQuestion>
      );
    }
    case AnswerType.SINGLE:
    case AnswerType.MULTIPLE: {
      return (
        <OptionsQuestion
          index={index}
          question={question}
          updateAnser={updateAnser}
        ></OptionsQuestion>
      );
    }
    case AnswerType.DROPDOWN: {
      return (
        <DropdownQuestion
          index={index}
          question={question}
          updateAnser={updateAnser}
        ></DropdownQuestion>
      );
    }
    case AnswerType.DATE: {
      return (
        <DateQuestion
          index={index}
          question={question}
          updateAnser={updateAnser}
        ></DateQuestion>
      );
    }
    case AnswerType.PROJECT: {
      return (
        <ProjectQuestion
          question={question}
          updateAnser={updateAnser}
          setSubmitBtnDisabled={setSubmitBtnDisabled}
        ></ProjectQuestion>
      );
    }
    case AnswerType.VIEWANDEDIT: {
      return (
        <ViewAndEditQuestion
          index={index}
          question={question}
          updateAnser={updateAnser}
          setSubmitBtnDisabled={setSubmitBtnDisabled}
          prescreenData={prescreenData}
        ></ViewAndEditQuestion>
      );
    }
    case AnswerType.RATING: {
      return (
        <RatingQuestion
          index={index}
          question={question}
          updateAnser={updateAnser}
        ></RatingQuestion>
      );
    }
    default:
      return null;
  }
};
