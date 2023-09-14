import Form from "react-bootstrap/Form";
import isValidEmailUtil from "@/utils/isValidEmail";

const ContactEmailForm = ({
  submitForm,
  email,
  setEmail,
  emailErrorMsg,
  setEmailErrorMsg,
}) => {
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
    if (name === "email") {
      if (isValidEmailUtil(value) || value.length === 0) {
        setEmailErrorMsg(null);
        return;
      } else {
        setEmailErrorMsg("Email is invalid");
        return;
      }
    }
  };

  return (
    <Form onSubmit={submitForm} id="emailForm">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="e.g. john@email.com"
          value={email.email}
          onChange={onValueChange}
          name="email"
          isInvalid={emailErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {emailErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ContactEmailForm;
