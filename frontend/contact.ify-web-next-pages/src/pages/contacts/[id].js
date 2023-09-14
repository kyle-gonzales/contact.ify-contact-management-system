import { useRouter } from "next/router";
import useContact from "@/hooks/useContact";
import LoadingIndicator from "@/components/LoadingIndicator";
import loadingStatus from "@/utils/loadingStatus";
import useIsFavoriteByContact from "@/hooks/useIsFavoriteByContact";
import ContactModal from "@/components/ContactModal";
import { useState, useEffect } from "react";
import ContactNameForm from "@/components/ContactNameForm";
import useEditContactName from "@/hooks/useEditContactName";
import ContactInfo from "@/components/ContactInfo";
import ContactEmailForm from "@/components/ContactEmailForm";
import useAddEmail from "@/hooks/useAddEmail";
import useAddPhoneNumber from "@/hooks/useAddPhoneNumber";
import ContactPhoneNumberForm from "@/components/ContactPhoneNumberForm";
import ContactAddressForm from "@/components/ContactAddressForm";
import useAddAddress from "@/hooks/useAddAddress";
import useEditEmail from "@/hooks/useEditEmail";

const Contact = () => {
  const router = useRouter();

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);

  const [showEditContactName, setShowEditContactName] = useState(false);
  const handleCloseEditContactName = () => setShowEditContactName(false);
  const handleShowEditContactName = () => setShowEditContactName(true);

  const [showAddEmail, setShowAddEmail] = useState(false);
  const handleCloseAddEmail = () => setShowAddEmail(false);
  const handleShowAddEmail = () => setShowAddEmail(true);

  const [showEditEmail, setShowEditEmail] = useState(false);
  const handleCloseEditEmail = () => {
    setShowEditEmail(false);
    setSelectedEmail(null);
  };
  const handleShowEditEmail = (email) => {
    setShowEditEmail(true);
    setSelectedEmail(email);
  };

  const [showAddPhoneNumber, setShowAddPhoneNumber] = useState(false);
  const handleCloseAddPhoneNumber = () => setShowAddPhoneNumber(false);
  const handleShowAddPhoneNumber = () => setShowAddPhoneNumber(true);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const handleCloseAddAddress = () => setShowAddAddress(false);
  const handleShowAddAddress = () => setShowAddAddress(true);

  // const [showEditContactName, setShowEditContactName] = useState(false);
  // const handleCloseEditContactName = () => setShowEditContactName(false);
  // const handleShowEditContactName = () => setShowEditContactName(true);

  // const [showEditContactName, setShowEditContactName] = useState(false);
  // const handleCloseEditContactName = () => setShowEditContactName(false);
  // const handleShowEditContactName = () => setShowEditContactName(true);

  const { contact, setContact, loadingState } = useContact(router);
  const { patchIsFavorite } = useIsFavoriteByContact(contact, setContact);

  const {
    editContactLoadingState,

    editContactName,
    newContact,
    setNewContact,
    
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    lastNameErrorMsg,
    setLastNameErrorMsg,
  } = useEditContactName(
    contact,
    setContact,
    handleCloseEditContactName,
    router
  );

  const {
    setAddEmailLoadingState,

    addEmail,
    email,
    setEmail,

    emailErrorMsg,
    setEmailErrorMsg,
  } = useAddEmail(
    contact,
    setContact,
    showAddEmail,
    handleCloseAddEmail,
    router
  );

  const {
    setEditEmailLoadingState,

    editEmail,
    newEmail,
    setNewEmail,

    newEmailErrorMsg,
    setNewEmailErrorMsg,
  } = useEditEmail(
    contact,
    setContact,
    selectedEmail,
    handleCloseEditEmail,
    router
  );
  const {
    setAddPhoneNumberLoadingState,

    addPhoneNumber,
    phoneNumber,
    setPhoneNumber,

    phoneNumberErrorMsg,
    setPhoneNumberErrorMsg,
  } = useAddPhoneNumber(contact, setContact ,handleCloseAddPhoneNumber, router);

  const {
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
  } = useAddAddress(contact, setContact, handleCloseAddAddress, router);

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <div>
      <ContactModal
        handleClose={handleCloseEditContactName}
        setShow={setShowEditContactName}
        show={showEditContactName}
        isAdd={false}
        type="Contact Name"
      >
        <ContactNameForm
          submitForm={editContactName}
          contact={newContact}
          setContact={setNewContact}
          lastNameErrorMsg={lastNameErrorMsg}
          setLastNameErrorMsg={setLastNameErrorMsg}
          firstNameErrorMsg={firstNameErrorMsg}
          setFirstNameErrorMsg={setFirstNameErrorMsg}
        />
      </ContactModal>

      <ContactModal
        show={showAddEmail}
        handleClose={handleCloseAddEmail}
        isAdd={true}
        type="Email"
      >
        <ContactEmailForm
          submitForm={addEmail}
          email={email}
          setEmail={setEmail}
          emailErrorMsg={emailErrorMsg}
          setEmailErrorMsg={setEmailErrorMsg}
        />
      </ContactModal>

      <ContactModal
        handleClose={handleCloseAddPhoneNumber}
        setShow={setShowAddPhoneNumber}
        show={showAddPhoneNumber}
        isAdd={true}
        type="Phone Number"
      >
        <ContactPhoneNumberForm
          submitForm={addPhoneNumber}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          phoneNumberErrorMsg={phoneNumberErrorMsg}
          setPhoneNumberErrorMsg={setPhoneNumberErrorMsg}
        />
      </ContactModal>

      <ContactModal
        handleClose={handleCloseAddAddress}
        setShow={setShowAddAddress}
        show={showAddAddress}
        isAdd={true}
        type="Address"
      >
        <ContactAddressForm
          submitForm={addAddress}
          address={address}
          setAddress={setAddress}
          streetErrorMsg={streetErrorMsg}
          setStreetErrorMsg={setStreetErrorMsg}
          cityErrorMsg={cityErrorMsg}
          setCityErrorMsg={setCityErrorMsg}
          provinceErrorMsg={provinceErrorMsg}
          setProvinceErrorMsg={setProvinceErrorMsg}
          countryErrorMsg={countryErrorMsg}
          setCountryErrorMsg={setCountryErrorMsg}
          zipCodeErrorMsg={zipCodeErrorMsg}
          setZipCodeErrorMsg={setZipCodeErrorMsg}
          addressTypeErrorMsg={addressTypeErrorMsg}
          setAddressTypeErrorMsg={setAddressTypeErrorMsg}
        />
      </ContactModal>

      <ContactModal
        show={showEditEmail}
        handleClose={handleCloseEditEmail}
        isAdd={false}
        type="Email"
      >
        <ContactEmailForm
          submitForm={editEmail}
          email={newEmail}
          setEmail={setNewEmail}
          emailErrorMsg={newEmailErrorMsg}
          setEmailErrorMsg={setNewEmailErrorMsg}
        />
      </ContactModal>

      <ContactInfo
        contact={contact}
        patchIsFavorite={patchIsFavorite}
        router={router}
        handleShowEditContactName={handleShowEditContactName}
        handleShowAddEmail={handleShowAddEmail}
        handleShowEditEmail={handleShowEditEmail}
        handleShowAddPhoneNumber={handleShowAddPhoneNumber}
        handleShowEditPhoneNumber={() => {}}
        handleShowAddAddress={handleShowAddAddress}
        handleShowEditAddress={() => {}}
      />

      {/*
      <ContactModal
        handleClose={handleCloseAddPhoneNumber}
        setShow={setShowAddPhoneNumber}
        show={showAddPhoneNumber}
        isAdd={true}
        type="Phone Number"
      >
        <ContactPhoneNumberForm
          submitForm={addPhoneNumber}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          phoneNumberErrorMsg={phoneNumberErrorMsg}
          setPhoneNumberErrorMsg={setPhoneNumberErrorMsg}
        />
      </ContactModal>

      <ContactModal
        handleClose={handleCloseAddAddress}
        setShow={setShowAddAddress}
        show={showAddAddress}
        isAdd={true}
        type="Address"
      >
        <ContactAddressForm
          submitForm={addAddress}
          address={address}
          setAddress={setAddress}
          streetErrorMsg={streetErrorMsg}
          setStreetErrorMsg={setStreetErrorMsg}
          cityErrorMsg={cityErrorMsg}
          setCityErrorMsg={setCityErrorMsg}
          provinceErrorMsg={provinceErrorMsg}
          setProvinceErrorMsg={setProvinceErrorMsg}
          countryErrorMsg={countryErrorMsg}
          setCountryErrorMsg={setCountryErrorMsg}
          zipCodeErrorMsg={zipCodeErrorMsg}
          setZipCodeErrorMsg={setZipCodeErrorMsg}
          addressTypeErrorMsg={addressTypeErrorMsg}
          setAddressTypeErrorMsg={setAddressTypeErrorMsg}
        />
      </ContactModal>

      <ContactInfo
        contact={contact}
        patchIsFavorite={patchIsFavorite}
        router={router}
        handleShowEditContactName={handleShowEditContactName}
        handleShowAddEmail={handleShowAddEmail}
        handleShowEditEmail={() => {}}
        handleShowAddPhoneNumber={handleShowAddPhoneNumber}
        handleShowEditPhoneNumber={() => {}}
        handleShowAddAddress={handleShowAddAddress}
        handleShowEditAddress={() => {}}
      /> */}
    </div>
  );
};

export default Contact;
