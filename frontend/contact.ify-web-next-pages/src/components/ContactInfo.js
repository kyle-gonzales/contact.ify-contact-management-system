import { Col, Container, Row, Table } from "react-bootstrap";
import AddButton from "./AddButton";
import AddressItem from "./AddressItem";
import PhoneNumberItem from "./PhoneNumberItem";
import ContactName from "./ContactName";
import EmailItem from "./EmailItem";

const ContactInfo = ({
  router,
  contact,
  patchIsFavorite,

  handleShowEditContactName,
  handleShowAddEmail,
  handleShowEditEmail,
  handleShowAddPhoneNumber,
  handleShowEditPhoneNumber,
  handleShowAddAddress,
  handleShowEditAddress,
}) => {
  return (
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
                  onEditClicked={() => handleShowEditContactName(true)}
                />
                <Table borderless hover>
                  <thead>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <h5 className="m-0 d-flex align-items-center">
                            Emails
                          </h5>
                          <AddButton
                            onEditClicked={() => handleShowAddEmail(true)}
                          />
                        </div>
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
                              handleShowEditEmail(email);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Table borderless hover>
                  <thead>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <h5 className="m-0 d-flex align-items-center">
                            Phone Numbers
                          </h5>
                          <AddButton
                            onEditClicked={() => handleShowAddPhoneNumber(true)}
                          />
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.phoneNumbers.map((phoneNumber) => (
                      <tr key={phoneNumber.contactPhoneNumberId}>
                        <td>
                          <PhoneNumberItem
                            phoneNumber={phoneNumber}
                            onEditClicked={() => {
                              handleShowEditPhoneNumber(phoneNumber);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Table borderless hover>
                  <thead>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <h5 className="m-0 d-flex align-items-center">
                            Addresses
                          </h5>
                          <AddButton
                            onEditClicked={() => handleShowAddAddress()}
                          />
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {contact.addresses.map((address) => (
                      <tr key={address.contactAddressId}>
                        <td>
                          <AddressItem
                            address={address}
                            onEditClicked={() => {
                              handleShowEditAddress(address);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactInfo;
