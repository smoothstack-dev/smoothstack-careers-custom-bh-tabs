import { cloneDeep } from "lodash";
import React from "react";
import { Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { QuestionItem } from "../Prescreen/prescreen.constant";

type ProjectItem = {
  type: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

export const ProjectQuestion: React.FC<{
  index: number;
  question: QuestionItem;
  updateAnser: any;
}> = ({ index, question, updateAnser }) => {
  const [projectItems, setProjectItems] = React.useState<ProjectItem[]>([]);
  const [experience, setExperience] = React.useState<number>(0);

  React.useEffect(() => {
    if (question.answer && typeof question.answer === "string") {
      // safe check if there's any invalid string saved before
      if (!question.answer.startsWith("[")) {
        setProjectItems([]);
      } else {
        const parsedJSON = JSON.parse(question.answer);
        if (Array.isArray(parsedJSON)) {
          let projectList: ProjectItem[] = [];
          parsedJSON.forEach((item) => {
            projectList.push({
              type: item.type || "",
              description: item.description || "",
              startDate: new Date(item.startDate),
              endDate: new Date(item.endDate),
            });
          });
          setProjectItems(projectList);
          calculateMonthsOfExperience(projectList);
        }
      }
    }
  }, [question.answer]);

  const updateProjects = (projectIndex: number, project: ProjectItem) => {
    const updatedProjectItems = cloneDeep(projectItems);
    updatedProjectItems[projectIndex] = project;
    setProjectItems(updatedProjectItems);
    updateAnser(question.questionId, JSON.stringify(updatedProjectItems));
    calculateMonthsOfExperience(updatedProjectItems);
  };

  const calculateMonthsOfExperience = (projects: ProjectItem[]) => {
    // calculate total month
    let month = 0;
    projects.forEach((project: ProjectItem) => {
      var diff =
        (project.endDate.getTime() - project.startDate.getTime()) / 1000;
      diff /= 60 * 60 * 24 * 7 * 4;
      month += Math.abs(Math.round(diff));
    });
    setExperience(month);
  };

  const removeProject = (projectIndex: number) => {
    const updatedProjectItems = cloneDeep(projectItems);
    updatedProjectItems.splice(projectIndex, 1);
    setProjectItems(updatedProjectItems);
  };

  const addProjectRow = () => {
    setProjectItems([
      ...projectItems,
      {
        type: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ]);
  };

  return (
    <div>
      <Table striped borderless hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
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
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e: any) => {
                      updatedProject.type = e.target.value;
                      updateProjects(projectIndex, updatedProject);
                    }}
                    value={project.type}
                  ></input>
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
                  <DatePicker
                    selected={project.startDate}
                    onChange={(date) => {
                      if (date) {
                        updatedProject.startDate = date;
                        updateProjects(projectIndex, updatedProject);
                      }
                    }}
                    className="date-picker"
                  />
                </td>
                <td>
                  <DatePicker
                    selected={project.endDate}
                    onChange={(date) => {
                      if (date) {
                        updatedProject.endDate = date;
                        updateProjects(projectIndex, updatedProject);
                      }
                    }}
                    className="date-picker"
                  />
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
      <span>
        <strong>{`Total months of experience: ${experience}`}</strong>
      </span>
      <br />
      <br />
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => addProjectRow()}
      >
        Add More
      </Button>
    </div>
  );
};
