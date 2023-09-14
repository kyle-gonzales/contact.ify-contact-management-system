import { useCallback, useEffect, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";
import useContactifyPutRequest from "./useContactifyPutRequest";

const defaultEmailUpdate = { contactEmailId: -1, email: "" };

const useEditEmail = (
  contact,
  setContact,
  selectedEmail,
  handleClose,
  router
) => {
  const [contactId, setContactId] = useState(null);

  const [newEmail, setNewEmail] = useState(defaultEmailUpdate);
  const [newEmailErrorMsg, setNewEmailErrorMsg] = useState(null);

  useEffect(() => {
    if (!contact) return;
    setContactId(contact.contactId);
  }, [contact]);

  useEffect(() => {
    if (!selectedEmail) return;
    setNewEmailErrorMsg(null);
    setNewEmail((current) => ({
      ...current,
      email: selectedEmail.email,
      contactEmailId: selectedEmail.contactEmailId,
    }));
  }, [selectedEmail]);
  const {
    put,
    loadingState,
    setLoadingState: setEditEmailLoadingState,
  } = useContactifyPutRequest(
    contact ? `contacts/${contactId}/emails` : null,
    router
  );

  const editEmail = useCallback(
    async (e) => {
      setEditEmailLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await put(newEmail);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.Email) {
            setNewEmailErrorMsg(error.errors.Email[0]);
          }
          return;
        }
        setContact((current) => ({
          ...current,
          emails: current.emails.map((email) =>
            email.contactEmailId === newEmail.contactEmailId ? newEmail : email
          ),
        }));
        setEditEmailLoadingState(null);
        handleClose();
      } catch (error) {
        setEditEmailLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [setEditEmailLoadingState, put, newEmail, setContact, handleClose]
  );

  return {
    setEditEmailLoadingState,
    editEmail,
    newEmail,
    setNewEmail,
    newEmailErrorMsg,
    setNewEmailErrorMsg,
  };
};

export default useEditEmail;
