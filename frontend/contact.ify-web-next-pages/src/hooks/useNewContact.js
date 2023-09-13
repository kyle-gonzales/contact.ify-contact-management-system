import { useCallback, useState } from "react";
import useContactifyPostRequest from "./useContactifyPostRequest";
import loadingStatus from "@/utils/loadingStatus";

const useNewContact = (router) => {
  const { post, loadingState, setLoadingState } = useContactifyPostRequest(
    "contacts",
    router
  );
  const [contact, setContact] = useState({ lastName: "", firstName: "" });

  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [isValidLastName, setIsValidLastName] = useState(true);

  const [lastNameErrorMsg, setLastNameErrorMsg] = useState(null);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(null);

  const postContact = useCallback(
    async (e) => {
      setLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await post(contact);
        console.log(response);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.FirstName) {
            setIsValidFirstName(false);
            setFirstNameErrorMsg(error.errors.FirstName[0]);
          }
          if (error.errors.LastName) {
            setIsValidLastName(false);
            setLastNameErrorMsg(error.errors.LastName[0]);
          }
          return;
        }

        const result = await response.text();
        console.log(result);
        setLoadingState(null);
        router.replace("/");
      } catch (error) {
        setLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [contact, post, router, setLoadingState]
  );

  return {
    postContact,
    loadingState,
    setLoadingState,
    contact,
    setContact,
    isValidFirstName,
    setIsValidFirstName,
    isValidLastName,
    setIsValidLastName,
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    lastNameErrorMsg,
    setLastNameErrorMsg,
  };
};

export default useNewContact;
