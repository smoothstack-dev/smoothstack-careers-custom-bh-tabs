import React, { useEffect, useState } from "react";
import { cloneDeep, delay } from "lodash";
import {
  QuestionItem,
  prescreenQuestionOrder,
  prescreenLabelOrder,
} from "./prescreen.constant";
import { Button, Spinner } from "react-bootstrap";
import "./prescreen.css";
import { PrescreenQuestion } from "./PrescreenQuestion";
import {
  getCandidatePrescreenData,
  savePrescreenForm,
} from "./prescreenHelper";

export const Prescreen: React.FC = () => {
  const [prescreenData, setPrescreenData] =
    useState<Map<string, QuestionItem>>();
  const [isLoadingData, setLoadingData] = useState<boolean>(false);
  const [isSavingData, setSavingData] = useState<boolean>(false);
  const [candidateId, setCandidateId] = useState<string>("");

  const updateAnser = (questionId: string, answer: string | string[]) => {
    const updatedDate = cloneDeep(prescreenData);
    let question = cloneDeep(prescreenData?.get(questionId) || undefined);
    if (updatedDate && question) {
      question.answer = answer;
      updatedDate.set(question.questionId, question);
      setPrescreenData(updatedDate);
    }
  };

  const loadPrescreenForm = async () => {
    setLoadingData(true);
    const queryParams = new URLSearchParams(window.location.search);
    const candidateId = queryParams.get("EntityID") || "24833"; // TODO: for testing purpose
    setCandidateId(candidateId);
    const prescreenData = await getCandidatePrescreenData(candidateId);
    setPrescreenData(prescreenData);
    setLoadingData(false);
  };

  useEffect(() => {
    loadPrescreenForm();
  }, []);

  if (isLoadingData) return <Spinner animation="border" variant="primary" />;

  const savePrescreen = async () => {
    if (!prescreenData) return;
    setSavingData(true);
    await savePrescreenForm(prescreenData);
    setSavingData(false);
    // need to wait a couple of second for BH to save the data
    setLoadingData(true);
    delay(() => loadPrescreenForm(), 3000);
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
      <h3>Prescreen for candidate #{candidateId}</h3>
      <div>
        {prescreenData &&
          prescreenLabelOrder?.map((questionId: string, index) => {
            const item = prescreenData.get(questionId);
            if (item)
              return (
                <div key={`questionLabel-${index}`}>
                  <label>
                    <strong>{`${item.question}: ${item.answer}`}</strong>
                  </label>
                  <br />
                </div>
              );
          })}
      </div>
      <br />
      <div>
        {prescreenQuestionsToShow &&
          prescreenQuestionsToShow.map((question: QuestionItem, index) => {
            return (
              <div key={`question-${index + 1}`}>
                <label>{`${index + 1}. ${question.question} (ref: ${
                  question.questionId
                })`}</label>
                <PrescreenQuestion
                  index={index}
                  question={question}
                  updateAnser={updateAnser}
                ></PrescreenQuestion>
                <br />
              </div>
            );
          })}
      </div>
      <Button
        variant="outline-primary"
        onClick={savePrescreen}
        disabled={!prescreenData?.get("result")?.answer || isSavingData}
      >
        Save
      </Button>
    </React.Fragment>
  );
};

export default Prescreen;
