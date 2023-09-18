import { useCallback, useEffect, useState } from "react";
import useContactifyPutRequest from "./useContactifyPutRequest";
import loadingStatus from "@/utils/loadingStatus";
import formatAddress from "@/utils/formatAddress";

const defaultAddressUpdate = {
  contactAddressId: -1,
  city: "",
  addressType: 3,
};

const useEditAddress = (
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

  const [newAddress, setNewAddress] = useState(defaultAddressUpdate);

  const [newStreetErrorMsg, setNewStreetErrorMsg] = useState(null);
  const [newCityErrorMsg, setNewCityErrorMsg] = useState(null);
  const [newProvinceErrorMsg, setNewProvinceErrorMsg] = useState(null);
  const [newCountryErrorMsg, setNewCountryErrorMsg] = useState(null);
  const [newZipCodeErrorMsg, setNewZipCodeErrorMsg] = useState(null);
  const [newAddressTypeErrorMsg, setNewAddressTypeErrorMsg] = useState(null);

  const {
    put,
    loadingState,
    setLoadingState: setEditNewAddressLoadingState,
  } = useContactifyPutRequest(
    contact ? `contacts/${contactId}/addresses` : null,
    router
  );

  useEffect(() => {
    if (!selectedAddress) return;

    setNewStreetErrorMsg(null);
    setNewCityErrorMsg(null);
    setNewProvinceErrorMsg(null);
    setNewCountryErrorMsg(null);
    setNewZipCodeErrorMsg(null);
    setNewAddressTypeErrorMsg(null);

    //GET FROM DATABASE!

    setNewAddress(() => ({
      addressType: selectedAddress.addressType,
      city: selectedAddress.address,
      contactAddressId: selectedAddress.contactAddressId,
    }));
  }, [selectedAddress]);

  const editAddress = useCallback(
    async (e) => {
      setEditNewAddressLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        console.log(newAddress);
        const body = JSON.stringify({
          ...newAddress,
          addressType: parseInt(newAddress.addressType),
        });
        console.log(body);
        const response = await put(body, true);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.Street) {
            setNewStreetErrorMsg(error.errors.Street[0]);
          }
          if (error.errors.City) {
            setNewCityErrorMsg(error.errors.City[0]);
          }
          if (error.errors.Province) {
            setNewProvinceErrorMsg(error.errors.Province[0]);
          }
          if (error.errors.Country) {
            setNewCountryErrorMsg(error.errors.Country[0]);
          }
          if (error.errors.ZipCode) {
            setNewZipCodeErrorMsg(error.errors.ZipCode[0]);
          }
          if (error.errors.AddressType) {
            setNewAddressTypeErrorMsg(error.errors.AddressType[0]);
          }
          return;
        }

        const addressResponse = {
          contactAddressId: newAddress.contactAddressId,
          address: formatAddress(newAddress),
          addressType: newAddress.addressType,
        };
        setContact((current) => ({
          ...current,
          addresses: current.addresses.map((address) =>
            address.contactAddressId === newAddress.contactAddressId
              ? addressResponse
              : address
          ),
        }));

        setEditNewAddressLoadingState(null);
        handleClose();
      } catch (error) {
        setEditNewAddressLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [setEditNewAddressLoadingState, newAddress, put, setContact, handleClose]
  );

  return {
    editAddress,
    newAddress,
    setNewAddress,

    newStreetErrorMsg,
    setNewStreetErrorMsg,
    newCityErrorMsg,
    setNewCityErrorMsg,
    newProvinceErrorMsg,
    setNewProvinceErrorMsg,
    newCountryErrorMsg,
    setNewCountryErrorMsg,
    newZipCodeErrorMsg,
    setNewZipCodeErrorMsg,
    newAddressTypeErrorMsg,
    setNewAddressTypeErrorMsg,
  };
};

export default useEditAddress;
