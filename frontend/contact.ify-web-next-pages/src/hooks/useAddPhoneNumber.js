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
    loadingState: setAddPhoneNumberLoadingState,
    setLoadingState,
  } = useContactifyPostRequest(
    contact ? `contacts/${contactId}/phoneNumbers` : null,
    router
  );

  const [phoneNumber, setPhoneNumber] = useState({ phoneNumber: "" });
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState(null);

  const addPhoneNumber = useCallback(
    async (e) => {
      setLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const response = await post(phoneNumber);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.PhoneNumber) {
            setIsValidPhoneNumber(false);
            setPhoneNumberErrorMsg(error.errors.PhoneNumber[0]);
          }
          return;
        }

        const result = await response.text();
        console.log(result);

        setPhoneNumber({ phoneNumber: "" }); //reset form
        setLoadingState(null);
        setContact((current) => ({
          ...current,
          phoneNumbers: [...current.phoneNumbers, phoneNumber],
        }));
        handleClose();
      } catch (error) {
        setLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [phoneNumber, handleClose, post, setContact, setLoadingState]
  );

  return {
    addPhoneNumber,
    setAddPhoneNumberLoadingState,
    phoneNumber,
    setPhoneNumber,
    isValidPhoneNumber,
    setIsValidPhoneNumber,
    phoneNumberErrorMsg,
    setPhoneNumberErrorMsg,
  };
};

export default useAddPhoneNumber;
