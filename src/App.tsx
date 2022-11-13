import React from "react";
import "./App.css";
import Prescreen from "./components/Prescreen/Prescreen";
import { Route, Switch } from "react-router-dom";
import { Button } from "react-bootstrap";
import { JobDetailsManagement } from "./components/JobDetailsManagement/JobDetailsManagement";
import { MSSignature } from "./components/MSSignature/MSSignature";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { MSLoginBtn } from "./components/MSLoginBtn/MSLoginBtn";
import { MainPage } from "./components/MainPage/MainPage";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
import { validateMSEmailAccess } from "./helpers/api";

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
  const [graphData, setGraphData] = React.useState(undefined);
  const [isUserAccountAllowed, setUserAccountAllowed] = React.useState<
    undefined | boolean
  >(undefined);

  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Once user logs in, auto retrieve user details
  React.useEffect(() => {
    const requestProfileData = async () => {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken).then(async (response) => {
            setGraphData(response);
            const email = response.mail;
            const isAllowed = await validateMSEmailAccess(email);
            setUserAccountAllowed(isAllowed);
          });
        })
        .catch((error) => {
          console.error("requestProfileData", error);
          setUserAccountAllowed(false);
        });
    };

    if (isAuthenticated && !graphData) {
      requestProfileData();
    }
  }, [isAuthenticated, graphData, instance, accounts]);

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
            <MSAuth isUserAccountAllowed={isUserAccountAllowed}>
              <JobDetailsManagement />
            </MSAuth>
          </Route>
          <Route path="/msSignature">
            <MSSignature />
          </Route>
          <Route path="/">
            <MSAuth isUserAccountAllowed={isUserAccountAllowed}>
              <MainPage />
            </MSAuth>
          </Route>
        </Switch>
      </div>
    </>
  );
};

const MSAuth: React.FC<{
  isUserAccountAllowed: undefined | boolean;
  children: any;
}> = ({ isUserAccountAllowed, children }) => {
  const msg =
    isUserAccountAllowed === undefined
      ? "Loading your credential..."
      : "Sorry, you do not have permission to access to this portal";
  return (
    <div>
      <AuthenticatedTemplate>
        {isUserAccountAllowed ? children : msg}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        Please log in to your Microsoft Account First!
      </UnauthenticatedTemplate>
    </div>
  );
};

export default App;
