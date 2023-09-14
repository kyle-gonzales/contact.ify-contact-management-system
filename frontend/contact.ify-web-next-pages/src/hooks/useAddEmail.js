import { useCallback, useEffect, useState } from "react";
import useContactifyPostRequest from "./useContactifyPostRequest";
import loadingStatus from "@/utils/loadingStatus";

const defaultEmail = { email: "" };

const useAddEmail = (
  contact,
  setContact,
  showAddEmail,
  handleClose,
  router
) => {
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    if (!contact) return;

    setContactId(contact.contactId);
  }, [contact]);

  const [email, setEmail] = useState(defaultEmail);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);

  const {
    post,
    loadingState: setAddEmailLoadingState,
    setLoadingState,
  } = useContactifyPostRequest(
    contact ? `contacts/${contactId}/emails` : null,
    router
  );

  useEffect(() => {
    setEmail(defaultEmail);
    setEmailErrorMsg(null);
  }, [showAddEmail]);

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
            // setIsValidEmail(false);
            setEmailErrorMsg(error.errors.Email[0]);
          }
          return;
        }
        const result = await response.text();
        email.contactEmailId = result;

        setLoadingState(null);
        setContact((current) => ({
          ...current,
          emails: [...current.emails, email],
        }));
        setEmail(defaultEmail); //reset form
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
    emailErrorMsg,
    setEmailErrorMsg,
  };
};

export default useAddEmail;
