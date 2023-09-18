import { useCallback, useEffect, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";
import useContactifyDeleteRequest from "./useContactifyDeleteRequest";

const useDeleteEmail = (
  contact,
  setContact,
  selectedEmail,
  handleClose,
  router
) => {
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    if (!contact) return;
    setContactId(contact.contactId);
  }, [contact]);

  const {
    deleteRequest,
    loadingState,
    setLoadingState: setDeleteEmailLoadingState,
  } = useContactifyDeleteRequest(
    contact && selectedEmail
      ? `contacts/${contactId}/emails/${selectedEmail.contactEmailId}`
      : null,
    router
  );

  const deleteEmail = useCallback(
    async (e) => {
      setDeleteEmailLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await deleteRequest();

        if (!response.ok) {
          const error = await response.json();
          console.log(response.status);
          switch (response.status) {
            case 400:
              alert("Please Specify a valid ID");
              break;
            case 401:
              alert("User Is Unauthorized");
              break;
            case 404:
              alert("ID Not Found");
              break;
            default:
              alert("Something went wrong trying to delete!");
              break;
          }
        }
        setContact((current) => ({
          ...current,
          emails: current.emails.filter(
            (email) => email.contactEmailId !== selectedEmail.contactEmailId
          ),
        }));
        setDeleteEmailLoadingState(null);
        handleClose();
      } catch (error) {
        setDeleteEmailLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [
      setDeleteEmailLoadingState,
      deleteRequest,
      setContact,
      handleClose,
      selectedEmail,
    ]
  );

  return {
    setDeleteEmailLoadingState,
    deleteEmail,
  };
};

export default useDeleteEmail;
