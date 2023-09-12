import { useRouter } from "next/router";
import useContact from "@/hooks/useContact";
import LoadingIndicator from "@/components/LoadingIndicator";
import loadingStatus from "@/utils/loadingStatus";
import EmailItem from "@/components/EmailItem";
import PhoneNumberItem from "@/components/PhoneNumberItem";
import AddressItem from "@/components/AddressItem";
import { Col, Container, Row, Table } from "react-bootstrap";
import useIsFavorite from "@/hooks/useIsFavorite";
import useContacts from "@/hooks/useContacts";
import ContactName from "@/components/ContactName";

const Contact = () => {
  const router = useRouter();
  const { contacts, setContacts } = useContacts(router);
  const { contact, setContact, loadingState } = useContact(router);
  const { patchIsFavorite } = useIsFavorite(contacts, setContacts);

  const editEmail = (email) => {
    alert(email.email);
  };

  if (loadingState !== loadingStatus.loaded)
    return <LoadingIndicator loadingState={loadingState} />;

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md="10" xl="9" xxl="8">
            <div className="d-flex align-items-center">
              <i
                className="bi bi-arrow-left icon-hover"
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onClick={() => router.replace("/")}
              />
              <h3 className="w-100 m-0 ps-2">Edit Contact</h3>
            </div>
            <Container>
              <Row className="">
                <div className=" d-flex justify-content-center">
                  <i
                    className="bi bi-person-circle"
                    style={{
                      fontSize: "100px",
                    }}
                  />
                </div>
              </Row>
              <Row className="">
                <Col className="p-0">
                  <ContactName
                    contact={contact}
                    patchIsFavorite={patchIsFavorite}
                  />
                  <Table borderless hover>
                    <thead>
                      <tr>
                        <td>
                          <h5>Emails</h5>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {contact.emails.map((email) => (
                        <tr key={email.contactEmailId}>
                          <td>
                            <EmailItem
                              email={email}
                              onEditClicked={() => {
                                editEmail(email);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="mb-4">
                    <h5>Emails</h5>
                    <ul>
                      {contact.emails.map((email) => (
                        <li key={email.contactEmailId}>
                          <EmailItem email={email} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h5>Phone Numbers</h5>
                    <ul>
                      {contact.phoneNumbers.map((phoneNumber) => (
                        <li key={phoneNumber.contactPhoneNumberId}>
                          <PhoneNumberItem phoneNumber={phoneNumber} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h5>Addresses</h5>
                    <ul>
                      {contact.addresses.map((address) => (
                        <li key={address.contactAddressId}>
                          <AddressItem address={address} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
