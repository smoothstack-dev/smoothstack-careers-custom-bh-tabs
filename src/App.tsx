import React from "react";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import Prescreen from "./components/Prescreen/Prescreen";
import Techscreen from "./components/Techscreen/Techscreen";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container App-container-wrapper">
      <Row className="justify-content-md-center">
        <Col md={2} />
        <Col md={8}>
          <Switch>
            <Route path="/prescreen">
              <Prescreen />
            </Route>
            <Route path="/techscreen">
              <Techscreen />
            </Route>
          </Switch>
        </Col>
        <Col md={2} />
      </Row>
    </div>
  );
}

export default App;
