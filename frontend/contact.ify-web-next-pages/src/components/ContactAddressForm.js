import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import addressTypes from "@/utils/addressTypes";

const ContactAddressForm = ({
  submitForm,
  address,
  setAddress,
  streetErrorMsg,
  setStreetErrorMsg,
  cityErrorMsg,
  setCityErrorMsg,
  provinceErrorMsg,
  setProvinceErrorMsg,
  countryErrorMsg,
  setCountryErrorMsg,
  zipCodeErrorMsg,
  setZipCodeErrorMsg,
  addressTypeErrorMsg,
  setAddressTypeErrorMsg,
}) => {
  const onValueChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value.length === 0 ? null : value });
    if (name === "city") {
      if ((value.length > 1 && value.length <= 80) || value.length === 0) {
        setCityErrorMsg(null);
        return;
      } else {
        setCityErrorMsg("City must be between 2 and 80 characters long");
        return;
      }
    } else if (name === "street") {
      if ((value.length > 1 && value.length <= 80) || value.length === 0) {
        setStreetErrorMsg(null);
        return;
      } else {
        setStreetErrorMsg("Street must be between 2 and 80 characters long");
        return;
      }
    } else if (name === "province") {
      if ((value.length > 1 && value.length <= 80) || value.length === 0) {
        setProvinceErrorMsg(null);
        return;
      } else {
        setProvinceErrorMsg(
          "Province must be between 2 and 80 characters long"
        );
        return;
      }
    } else if (name === "country") {
      if ((value.length > 1 && value.length <= 80) || value.length === 0) {
        setCountryErrorMsg(null);
        return;
      } else {
        setCountryErrorMsg("Country must be between 2 and 80 characters long");
        return;
      }
    } else if (name === "zipCode") {
      if ((value.length > 1 && value.length <= 10) || value.length === 0) {
        setZipCodeErrorMsg(null);
        return;
      } else {
        setZipCodeErrorMsg("Zip Code must be between 2 and 10 characters long");
        return;
      }
    } else if (name === "addressType") {
      if (value > 0 && value <= addressTypes.length) {
        setAddressTypeErrorMsg(null);
        return;
      } else {
        setAddressTypeErrorMsg("Address Type Not Valid");
        return;
      }
    }
  };

  return (
    <Form onSubmit={submitForm} id="addressForm">
      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. 11 Dove Street"
          value={address.street}
          onChange={onValueChange}
          name="street"
          isInvalid={streetErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {streetErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="e.g. Cebu City"
          value={address.city}
          onChange={onValueChange}
          name="city"
          isInvalid={cityErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {cityErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Province</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Cebu"
          value={address.province}
          onChange={onValueChange}
          name="province"
          isInvalid={provinceErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {provinceErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Philippines"
          value={address.country}
          onChange={onValueChange}
          name="country"
          isInvalid={countryErrorMsg !== null}
        />
        <Form.Control.Feedback type="invalid">
          {countryErrorMsg}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3 d-flex">
        <Container fluid className="g-0">
          <Row>
            <Col>
              <Form.Group className="me-2">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 90210"
                  value={address.zipCode}
                  onChange={onValueChange}
                  name="zipCode"
                  isInvalid={zipCodeErrorMsg !== null}
                />
                <Form.Control.Feedback type="invalid">
                  {zipCodeErrorMsg}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="">
                <Form.Label>Address Type</Form.Label>
                <Form.Select
                  aria-label="Select Address Type"
                  value={address.addressType}
                  onChange={onValueChange}
                  name="addressType"
                  isInvalid={addressTypeErrorMsg !== null}
                >
                  <option value={1}>Delivery</option>
                  <option value={2}>Billing</option>
                  <option value={3}>Work</option>
                  <option value={4}>Home</option>
                  <option value={5}>Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {addressTypeErrorMsg}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    </Form>
  );
};

export default ContactAddressForm;
