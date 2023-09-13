import { useCallback, useEffect, useState } from "react";
import useContactifyPostRequest from "./useContactifyPostRequest";
import loadingStatus from "@/utils/loadingStatus";

const useAddEmail = (contact, setContact, handleClose, router) => {
  const [contactId, setContactId] = useState(null);
  // console.log(contactId);
  useEffect(() => {
    if (!contact) return;

    setContactId(contact.contactId);
  }, [contact]);

  const {
    post,
    loadingState: setAddEmailLoadingState,
    setLoadingState,
  } = useContactifyPostRequest(
    contact ? `contacts/${contactId}/emails` : null,
    router
  );

  const [email, setEmail] = useState({ email: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);

  const addEmail = useCallback(
    async (e) => {
      setLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await post(email);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.Email) {
            setIsValidEmail(false);
            setEmailErrorMsg(error.errors.Email[0]);
          }
          return;
        }

        const result = await response.text();
        console.log(result);

        setEmail({ email: "" }); //reset form
        setLoadingState(null);
        setContact((current) => ({
          ...current,
          emails: [...current.emails, email],
        }));
        handleClose();
      } catch (error) {
        setLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [email, handleClose, post, setContact, setLoadingState]
  );

  return {
    addEmail,
    setAddEmailLoadingState,
    email,
    setEmail,
    isValidEmail,
    setIsValidEmail,
    emailErrorMsg,
    setEmailErrorMsg,
  };
};

export default useAddEmail;
