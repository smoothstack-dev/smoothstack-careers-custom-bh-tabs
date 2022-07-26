import React from "react";
import "./App.css";
import Prescreen from "./components/Prescreen/Prescreen";
import Techscreen from "./components/Techscreen/Techscreen";
import { Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";

export type HeaderBtnType = {
  text: string;
  func: any;
};

const App: React.FC = () => {
  const [headerLabel, setHeaderLabel] = React.useState<string>("");
  const [headerMsg, setHeaderMsg] = React.useState<string>("");
  const [headerBtn, setHeaderBtn] = React.useState<HeaderBtnType>();
  return (
    <>
      <div className="App-header float-div">
        <img
          src="https://smoothstack.com/smoothstack-2020-logo/"
          className="float-left header-logo"
          alt="Smoothstack Logo"
        />
        <h5 className="float-right header-text">{headerLabel}</h5>
        {headerMsg && headerBtn && (
          <h5 className="float-right header-text warning-msg">
            {headerMsg}
            <Button variant="outline-primary" onClick={() => headerBtn.func()}>
              {headerBtn.text}
            </Button>
          </h5>
        )}
      </div>
      <div className="container App-container-wrapper">
        <Switch>
          <Route path="/prescreen">
            <Prescreen
              setHeaderLabel={setHeaderLabel}
              setHeaderMsg={setHeaderMsg}
              headerMsg={headerMsg}
              setHeaderBtn={setHeaderBtn}
            />
          </Route>
          <Route path="/techscreen">
            <Techscreen />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
