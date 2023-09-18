import isValidEmailUtil from "@/utils/isValidEmail";
import { Form } from "react-bootstrap";

const UserForm = ({
  submitForm,
  user,
  setUser,
  lastNameErrorMsg,
  setLastNameErrorMsg,
  firstNameErrorMsg,
  setFirstNameErrorMsg,
  emailErrorMsg,
  setEmailErrorMsg,
}) => {
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value.length === 0 ? null : value });
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
    } else if (name === "email") {
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
    <Form onSubmit={submitForm} id="userForm">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Mary Jane"
          value={user.firstName}
          onChange={onValueChange}
          name="firstName"
          isInvalid={firstNameErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {firstNameErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Lim"
          value={user.lastName}
          onChange={onValueChange}
          name="lastName"
          isInvalid={lastNameErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {lastNameErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="e.g. john@email.com"
          value={user.email}
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

export default UserForm;
