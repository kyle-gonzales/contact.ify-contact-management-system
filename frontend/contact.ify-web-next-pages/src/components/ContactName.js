import { useState } from "react";
import { default as EditButton } from "./EditButton";
import Button from "react-bootstrap/Button";

const ContactName = ({ contact, patchIsFavorite, onEditClicked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="d-flex pb-2 mb-3 align-items-center hover-effect border-bottom"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="me-3 p-0"
        onClick={() => patchIsFavorite(`contacts/${contact.contactId}`)}
        style={{ cursor: "pointer" }}
      >
        {contact.isFavorite ? (
          <i className="bi bi-star-fill align-middle" />
        ) : (
          <i className="bi bi-star align-middle" />
        )}
      </div>
      <p className="h4 m-0">{contact.name}</p>
      {isHovered ? (
        <EditButton onEditClicked={onEditClicked} />
      ) : (
        <Button size="sm" style={{ visibility: "hidden" }}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default ContactName;
