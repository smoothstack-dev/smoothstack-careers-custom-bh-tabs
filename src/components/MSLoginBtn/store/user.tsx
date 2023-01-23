import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import * as API from "../../../helpers/api";
import { useWithImmer } from "../../../helpers/use-with-immer";
import { SESSION_EXPIRE_TS, SESSION_USER_TOKEN } from "./literal";
import { User } from "./types";

export const userStore = atom<User>({
  key: "ss_user",
  default: { isAuthenticated: false },
});

export default function useUser() {
  const [user, setUser] = useWithImmer(useRecoilState(userStore));
  const [isCheckingUser, setIsCheckingUser] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();

  const checkTokenExpired = () => {
    // Check every 1 minute if their session exists with Auth0. If not, log them out.
    const CHECK_INTERVAL = 60000; // in ms
    const check = () => {
      const userToken = sessionStorage.getItem(SESSION_USER_TOKEN);
      const expireTsSession = sessionStorage.getItem(SESSION_EXPIRE_TS);
      const expireTs = expireTsSession ? new Date(expireTsSession) : undefined;
      const now = new Date();
      if (!userToken || !expireTs || expireTs < now) {
        setUser(() => {
          return { isAuthenticated: false };
        });
        sessionStorage.clear();
        history.push("/");
      }
    };

    function initInterval() {
      setInterval(() => {
        check();
      }, CHECK_INTERVAL);
    }
    initInterval();
  };

  const checkUserAuthentication = async (url?: string) => {
    setIsCheckingUser(true);
    // check has cache

    const userToken = sessionStorage.getItem(SESSION_USER_TOKEN);
    const expireTsSession = sessionStorage.getItem(SESSION_EXPIRE_TS);
    const expireTs = expireTsSession ? new Date(expireTsSession) : undefined;
    const now = new Date();
    if (userToken && expireTs && expireTs > now) {
      const check = await API.checkUserAuthentication(userToken);
      if (!check) return false;
      setUser(() => {
        return {
          isAuthenticated: true,
          token: userToken,
          expireTs: expireTs,
        };
      });
      setIsCheckingUser(false);
      checkTokenExpired();
      return true;
    }

    // check url
    const hashParams = location.hash
      .split("&")
      .map((param) => param.split("=")[1]);
    if (hashParams && hashParams.length >= 4) {
      const token = hashParams[0];
      const check = await API.checkUserAuthentication(token);
      if (!check) return false;
      const time = new Date(now.getTime() + 30 * 60000);
      setUser(() => {
        return {
          isAuthenticated: true,
          token: hashParams[0],
          expireTs: time,
        };
      });
      sessionStorage.setItem(SESSION_USER_TOKEN, token);
      sessionStorage.setItem(SESSION_EXPIRE_TS, time.toString());
      setIsCheckingUser(false);
      checkTokenExpired();
      return true;
    }

    setIsCheckingUser(false);
    return false;
  };

  return {
    user,
    isAuthenticated: user.isAuthenticated,
    setUser,
    checkUserAuthentication,
    isCheckingUser,
  };
}
