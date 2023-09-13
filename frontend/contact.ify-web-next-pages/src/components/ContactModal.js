import formTypes from "@/utils/formId";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ContactModal({
  show,
  handleClose,
  isAdd = true,
  type = "",
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
              <Button
                variant="primary"
                type="submit"
                form={formTypes[type]}
              >
                Save
              </Button>
            </div>
          ) : (
            <div className="d-flex w-100 justify-content-between">
              {type !== "Contact Name" && (
                <div>
                  <Button variant="outline-danger" onClick={()=>{}}>{/* TODO implement delete*/}
                    {`Delete ${type}`}
                  </Button>
                </div>
              )}
              <div></div>
              <div>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  form={formTypes[type]}
                >
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
