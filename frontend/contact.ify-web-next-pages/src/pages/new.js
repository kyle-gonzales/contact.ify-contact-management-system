import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useRouter } from "next/router";
import loadingStatus from "@/utils/loadingStatus";
import useNewContact from "@/hooks/useNewContact";
import ContactNameForm from "@/components/ContactNameForm";

// should have the state of the count
const New = () => {
  const router = useRouter();

  const {
    postContact,
    loadingState,
    setLoadingState,
    contact,
    setContact,
    firstNameErrorMsg,
    setFirstNameErrorMsg,
    lastNameErrorMsg,
    setLastNameErrorMsg,
  } = useNewContact(router);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="8" xl="7" xxl="6">
          <div className="d-flex align-items-center mb-5">
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
                form="contactForm"
                variant="primary"
                type="submit"
                disabled={loadingState === loadingStatus.isLoading}
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
          <ContactNameForm
            submitForm={postContact}
            contact={contact}
            setContact={setContact}
            lastNameErrorMsg={lastNameErrorMsg}
            setLastNameErrorMsg={setLastNameErrorMsg}
            firstNameErrorMsg={firstNameErrorMsg}
            setFirstNameErrorMsg={setFirstNameErrorMsg}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default New;
