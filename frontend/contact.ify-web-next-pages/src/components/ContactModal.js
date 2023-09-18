import formTypes from "@/utils/formId";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

function ContactModal({
  show,
  handleClose,
  isAdd = true,
  type = "",
  deleteItem = () => {},
  children,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${isAdd ? "Add" : "Edit"} ${type}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          {isAdd ? (
            <div className="d-flex w-100 justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" form={formTypes[type]}>
                Save
              </Button>
            </div>
          ) : (
            <div className="d-flex w-100 justify-content-between">
              <div>
                {/* <Button variant="outline-danger" onClick={deleteItem}>
                  {`Delete ${type}`}
                </Button> */}
                <Dropdown>
                  <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
                    Delete
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="my-shadow">
                    <Dropdown.Item
                      className="text-danger"
                      onClick={(e) => {
                        deleteItem(e);
                      }}
                    >
                      Yes, Delete Me!
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div></div> {/** this is needed */}
              <div>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" form={formTypes[type]}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContactModal;
