import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/router";
import loadingStatus from "@/utils/loadingStatus";
import useNewContact from "@/hooks/useNewContact";

// should have the state of the count
const New = () => {
  const router = useRouter();

  const {
    postContact,
    loadingState,
    setLoadingState,
    contact,
    setContact,
    isValidFirstName,
    setIsValidFirstName,
    isValidLastName,
    setIsValidLastName,
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    lastNameErrorMsg,
    setLastNameErrorMsg,
  } = useNewContact(router);

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
    <Container>
      <Row className="justify-content-center">
        <Col md="8" xl="7" xxl="6">
          <div className="d-flex align-items-center">
            <i
              className="bi bi-x icon-hover"
              style={{
                fontSize: "32px",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onClick={() => router.replace("/")}
            />
            <h4 className="w-100 m-0 ps-2">Edit Contact</h4>
            <div>
              <Button
                form="newContactForm"
                variant="primary"
                type="submit"
                disabled={
                  loadingState === loadingStatus.isLoading
                }
                className="save-button"
              >
                {loadingState !== loadingStatus.isLoading ? (
                  "Save"
                ) : (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className=""
                  />
                )}
              </Button>
            </div>
          </div>

          <Form onSubmit={postContact} id="newContactForm" className="mt-5">
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
        </Col>
      </Row>
    </Container>
  );
};

export default New;
