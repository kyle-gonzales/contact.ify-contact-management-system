import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import loadingStatus from "../utils/loadingStatus";
import { API_BASE_URL } from "../../config";
import cookies from "js-cookie";

const useLogIn = () => {
  const router = useRouter();
  const [logInCreds, setLogInCreds] = useState({ userName: "", password: "" });
  const [loadingState, setLoadingState] = useState(null);

  const logIn = useCallback(
    async (e) => {
      setLoadingState(loadingStatus.isLoading);
      e.preventDefault();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInCreds),
      };

      try {
        const response = await fetch(`${API_BASE_URL}/login`, options);
        if (!response.ok) {
          setLoadingState(loadingStatus.hasErrored);
          return;
        }
        const token = await response.text();
        // console.log(token);
        // const decoded = jwtDecode(token);

        cookies.set("jwt_authorization", token, {
          expires: 1,
        });
        setLoadingState(null);
        router.replace("/");
      } catch (error) {
        setLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
        // throw error;
      }
    },
    [router, logInCreds]
  );

  return {
    logIn,
    logInCreds,
    setLogInCreds,
    loadingState,
    setLoadingState,
  };
};

export default useLogIn;
