import { useCallback, useEffect, useState } from "react";
import loadingStatus from "@/utils/loadingStatus";
import useContactifyDeleteRequest from "./useContactifyDeleteRequest";

const useDeleteAddress = (
  contact,
  setContact,
  selectedAddress,
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
    setLoadingState: setDeleteAddressLoadingState,
  } = useContactifyDeleteRequest(
    contact && selectedAddress
      ? `contacts/${contactId}/addresses/${selectedAddress.contactAddressId}`
      : null,
    router
  );

  const deleteAddress = useCallback(
    async (e) => {
      setDeleteAddressLoadingState(loadingStatus.isLoading);
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
          addresses: current.addresses.filter(
            (phoneNumber) =>
              phoneNumber.contactAddressId !== selectedAddress.contactAddressId
          ),
        }));
        setDeleteAddressLoadingState(null);
        handleClose();
      } catch (error) {
        setDeleteAddressLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [
      setDeleteAddressLoadingState,
      deleteRequest,
      setContact,
      handleClose,
      selectedAddress,
    ]
  );

  return {
    setDeleteAddressLoadingState,
    deleteAddress,
  };
};

export default useDeleteAddress;
