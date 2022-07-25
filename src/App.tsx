import React from "react";
import "./App.css";
import Prescreen from "./components/Prescreen/Prescreen";
import Techscreen from "./components/Techscreen/Techscreen";
import { Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  const [headerLabel, setHeaderLabel] = React.useState<string>(
    "Loading custom tab data..."
  );
  return (
    <>
      <div className="App-header float-div">
        <img
          src="https://smoothstack.com/logo/"
          className="float-left header-logo"
          alt="Smoothstack Logo"
        />
        <h3 className="float-right header-text">{headerLabel}</h3>
      </div>
      <div className="container App-container-wrapper">
        <Switch>
          <Route path="/prescreen">
            <Prescreen setHeaderLabel={setHeaderLabel} />
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
