import { useCallback, useEffect, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";
import useContactifyDeleteRequest from "./useContactifyDeleteRequest";

const useDeleteContact = (contact, handleClose, router) => {
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    if (!contact) return;
    setContactId(contact.contactId);
  }, [contact]);

  const {
    deleteRequest,
    loadingState,
    setLoadingState: setDeleteContactLoadingState,
  } = useContactifyDeleteRequest(
    contact ? `contacts/${contactId}` : null,
    router
  );

  const deleteContact = useCallback(
    async (e) => {
      setDeleteContactLoadingState(loadingStatus.isLoading);
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
        // setContacts((current) =>
        //   current.filter((c) => c.contactId !== contactId)
        // );
        setDeleteContactLoadingState(null);
        handleClose();
        router.replace("/");
      } catch (error) {
        setDeleteContactLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [setDeleteContactLoadingState, deleteRequest, handleClose, router]
  );

  return {
    setDeleteContactLoadingState,
    deleteContact,
  };
};

export default useDeleteContact;
