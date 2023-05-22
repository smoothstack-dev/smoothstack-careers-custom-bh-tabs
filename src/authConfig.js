/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: "e9c3461f-65a0-4db3-b07c-89d8676ad56c",
    authority:
      "https://login.microsoftonline.com/7824f42c-45bd-47d8-8d15-275c536fa0a2",
    redirectUri:
      "https://smoothstack.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=5o06nvi1kbdbcd8qb10fob49r7&response_type=token&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=http%3A%2F%2Flocalhost%3A4001",
    // redirectUri:
    //   "https://smoothstack.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=5o06nvi1kbdbcd8qb10fob49r7&response_type=token&scope=aws.cognito.signin.user.admin+email+openid&redirect_uri=https%3A%2F%2Fmanage.smoothstack.com",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["User.Read"],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
