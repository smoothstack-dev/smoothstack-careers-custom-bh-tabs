import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { Button } from "react-bootstrap";
import useUser from "./store/user";

/**
 * Renders a sign-out button
 */
export const MSLoginBtn = () => {
    const { instance } = useMsal();
    const {isAuthenticated, isCheckingUser} = useUser();
    const handleMSBtnClick = () => {
        if (isAuthenticated) {
            // log out
            sessionStorage.clear()
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
          disabled={isCheckingUser}
        >
          {isCheckingUser ? "Loading" : isAuthenticated ? "Sign Out": "Sign In"}
        </Button>
      </h6>
    )
}