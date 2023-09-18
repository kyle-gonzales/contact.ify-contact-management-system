import { useState } from "react";
import EditButton from "./EditButton";
import Button from "react-bootstrap/Button";

const PhoneNumberItem = ({ phoneNumber, onEditClicked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="d-flex align-items-center"
    >
      <span className="">{phoneNumber.phoneNumber}</span>
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

export default PhoneNumberItem;
