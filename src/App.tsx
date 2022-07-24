import React from "react";
import "./App.css";
import Prescreen from "./components/Prescreen/Prescreen";
import Techscreen from "./components/Techscreen/Techscreen";
import { Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  const [headerLabel, setHeaderLabel] = React.useState<string>("");
  return (
    <>
      <h3 className="App-header">{headerLabel}</h3>
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
