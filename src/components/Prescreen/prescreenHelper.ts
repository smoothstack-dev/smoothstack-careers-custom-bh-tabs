import { getPrescreenData, saveForm } from "../../helpers/api";
import { FormEntry, FORM_TYPE, PrescreenForm } from "../../types/forms";
import {
  AnswerType,
  prescreenLabelOrder,
  prescreenQuestionOrder,
  prescreenFieldQuestions,
  QuestionItem,
} from "./prescreen.constant";

export const getCandidatePrescreenData = async (candidateId: string) => {
  const data = await getPrescreenData(candidateId);
  const prescreenData = [
    ...prescreenLabelOrder,
    ...prescreenQuestionOrder,
  ].reduce((map, questionId) => {
    const question = prescreenFieldQuestions.get(questionId);
    const existingAns = data[questionId];
    if (question) {
      if (existingAns) {
        question.answer = existingAns;
      }
      map.set(questionId, question);
    }
    return map;
  }, new Map());
  return prescreenData as Map<string, QuestionItem>;
};

export const savePrescreenForm = async (
  formItems: Map<string, QuestionItem>
) => {
  const constructedForm = constructPrescreenMessage(formItems);
  return await saveForm(FORM_TYPE.PRESCREEN, constructedForm);
};

const clearDegreeFields = (
  formItems: Map<string, QuestionItem>
): Map<string, QuestionItem> => {
  const isStudent = formItems.get("isStudent")?.answer;
  if (isStudent) {
    if (isStudent === "Yes") {
      formItems.delete("highestDegree");
      formItems.delete("graduationDate");
    } else if (isStudent === "No") {
      formItems.delete("expectedDegree");
      formItems.delete("expectedGraduationDate");
    }
  }
  return formItems;
};

const constructPrescreenMessage = (
  formItems: Map<string, QuestionItem>
): PrescreenForm => {
  let prescreenForm: Record<string, any> = {};
  clearDegreeFields(formItems).forEach((item: QuestionItem) => {
    if (!item.answer) return;

    switch (item.answerType) {
      case AnswerType.MULTIPLE: {
        const ans = Array.isArray(item.answer) ? item.answer.join(",") : "";
        prescreenForm[item.questionId] = {
          question: item.question,
          answer: ans,
        } as FormEntry;
        break;
      }
      default: {
        prescreenForm[item.questionId] = {
          question: item.question,
          answer: item.answer as string,
        } as FormEntry;
        break;
      }
    }
  });
  // add updatedTime to the form
  prescreenForm["updatedTime"] = {
    question: "updatedTime",
    answer: new Date().toLocaleString("en-US"),
  } as FormEntry;

  console.log("prescreenForm", prescreenForm);
  return prescreenForm as PrescreenForm;
};
