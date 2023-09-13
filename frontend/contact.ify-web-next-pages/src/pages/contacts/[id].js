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

const Contact = () => {
  const router = useRouter();

  const [showEditContactName, setShowEditContactName] = useState(false);
  const handleCloseEditContactName = () => setShowEditContactName(false);
  const handleShowEditContactName = () => setShowEditContactName(true);

  const [showAddEmail, setShowAddEmail] = useState(false);
  const handleCloseAddEmail = () => setShowAddEmail(false);
  const handleShowAddEmail = () => setShowAddEmail(true);

  const [showEditEmail, setShowEditEmail] = useState(null);
  const handleCloseEditEmail = () => setShowEditEmail(null);
  const handleShowEditEmail = (email) => {
    getEmail(email);
    setShowEditEmail(true);
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
    isValidFirstName,
    setIsValidFirstName,
    isValidLastName,
    setIsValidLastName,
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
    addEmail,
    setAddEmailLoadingState,
    email,
    setEmail,
    isValidEmail,
    setIsValidEmail,
    emailErrorMsg,
    setEmailErrorMsg,
  } = useAddEmail(contact, setContact, handleCloseAddEmail, router);

  const {
    addPhoneNumber,
    setAddPhoneNumberLoadingState,
    phoneNumber,
    setPhoneNumber,
    isValidPhoneNumber,
    setIsValidPhoneNumber,
    phoneNumberErrorMsg,
    setPhoneNumberErrorMsg,
  } = useAddPhoneNumber(contact, setContact, handleCloseAddPhoneNumber, router);
  /**
   * TODO
   * Modal for adding address, phone, email (show, handleClose, handleShow)
   * Modal for updating address, phone, email (show, handleClose, handleShow)
   *
   * Maybe? Modal for confirm delete for address, phone, email (show, handleClose, handleShow)
   *
   * Modal for deleting contact (show, handleClose, handleShow)
   *
   * delete hook
   *
   * specific CRUD hooks for address, phone, email
   */

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
          isValidLastName={isValidLastName}
          setIsValidLastName={setIsValidLastName}
          isValidFirstName={isValidFirstName}
          setIsValidFirstName={setIsValidFirstName}
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
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
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
          isValidPhoneNumber={isValidPhoneNumber}
          setIsValidPhoneNumber={setIsValidPhoneNumber}
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
        {/* <ContactEmailForm
          email={email}
          setEmail={setEmail}
          isValidEmail={isValidEmail}
          setIsValidEmail={setIsValidEmail}
          emailErrorMsg={emailErrorMsg}
          setEmailErrorMsg={setEmailErrorMsg}
          submitForm={addEmail}
        /> */}
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
      />
    </div>
  );
};

export default Contact;
