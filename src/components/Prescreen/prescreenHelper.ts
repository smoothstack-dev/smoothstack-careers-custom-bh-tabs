import { cloneDeep } from "lodash";
import * as API from "../../helpers/api";
import { FormEntry, FORM_TYPE, PrescreenForm } from "../../types/forms";
import {
  AnswerItem,
  AnswerType,
  prescreenFieldQuestions,
  QuestionItem,
} from "./prescreen.constant";

export const getCandidatePrescreenData = async (candidateId: string) => {
  const response = await API.getPrescreenData(candidateId);
  if (response.statusCode && Number(response.statusCode) < 300) {
    const data = response.body;
    const prescreenData = Array.from(prescreenFieldQuestions.keys()).reduce(
      (map, questionId: string) => {
        const question = prescreenFieldQuestions.get(questionId);
        const existingAns = data[questionId];
        if (question) {
          if (existingAns) {
            question.answer = existingAns;
          }

          // Constract Other option
          if (
            (question.answerType === AnswerType.SINGLE ||
              question.answerType === AnswerType.MULTIPLE) &&
            question.answer &&
            question.options
          ) {
            const optionList: string[] = getOptionList(question.options);
            if (optionList.includes("Other")) {
              const otherAnswer = checkMatchedAns(optionList, question.answer);
              if (otherAnswer !== undefined) {
                question.otherAnswer = otherAnswer || "";
                if (question.answerType === AnswerType.SINGLE) {
                  question.answer = "Other";
                }
                if (
                  question.answerType === AnswerType.MULTIPLE &&
                  Array.isArray(question.answer)
                ) {
                  // Remove other answer from answer (has been saved to otherAnswer)
                  question.answer = removeInvalidANswer(
                    question.options,
                    question.answer
                  );
                }
              }
            }
          }

          map.set(questionId, question);
        }
        return map;
      },
      new Map()
    );
    return {
      statusCode: response.statusCode,
      body: prescreenData as Map<string, QuestionItem>,
    };
  } else {
    return response;
  }
};

export const savePrescreenForm = async (
  formItems: Map<string, QuestionItem>
) => {
  const constructedForm = constructPrescreenMessage(formItems);
  return await API.savePrescreenForm(FORM_TYPE.PRESCREEN, constructedForm);
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
        if (
          Array.isArray(item.answer) &&
          item.answer.includes("Other") &&
          item.otherAnswer
        )
          item.answer.push(item.otherAnswer);
        const ans = Array.isArray(item.answer) ? item.answer.join(",") : "";
        prescreenForm[item.questionId] = {
          question: item.question,
          answer: ans,
        } as FormEntry;
        break;
      }
      case AnswerType.SINGLE: {
        prescreenForm[item.questionId] = {
          question: item.question,
          answer:
            item.answer === "Other" && item.otherAnswer
              ? item.otherAnswer
              : (item.answer as string),
        } as FormEntry;
        break;
      }
      case AnswerType.PROJECT: {
        const finalAnswer = cloneDeep(item.answer as string);
        if (!finalAnswer) break;
        let parsedJSON = JSON.parse(finalAnswer);
        if (Array.isArray(parsedJSON)) {
          parsedJSON = parsedJSON.filter((item) => {
            return (
              item.type !== "" &&
              item.description !== "" &&
              item.months &&
              item.months > 0
            );
          });
        }
        prescreenForm[item.questionId] = {
          question: item.question,
          answer: JSON.stringify(parsedJSON),
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

  // For no show
  if (formItems.get("showOnTime")?.answer === "NoShow") {
    prescreenForm["result"] = {
      question: "result",
      answer: "Reject-Prescreen No Show",
    } as FormEntry;
  }

  // add updatedTime to the form
  prescreenForm["updatedTime"] = {
    question: "updatedTime",
    answer: new Date().toLocaleString("en-US"),
  } as FormEntry;

  return prescreenForm as PrescreenForm;
};

const getOptionList = (options: AnswerItem[]): string[] => {
  const optionList: string[] = options.map((option) => option.key);
  return optionList;
};

const checkMatchedAns = (
  optionsList: string[],
  answer: string | string[]
): string | undefined => {
  if (typeof answer === "string") {
    if (!optionsList.includes(answer)) return answer;
    if (answer === "Other") return "";
    return undefined;
  } else {
    // string[]
    if (answer.includes("Other")) {
      const otherValues = answer.filter((ans: string) => {
        return !optionsList.includes(ans);
      });
      return otherValues.join(", ") || "";
    }

    return undefined;
  }
};

const removeInvalidANswer = (options: AnswerItem[], answers: string[]) => {
  let updatedAns: string[] = [];
  const optionList = getOptionList(options);
  answers.forEach((ans) => {
    if (optionList.includes(ans)) updatedAns.push(ans);
  });
  return updatedAns;
};
