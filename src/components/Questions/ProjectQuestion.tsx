import { cloneDeep } from "lodash";
import React from "react";
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { QuestionItem } from "../Prescreen/prescreen.constant";

type ProjectItem = {
  type: string;
  description: string;
  months?: string | number;
};

export const ProjectQuestion: React.FC<{
  question: QuestionItem;
  updateAnser: any;
  setSubmitBtnDisabled: (disabled: boolean) => void;
}> = ({ question, updateAnser, setSubmitBtnDisabled }) => {
  const [projectItems, setProjectItems] = React.useState<ProjectItem[]>([]);
  const [experience, setExperience] = React.useState<number>(0);
  const [showInvalidExperience, setShowInvalidExperience] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (question.answer && typeof question.answer === "string") {
      // safe check if there's any invalid string saved before
      if (!question.answer.startsWith("[")) {
        setProjectItems([]);
      } else {
        const parsedJSON = JSON.parse(question.answer);
        if (Array.isArray(parsedJSON)) {
          let projectList: ProjectItem[] = [];
          parsedJSON.forEach((item, index) => {
            projectList.push({
              type: item.type || "",
              description: item.description || "",
              months: item.months || 0,
            });
          });
          setProjectItems(projectList);
          calculateMonthsOfExperience(projectList);
        }
      }
    }
  }, [question.answer]);

  React.useEffect(() => {
    let emptyAnswer: boolean = false;
    projectItems.forEach((project) => {
      emptyAnswer =
        emptyAnswer ||
        !project.type ||
        !project.description ||
        !project.months ||
        +project.months <= 0;
    });
    setShowInvalidExperience(emptyAnswer);
    setSubmitBtnDisabled(emptyAnswer);
  }, [projectItems, setShowInvalidExperience, setSubmitBtnDisabled]);

  const updateProjects = (projectIndex: number, project: ProjectItem) => {
    const updatedProjectItems = cloneDeep(projectItems);
    updatedProjectItems[projectIndex] = project;
    setProjectItems(updatedProjectItems);
    const calculatedMonths = calculateMonthsOfExperience(updatedProjectItems);
    updateAnser(
      {
        questionId: question.questionId,
        answer: JSON.stringify(updatedProjectItems),
      },
      {
        questionId: "monthsOfProjectExperience",
        answer: String(calculatedMonths),
      }
    );
  };

  const calculateMonthsOfExperience = (projects: ProjectItem[]): number => {
    // calculate total month
    let month = 0;
    projects.forEach((project: ProjectItem) => {
      month += isNaN(project.months as any) ? 0 : +(project.months || 0);
    });
    setExperience(month);
    return month;
  };

  const removeProject = (projectIndex: number) => {
    const updatedProjectItems = cloneDeep(projectItems);
    updatedProjectItems.splice(projectIndex, 1);
    setProjectItems(updatedProjectItems);
    const calculatedMonths = calculateMonthsOfExperience(updatedProjectItems);
    updateAnser(
      {
        questionId: question.questionId,
        answer: JSON.stringify(updatedProjectItems),
      },
      {
        questionId: "monthsOfProjectExperience",
        answer: String(calculatedMonths),
      }
    );
  };

  const addProjectRow = () => {
    setShowInvalidExperience(true);
    setProjectItems([
      ...projectItems,
      {
        type: "",
        description: "",
      },
    ]);
  };

  const projectTypeList: string[] = [
    "Internship",
    "Personal Project",
    "School Project",
    "BootCamp",
    "Work Experience",
  ];

  return (
    <div>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Description</th>
            <th>Months of Experience</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {projectItems.map((project: ProjectItem, projectIndex) => {
            const updatedProject = cloneDeep(project);
            return (
              <tr key={`project-${projectIndex}`}>
                <td>{projectIndex + 1}</td>
                <td>
                  <DropdownButton
                    id={`dropdown-${question.questionId}`}
                    variant="light"
                    title={updatedProject.type || "Selete a type"}
                  >
                    {projectTypeList.map((option) => {
                      return (
                        <Dropdown.Item
                          key={`dropdownItem-${question.questionId}-${option}`}
                          onClick={() => {
                            updatedProject.type = option;
                            updateProjects(projectIndex, updatedProject);
                          }}
                        >
                          {option}
                        </Dropdown.Item>
                      );
                    })}
                  </DropdownButton>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    onChange={(e: any) => {
                      updatedProject.description = e.target.value;
                      updateProjects(projectIndex, updatedProject);
                    }}
                    rows={2}
                    value={project.description}
                  ></textarea>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e: any) => {
                      const inputMonth = e.target.value;
                      updatedProject.months = isNaN(inputMonth)
                        ? 0
                        : inputMonth;
                      updateProjects(projectIndex, updatedProject);
                    }}
                    value={project.months || ""}
                  ></input>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => removeProject(projectIndex)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {showInvalidExperience && (
        <div>
          <span className="warning-msg-small">
            Experience with empty type, description, or month will not be saved.
          </span>
          <br />
        </div>
      )}
      <br />
      <div className="float-div">
        <Button
          className="float-left"
          variant="outline-primary"
          size="sm"
          onClick={() => addProjectRow()}
          disabled={projectItems.length >= 10}
        >
          {projectItems.length >= 10 ? "Max experience reached" : "Add More"}
        </Button>

        <span className="float-right">
          <strong>{`Total months of experience: ${experience}`}</strong>
        </span>
      </div>
    </div>
  );
};
