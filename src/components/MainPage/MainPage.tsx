import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const MainPage: React.FC<{}> = ({}) => {
  const history = useHistory();
  const handlePageChange = () => {
    history.push("/jobDetailsManagement");
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={() => handlePageChange()}>
        Job Description Management
      </Button>
    </div>
  );
};
