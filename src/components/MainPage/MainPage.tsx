import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const MainPage: React.FC<{}> = () => {
  const history = useHistory();
  const handlePageChange = (route: string) => {
    history.push(route);
  };

  return (
    <div>
      <Button
        variant="outline-primary"
        onClick={() => handlePageChange("/jobDetailsManagement")}
      >
        Job Description Management
      </Button>
      <br />
      <br />
      <Button
        variant="outline-primary"
        onClick={() => handlePageChange("/mssignature")}
      >
        Microsoft Signature Setting
      </Button>
    </div>
  );
};
