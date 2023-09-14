import { useCallback, useEffect, useState } from "react";
import useContactifyPostRequest from "./useContactifyPostRequest";
import loadingStatus from "@/utils/loadingStatus";
import isNullOrEmpty from "@/utils/isNullOrEmpty";

const defaultAddress = {
  city: "",
  addressType: 3,
};

const useAddAddress = (contact, setContact, handleClose, router) => {
  const [contactId, setContactId] = useState(null);
  useEffect(() => {
    if (!contact) return;

    setContactId(contact.contactId);
  }, [contact]);

  const [address, setAddress] = useState(defaultAddress);

  const [streetErrorMsg, setStreetErrorMsg] = useState(null);
  const [cityErrorMsg, setCityErrorMsg] = useState(null);
  const [provinceErrorMsg, setProvinceErrorMsg] = useState(null);
  const [countryErrorMsg, setCountryErrorMsg] = useState(null);
  const [zipCodeErrorMsg, setZipCodeErrorMsg] = useState(null);
  const [addressTypeErrorMsg, setAddressTypeErrorMsg] = useState(null);

  const {
    post,
    loadingState,
    setLoadingState: setAddAddressLoadingState,
  } = useContactifyPostRequest(
    contact ? `contacts/${contactId}/addresses` : null,
    router
  );

  const addAddress = useCallback(
    async (e) => {
      setAddAddressLoadingState(loadingStatus.isLoading);
      e.preventDefault();
      try {
        const body = JSON.stringify({
          ...address,
          addressType: parseInt(address.addressType),
        });
        const response = await post(body, true);

        if (!response.ok) {
          const error = await response.json();

          if (error.errors.UserId) {
            alert("Something went wrong. UserId from token is missing");
          }
          if (error.errors.Street) {
            setStreetErrorMsg(error.errors.Street[0]);
          }
          if (error.errors.City) {
            setCityErrorMsg(error.errors.City[0]);
          }
          if (error.errors.Province) {
            setProvinceErrorMsg(error.errors.Province[0]);
          }
          if (error.errors.Country) {
            setCountryErrorMsg(error.errors.Country[0]);
          }
          if (error.errors.ZipCode) {
            setZipCodeErrorMsg(error.errors.ZipCode[0]);
          }
          if (error.errors.AddressType) {
            setAddressTypeErrorMsg(error.errors.AddressType[0]);
          }
          return;
        }

        const result = await response.text();
        address.contactAddressId = result;

        const formatAddress = (address) => {
          var result = "";

          if (!isNullOrEmpty(address.street)) {
            result += `${address.street}`;
          }
          if (!isNullOrEmpty(address.city)) {
            if (isNullOrEmpty(result)) {
              result += `${address.city}`;
            } else {
              result += `, ${address.city}`;
            }
          }
          if (!isNullOrEmpty(address.province)) {
            result += `, ${address.province}`;
          }
          if (!isNullOrEmpty(address.country)) {
            result += `, ${address.country}`;
          }
          if (!isNullOrEmpty(address.zipCode)) {
            result += `, ${address.zipCode}`;
          }

          return result;
        };
        const newAddress = {
          contactAddressId: address.contactAddressId,
          address: formatAddress(address),
        };
        setContact((current) => ({
          ...current,
          addresses: [...current.addresses, newAddress],
        }));

        setAddress(defaultAddress); //reset form
        setAddAddressLoadingState(null);
        handleClose();
      } catch (error) {
        setAddAddressLoadingState(loadingStatus.hasErrored);
        console.log("something went wrong", error);
      }
    },
    [address, handleClose, post, setAddAddressLoadingState, setContact]
  );

  return {
    addAddress,
    address,
    setAddress,

    streetErrorMsg,
    setStreetErrorMsg,
    cityErrorMsg,
    setCityErrorMsg,
    provinceErrorMsg,
    setProvinceErrorMsg,
    countryErrorMsg,
    setCountryErrorMsg,
    zipCodeErrorMsg,
    setZipCodeErrorMsg,
    addressTypeErrorMsg,
    setAddressTypeErrorMsg,
  };
};

export default useAddAddress;
