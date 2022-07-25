import React, { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { QuestionItem, prescreenQuestionOrder } from "./prescreen.constant";
import { Button, Spinner } from "react-bootstrap";
import "./prescreen.css";
import { Questions } from "../Questions/Questions";
import {
  getCandidatePrescreenData,
  savePrescreenForm,
} from "./prescreenHelper";
import { ErrorMsg } from "../ErrorMsg";

export type UpdateAnswerType = {
  questionId: string;
  answer: string | string[];
  otherAnswer?: string;
};

export const Prescreen: React.FC<{
  setHeaderLabel: any;
}> = ({ setHeaderLabel }) => {
  const [prescreenData, setPrescreenData] =
    useState<Map<string, QuestionItem>>();
  const [isLoadingData, setLoadingData] = useState<boolean>(false);
  const [isLoadingFailed, setLoadingFailed] = useState<boolean>(false);
  const [isSavingData, setSavingData] = useState<boolean>(false);
  const [saveFailedMsg, setSaveFailedMsg] = useState<boolean>(false);
  const [candidateId, setCandidateId] = useState<string>("");
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState<string>("");
  const [errorString, setErrorString] = useState<string>("");

  const updateAnser = (answers: UpdateAnswerType | UpdateAnswerType[]) => {
    if (saveFailedMsg) setSaveFailedMsg(false);
    if (prescreenData) {
      const updatedData = cloneDeep(prescreenData);
      if (!Array.isArray(answers)) answers = [answers];
      answers.forEach((ans) => {
        let question = cloneDeep(
          prescreenData.get(ans.questionId) || undefined
        );
        if (question) {
          question.answer = ans.answer;
          question.otherAnswer = ans.otherAnswer;
          updatedData.set(question.questionId, question);
        }
      });
      setPrescreenData(updatedData);
    }
  };

  const loadingFailed = (msg: string) => {
    console.error("failed loding prescreen form");
    setErrorString(msg);
    setLoadingFailed(true);
    setLoadingData(false);
  };

  const loadPrescreenForm = async () => {
    setLoadingFailed(false);
    setLoadingData(true);
    const queryParams = new URLSearchParams(window.location.search);
    const test = `${window.location.search} ${JSON.stringify(queryParams)}`;
    setErrorString(test);
    const id = queryParams.get("EntityID");
    let prescreenResponse;
    if (id) {
      setCandidateId(id);
      prescreenResponse = await getCandidatePrescreenData(id);
      if (
        prescreenResponse.statusCode &&
        Number(prescreenResponse.statusCode) < 300
      ) {
        setPrescreenData(prescreenResponse.body);
        setLoadingData(false);
        return;
      } else {
        loadingFailed(
          `Faild: ${test}, ID:${id}, DATA: ${JSON.stringify(prescreenResponse)}`
        );
      }
    } else {
      loadingFailed(
        `Faild: ${test}, ID:${id}, DATA: ${JSON.stringify(prescreenResponse)}`
      );
    }
  };

  useEffect(() => {
    if (!prescreenData && !isLoadingData && !isLoadingFailed)
      loadPrescreenForm();
  });

  useEffect(() => {
    if (prescreenData) {
      const first = prescreenData?.get("firstName")?.answer || "";
      const last = prescreenData?.get("lastName")?.answer || "";
      const nick = prescreenData?.get("nickName")?.answer
        ? `(${prescreenData?.get("nickName")?.answer})`
        : "";
      const headerLabel = `Prescreen for ${first} ${last} ${nick} #${candidateId}`;
      setHeaderLabel(headerLabel);
      setCandidateName(`${first} ${nick}`);
      const answer = prescreenData.get("showOnTime")?.answer;
      if (answer && ["Yes", "Late"].includes(answer as string)) {
        setShowAllQuestions(true);
      } else {
        setShowAllQuestions(false);
      }
    }
  }, [prescreenData, candidateId, setHeaderLabel, errorString]);

  if (isLoadingFailed)
    return (
      <ErrorMsg message={errorString} reload={loadPrescreenForm}></ErrorMsg>
    );
  if (isLoadingData) return <Spinner animation="border" variant="primary" />;

  const savePrescreen = async () => {
    if (!prescreenData) return;
    setSavingData(true);
    setSaveFailedMsg(false);
    const response = await savePrescreenForm(prescreenData);
    setSavingData(false);
    if (response.statusCode && response.statusCode > 300) {
      console.error("Failed saving data");
      setSaveFailedMsg(true);
    } else {
      loadPrescreenForm();
    }
  };

  const prescreenQuestionsToShow = prescreenData
    ? prescreenQuestionOrder?.reduce(
        (list: QuestionItem[], questionId: string) => {
          const item = prescreenData.get(questionId);
          if (item) {
            const dependence = item.dependenceIds;
            const toShow: boolean = dependence
              ? dependence.every((dep) => {
                  const answer = prescreenData.get(dep.questionId)?.answer;
                  if (!answer) return false;
                  return dep.expectedAnswer
                    ? dep.expectedAnswer.includes(answer as string)
                    : true;
                })
              : true;
            if (toShow) list.push(item);
          }
          return list;
        },
        []
      )
    : undefined;

  return (
    <React.Fragment>
      <div aria-disabled={isSavingData}>
        {prescreenData && prescreenData.has("showOnTime") && (
          <div key="question-1">
            <label>{`1. Did ${candidateName} show up for prescreen on time?`}</label>
            <Questions
              index={1}
              question={prescreenData.get("showOnTime") as QuestionItem}
              updateAnser={updateAnser}
              prescreenData={prescreenData}
            ></Questions>
            <br />
          </div>
        )}
        {showAllQuestions &&
          prescreenQuestionsToShow &&
          prescreenQuestionsToShow.map((question: QuestionItem, index) => {
            return (
              <div key={`question-${index + 1}`}>
                <label>{`${index + 2}. ${question.question}`}</label>
                <Questions
                  index={index}
                  question={question}
                  updateAnser={updateAnser}
                  prescreenData={prescreenData}
                ></Questions>
                <br />
              </div>
            );
          })}
      </div>
      <Button
        variant="outline-primary"
        onClick={() => savePrescreen()}
        disabled={!prescreenData?.get("result")?.answer || isSavingData}
      >
        Save
      </Button>
      {isSavingData && <Spinner animation="border" variant="secondary" />}
      <br />
      {saveFailedMsg && (
        <span className="warning-msg">Failed to save data</span>
      )}
    </React.Fragment>
  );
};

export default Prescreen;
