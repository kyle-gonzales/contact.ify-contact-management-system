import { useState } from "react";
import EditButton from "./EditButton";

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
      {isHovered && <EditButton onEditClicked={onEditClicked} />}
    </div>
  );
};

export default PhoneNumberItem;
