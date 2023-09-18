import { useCallback, useEffect, useState } from "react";
import useContactifyPutRequest from "./useContactifyPutRequest";
import loadingStatus from "@/utils/loadingStatus";

const defaultPhoneNumberUpdate = { contactPhoneNumberId: -1, phoneNumber: "" };

const useEditPhoneNumber = (
  contact,
  setContact,
  selectedPhoneNumber,
  handleClose,
  router
) => {
  const [contactId, setContactId] = useState(null);

  const [newPhoneNumber, setNewPhoneNumber] = useState(
    defaultPhoneNumberUpdate
  );
  const [newPhoneNumberErrorMsg, setNewPhoneNumberErrorMsg] = useState(null);

  useEffect(() => {
    if (!contact) return;

    setContactId(contact.contactId);
  }, [contact]);

  useEffect(() => {
    if (!selectedPhoneNumber) return;
    setNewPhoneNumberErrorMsg(null);
    setNewPhoneNumber((current) => ({
      ...current,
      phoneNumber: selectedPhoneNumber.phoneNumber,
      contactPhoneNumberId: selectedPhoneNumber.contactPhoneNumberId,
    }));
  }, [selectedPhoneNumber]);

  const {
    put,
    loadingState,
    setLoadingState: setEditPhoneNumberLoadingState,
  } = useContactifyPutRequest(
    contact ? `contacts/${contactId}/phoneNumbers` : null,
    router
  );

  const editPhoneNumber = useCallback(
    async (e) => {
      setEditPhoneNumberLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await put(newPhoneNumber);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.PhoneNumber) {
            setNewPhoneNumberErrorMsg(error.errors.PhoneNumber[0]);
          }
          return;
        }
        setContact((current) => ({
          ...current,
          phoneNumbers: current.phoneNumbers.map((phoneNumber) =>
            phoneNumber.contactPhoneNumberId ===
            newPhoneNumber.contactPhoneNumberId
              ? newPhoneNumber
              : phoneNumber
          ),
        }));

        setEditPhoneNumberLoadingState(null);
        handleClose();
      } catch (error) {
        setEditPhoneNumberLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [
      setEditPhoneNumberLoadingState,
      put,
      newPhoneNumber,
      setContact,
      handleClose,
    ]
  );

  return {
    setEditPhoneNumberLoadingState,
    editPhoneNumber,
    newPhoneNumber,
    setNewPhoneNumber,
    newPhoneNumberErrorMsg,
    setNewPhoneNumberErrorMsg,
  };
};

export default useEditPhoneNumber;
