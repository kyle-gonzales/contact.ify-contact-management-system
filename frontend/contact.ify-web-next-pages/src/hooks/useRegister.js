import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import loadingStatus from "../utils/loadingStatus";
import { API_BASE_URL } from "../../config";

const useRegister = () => {
  const router = useRouter();
  const [registerCreds, setRegisterCreds] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [isValidUserName, setIsValidUserName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const [loadingState, setLoadingState] = useState(null);
  const [userNameErrorMsg, setUserNameErrorMsg] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(null);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState(null);

  const register = useCallback(
    async (e) => {
      setLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      const { confirmPassword, ...requestData } = registerCreds;

      if (confirmPassword !== requestData.password) {
        setIsValidConfirmPassword(false);
        setConfirmPasswordErrorMsg("Passwords don't match. Try again");
        setRegisterCreds({ ...registerCreds, confirmPassword: "" });
        setLoadingState(loadingStatus.hasErrored);

        return;
      }

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      };

      try {
        const response = await fetch(`${API_BASE_URL}/register`, options);
        if (!response.ok) {
          setLoadingState(loadingStatus.hasErrored);

          var error = await response.json();
          console.log(error);
          if (error.errors.UserName) {
            setIsValidUserName(false);
            setUserNameErrorMsg(error.errors.UserName[0]);
          }
          if (error.errors.Password) {
            setIsValidPassword(false);
            setPasswordErrorMsg(error.errors.Password[0]);
          }
          return;
        }
        setLoadingState(null);
        router.replace("auth/login");
      } catch (error) {
        setLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [router, registerCreds]
  );

  return {
    register,
    registerCreds,
    setRegisterCreds,
    loadingState,
    setLoadingState,
    isValidUserName,
    setIsValidUserName,
    isValidPassword,
    setIsValidPassword,
    isValidConfirmPassword,
    setIsValidConfirmPassword,
    userNameErrorMsg,
    setUserNameErrorMsg,
    passwordErrorMsg,
    setPasswordErrorMsg,
    confirmPasswordErrorMsg,
    setConfirmPasswordErrorMsg,
  };
};

export default useRegister;
