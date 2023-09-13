import Form from "react-bootstrap/Form";

const ContactPhoneNumberForm = ({
  submitForm,
  phoneNumber,
  setPhoneNumber,
  isValidPhoneNumber,
  setIsValidPhoneNumber,
  phoneNumberErrorMsg,
  setPhoneNumberErrorMsg,
}) => {
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setPhoneNumber({ ...phoneNumber, [name]: value });
    if (name === "phoneNumber") {
      if (value.length <= 20 || value.length === 0) {
        setIsValidPhoneNumber(true);
        setPhoneNumberErrorMsg(null);
        return;
      } else {
        setIsValidPhoneNumber(false);
        setPhoneNumberErrorMsg("PhoneNumber must be less than 20 digits");
        return;
      }
    }
  };

  return (
    <Form onSubmit={submitForm} id="phoneNumberForm">
      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          required
          type="phoneNumber"
          placeholder="e.g. 09870001234"
          value={phoneNumber.phoneNumber}
          onChange={onValueChange}
          name="phoneNumber"
          isInvalid={!isValidPhoneNumber}
        />
        <Form.Control.Feedback type="invalid">
          {phoneNumberErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ContactPhoneNumberForm;
