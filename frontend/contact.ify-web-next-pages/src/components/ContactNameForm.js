import Form from "react-bootstrap/Form";

const ContactNameForm = ({
  submitForm,
  contact,
  setContact,
  lastNameErrorMsg,
  setLastNameErrorMsg,
  firstNameErrorMsg,
  setFirstNameErrorMsg,
}) => {
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value.length === 0 ? null : value });
    if (name === "firstName") {
      if ((value.length > 1 && value.length <= 35) || value.length === 0) {
        setFirstNameErrorMsg(null);
        return;
      } else {
        setFirstNameErrorMsg(
          "First Name must be between 2 and 35 characters long"
        );
        return;
      }
    } else if (name === "lastName") {
      if ((value.length > 1 && value.length <= 35) || value.length === 0) {
        setLastNameErrorMsg(null);
        return;
      } else {
        setLastNameErrorMsg(
          "Last Name must be between 2 and 35 characters long"
        );
        return;
      }
    }
  };

  return (
    <Form onSubmit={submitForm} id="contactForm">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="e.g. Lim"
          value={contact.lastName}
          onChange={onValueChange}
          name="lastName"
          isInvalid={lastNameErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {lastNameErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Mary Jane"
          value={contact.firstName}
          onChange={onValueChange}
          name="firstName"
          isInvalid={firstNameErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {firstNameErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ContactNameForm;
