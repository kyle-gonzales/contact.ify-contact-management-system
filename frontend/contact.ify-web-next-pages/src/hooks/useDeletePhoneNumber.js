import { useCallback, useEffect, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";
import useContactifyDeleteRequest from "./useContactifyDeleteRequest";

const useDeletePhoneNumber = (
  contact,
  setContact,
  selectedPhoneNumber,
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
    setLoadingState: setDeletePhoneNumberLoadingState,
  } = useContactifyDeleteRequest(
    contact && selectedPhoneNumber
      ? `contacts/${contactId}/phoneNumbers/${selectedPhoneNumber.contactPhoneNumberId}`
      : null,
    router
  );

  const deletePhoneNumber = useCallback(
    async (e) => {
      setDeletePhoneNumberLoadingState(loadingStatus.isLoading);
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
          phoneNumbers: current.phoneNumbers.filter(
            (phoneNumber) =>
              phoneNumber.contactPhoneNumberId !==
              selectedPhoneNumber.contactPhoneNumberId
          ),
        }));
        setDeletePhoneNumberLoadingState(null);
        handleClose();
      } catch (error) {
        setDeletePhoneNumberLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [
      setDeletePhoneNumberLoadingState,
      deleteRequest,
      setContact,
      handleClose,
      selectedPhoneNumber,
    ]
  );

  return {
    setDeletePhoneNumberLoadingState,
    deletePhoneNumber,
  };
};

export default useDeletePhoneNumber;
