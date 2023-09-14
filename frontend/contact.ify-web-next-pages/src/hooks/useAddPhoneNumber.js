import { useCallback, useEffect, useState } from "react";
import useContactifyPostRequest from "./useContactifyPostRequest";
import loadingStatus from "@/utils/loadingStatus";

const useAddPhoneNumber = (contact, setContact, handleClose, router) => {
  const [contactId, setContactId] = useState(null);
  useEffect(() => {
    if (!contact) return;

    setContactId(contact.contactId);
  }, [contact]);

  const {
    post,
    loadingState,
    setLoadingState: setAddPhoneNumberLoadingState,
  } = useContactifyPostRequest(
    contact ? `contacts/${contactId}/phoneNumbers` : null,
    router
  );

  const [phoneNumber, setPhoneNumber] = useState({ phoneNumber: "" });
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState(null);

  const addPhoneNumber = useCallback(
    async (e) => {
      setAddPhoneNumberLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await post(phoneNumber);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.PhoneNumber) {
            setPhoneNumberErrorMsg(error.errors.PhoneNumber[0]);
          }
          return;
        }

        const result = await response.text();
        phoneNumber.contactPhoneNumberId = result;

        setAddPhoneNumberLoadingState(null);
        setContact((current) => ({
          ...current,
          phoneNumbers: [...current.phoneNumbers, phoneNumber],
        }));
        setPhoneNumber({ phoneNumber: "" }); //reset form
        handleClose();
      } catch (error) {
        setAddPhoneNumberLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [setAddPhoneNumberLoadingState, post, phoneNumber, setContact, handleClose]
  );

  return {
    setAddPhoneNumberLoadingState,
    addPhoneNumber,
    phoneNumber,
    setPhoneNumber,
    phoneNumberErrorMsg,
    setPhoneNumberErrorMsg,
  };
};

export default useAddPhoneNumber;
