import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "react-bootstrap";

/**
 * Renders a sign-out button
 */
export const MSLoginBtn = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const handleMSBtnClick = () => {
        if (isAuthenticated) {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        } else {
            instance.loginRedirect(loginRequest).catch(e => {
                console.error(e);
            });
        }
    }
    return (
        <h6 className="float-right header-text warning-msg">
        <Button
          variant="outline-primary"
          onClick={() =>handleMSBtnClick()}
        >
          {isAuthenticated ? "Sign Out": "Sign In"}
        </Button>
      </h6>
    )
}