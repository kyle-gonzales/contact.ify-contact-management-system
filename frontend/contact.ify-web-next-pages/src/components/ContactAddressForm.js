import Form from "react-bootstrap/Form";

const ContactAddressForm = ({
  submitForm,
  contact,
  setContact,
  isValidLastName, //!change param names
  setIsValidLastName,
  isValidFirstName,
  setIsValidFirstName,
  lastNameErrorMsg,
  setLastNameErrorMsg,
  firstNameErrorMsg,
  setFirstNameErrorMsg,
}) => {
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
    if (name === "firstName") {
      if ((value.length > 1 && value.length <= 35) || value.length === 0) {
        setIsValidFirstName(true);
        setFirstNameErrorMsg(null);
        return;
      } else {
        setIsValidFirstName(false);
        return;
      }
    } else if (name === "lastName") {
      if ((value.length > 1 && value.length <= 35) || value.length === 0) {
        setIsValidLastName(true);
        setLastNameErrorMsg(null);
        return;
      } else {
        setIsValidLastName(false);
        return;
      }
    }
  };

  return (
    <Form onSubmit={submitForm} id="addressForm">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="e.g. Lim"
          value={contact.lastName}
          onChange={onValueChange}
          name="lastName"
          isInvalid={!isValidLastName}
        />
        <Form.Control.Feedback type="invalid">
          {lastNameErrorMsg ??
            "Last Name must be between 2 and 35 characters long"}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="e.g. Mary Jane"
          value={contact.firstName}
          onChange={onValueChange}
          name="firstName"
          isInvalid={!isValidFirstName}
        />
        <Form.Control.Feedback type="invalid">
          {firstNameErrorMsg ??
            "First Name must be between 2 and 35 characters long"}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ContactAddressForm;
