import React from "react";
import { Button } from "react-bootstrap";

export const ErrorMsg: React.FC<{
  message: string;
  reload: any;
}> = ({ message, reload }) => {
  return (
    <>
      <span className="warning-msg">{message}</span>
      <br />
      <Button variant="outline-primary" onClick={() => reload()}>
        Reload the page
      </Button>
    </>
  );
};
