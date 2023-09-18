import { useCallback, useState, useEffect } from "react";
import useContactifyPutRequest from "./useContactifyPutRequest";
import loadingStatus from "@/utils/loadingStatus";

const useEditContactName = (contact, setContact, handleClose, router) => {
  const {
    put,
    loadingState: editContactLoadingState,
    setLoadingState: setEditContactLoadingState,
  } = useContactifyPutRequest("contacts", router);

  const [newContact, setNewContact] = useState({
    contactId: -1,
    lastName: "",
    firstName: "",
  });

  useEffect(() => {
    if (!contact) return;

    const [lastName, firstName] = contact.name
      .split(",")
      .map((part) => part.trim());
    setNewContact((current) => ({
      ...current,
      contactId: contact.contactId,
      lastName,
      firstName,
    }));
  }, [contact]);


  const [lastNameErrorMsg, setLastNameErrorMsg] = useState(null);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(null);

  const editContactName = useCallback(
    async (e) => {
      setEditContactLoadingState(loadingStatus.isLoading);
      e.preventDefault();

      try {
        const response = await put(newContact);
        console.log(response);
        if (!response.ok) {
          const error = await response.json();
          console.log(error);

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          //TODO: fix api endpoint to return proper json
          if (error.errors.FirstName) {
            setFirstNameErrorMsg(error.errors.FirstName[0]);
          }
          if (error.errors.LastName) {
            setLastNameErrorMsg(error.errors.LastName[0]);
          }
          return;
        }

        const formatName = (firstName, lastName) => {
          let result = lastName;
          if (firstName != null && firstName.length !== 0)
            result += ", " + firstName;
          return result;
        };

        setContact((current) => ({
          ...current,
          name: formatName(newContact.firstName, newContact.lastName),
        }));
        handleClose();
        setEditContactLoadingState(null);
        router.replace(`/contacts/${contact.contactId}`);
      } catch (error) {
        setEditContactLoadingState(loadingStatus.hasErrored);
        console.log(
          "Something went wrong trying to update the contact name",
          error
        );
      }
    },
    [
      contact,
      handleClose,
      newContact,
      put,
      router,
      setContact,
      setEditContactLoadingState,
    ]
  );

  return {
    editContactLoadingState,
    editContactName,
    newContact,
    setNewContact,
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    lastNameErrorMsg,
    setLastNameErrorMsg,
  };
};

export default useEditContactName;
