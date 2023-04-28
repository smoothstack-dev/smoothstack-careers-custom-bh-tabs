import React from "react";
import "./App.css";
import Prescreen from "./components/Prescreen/Prescreen";
import { Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobDetailsManagement } from "./components/JobDetailsManagement/JobDetailsManagement";
import { MSSignature } from "./components/MSSignature";
import { MSLoginBtn } from "./components/MSLoginBtn/MSLoginBtn";
import { MainPage } from "./components/MainPage/MainPage";
import useUser from "./components/MSLoginBtn/store/user";

export type HeaderBtnType = {
  text: string;
  func: any;
  isDisabled: boolean;
};

const App: React.FC = () => {
  const [headerLabel, setHeaderLabel] = React.useState<string>("");
  // For Custom Button
  const [headerMsg, setHeaderMsg] = React.useState<string>("");
  const [headerBtn, setHeaderBtn] = React.useState<HeaderBtnType>();

  const { isAuthenticated, isCheckingUser, checkUserAuthentication } =
    useUser();

  React.useEffect(() => {
    if (!isAuthenticated && !isCheckingUser) checkUserAuthentication();
  }, [isAuthenticated, isCheckingUser, checkUserAuthentication]);

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
          <h6 className="float-right header-text warning-msg">
            {headerMsg}
            <Button
              variant="outline-primary"
              onClick={() => headerBtn.func()}
              disabled={headerBtn.isDisabled}
            >
              {headerBtn.text}
            </Button>
          </h6>
        )}
        {!headerBtn && <MSLoginBtn />}
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
          <Route path="/jobDetailsManagement">
            <MSAuth>
              <JobDetailsManagement />
            </MSAuth>
          </Route>
          <Route path="/mssignature">
            <MSAuth>
              <MSSignature />
            </MSAuth>
          </Route>
          <Route path="/">
            <MSAuth>
              <MainPage />
            </MSAuth>
          </Route>
        </Switch>
      </div>
    </>
  );
};

const MSAuth: React.FC<{
  children: any;
}> = ({ children }) => {
  const { isAuthenticated, isCheckingUser } = useUser();
  const loginMsg = "Please log in to your Microsoft Account First!";
  const loadingMsg = "Loading your credential...";
  if (isCheckingUser) return <p>{loadingMsg}</p>;
  if (!isAuthenticated) return <p>{loginMsg}</p>;
  return <div>{children}</div>;
};

export default App;
