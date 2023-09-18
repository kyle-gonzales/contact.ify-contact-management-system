import useContactifyPutRequest from "./useContactifyPutRequest";
import { useCallback, useEffect, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";

const useEditUser = (
  user,
  setUser,
  newUser,
  setNewUser,
  handleClose,
  router
) => {

  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(null);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);

  useEffect(() => {
    if (!user) return;
    setFirstNameErrorMsg(null);
    setLastNameErrorMsg(null);
    setEmailErrorMsg(null);

    setNewUser(user);
  }, [setNewUser, user]);

  const {
    put,
    loadingState: editUserLoadingState,
    setLoadingState: setEditUserLoadingState,
  } = useContactifyPutRequest("users", router);

  const editUser = useCallback(
    async (e) => {
      e.preventDefault();
      setEditUserLoadingState(loadingStatus.isLoading);

      try {
        const response = await put(newUser);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.FirstName) {
            setFirstNameErrorMsg(error.errors.FirstName[0]);
          }
          if (error.errors.LastName) {
            setLastNameErrorMsg(error.errors.LastName[0]);
          }
          if (error.errors.Email) {
            setEmailErrorMsg(error.errors.Email[0]);
          }
          return;
        }

        setUser((current) => ({ ...current, ...newUser }));

        setEditUserLoadingState(null);
        handleClose();
      } catch (error) {
        setEditUserLoadingState(loadingStatus.hasErrored);
        console.log(error);
      }
    },
    [handleClose, newUser, put, setEditUserLoadingState, setUser]
  );

  return {
    editUser,

    newUser,
    setNewUser,

    lastNameErrorMsg,
    setLastNameErrorMsg,
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    emailErrorMsg,
    setEmailErrorMsg,
  };
};

export default useEditUser;
