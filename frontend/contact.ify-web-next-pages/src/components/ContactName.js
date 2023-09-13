import { useState } from "react";
import { default as EditButton } from "./EditButton";

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
      className="d-flex mb-4 align-content-center justify-content-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="me-4 p-0"
        onClick={() =>
          patchIsFavorite(`contacts/${contact.contactId}`)
        }
        style={{ cursor: "pointer" }}
      >
        {contact.isFavorite ? (
          <i className="bi bi-star-fill align-middle" />
        ) : (
          <i className="bi bi-star align-middle" />
        )}
      </div>
      <p className="h4 m-0">{contact.name}</p>
      {isHovered && <EditButton onEditClicked={onEditClicked} />}
    </div>
  );
};

export default ContactName;